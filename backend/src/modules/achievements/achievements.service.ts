import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/config/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AchievementsService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async getUserAchievements(userId: string) {
    // Determine level based on XP (mock logic for now)
    // In a real app, calculate total XP from various activities
    
    // Fetch all achievements
    const allAchievements = await this.prisma.achievement.findMany();
    
    // Fetch unlocked achievements
    const unlocked = await this.prisma.userAchievement.findMany({
        where: { userId },
        include: { achievement: true }
    });
    
    const unlockedIds = new Set(unlocked.map(ua => ua.achievementId));
    
    // Calculate Stats
    const totalPoints = unlocked.reduce((sum, ua) => sum + ua.achievement.points, 0);
    const totalXP = unlocked.reduce((sum, ua) => sum + ua.achievement.xp, 0);
    
    // Level Logic: Level = 1 + floor(SQRT(XP / 100))
    const level = 1 + Math.floor(Math.sqrt(totalXP / 100));
    
    const achievementsList = allAchievements.map(achievement => ({
        ...achievement,
        unlocked: unlockedIds.has(achievement.id),
        unlockedAt: unlocked.find(ua => ua.achievementId === achievement.id)?.unlockedAt || null,
    }));

    return {
        level,
        title: this.getLevelTitle(level),
        totalPoints,
        totalXP,
        nextLevelXP: Math.pow(level, 2) * 100, // XP needed for next level
        achievements: achievementsList
    };
  }
  
  private getLevelTitle(level: number): string {
      if (level >= 50) return "Financial Legend";
      if (level >= 40) return "Financial Guru";
      if (level >= 30) return "Investment Expert";
      if (level >= 20) return "Budget Master";
      if (level >= 10) return "Smart Saver";
      return "Novice";
  }

  // Method to check and unlock achievement (to be called by other services)
  async checkAndUnlockAchievement(userId: string, achievementCode: string) {
      // Find achievement by some code or title logic
      // For simplicity, let's say we search by title
      const achievement = await this.prisma.achievement.findFirst({
          where: { title: achievementCode }
      });
      
      if (!achievement) return;

      const existing = await this.prisma.userAchievement.findUnique({
          where: {
              userId_achievementId: {
                  userId,
                  achievementId: achievement.id
              }
          }
      });

      if (!existing) {
          await this.prisma.userAchievement.create({
              data: { userId, achievementId: achievement.id }
          });
          
          const user = await this.prisma.user.findUnique({ where: { id: userId } });
          if (!user) return;

          // Send Email
          const dashboardUrl = `${this.configService.get('NEXT_PUBLIC_APP_URL')}/dashboard`;
          await this.mailerService.sendMail({
              to: user.email,
              subject: `🏆 Achievement Unlocked: ${achievement.title}`,
              template: 'achievement-unlocked',
              context: {
                  frontendUrl: this.configService.get('NEXT_PUBLIC_APP_URL'), // header logo link
                  name: user.name,
                  badgeIcon: achievement.icon,
                  badgeTitle: achievement.title,
                  badgeDescription: achievement.description,
                  xp: achievement.xp,
                  url: dashboardUrl
              }
          });
      }
  }
}
