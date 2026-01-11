import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/config/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { FamilyRole } from '@prisma/client';

@Injectable()
export class FamilyService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async getFamily(userId: string) {
    // Check if user belongs to a family
    const membership = await this.prisma.familyMember.findFirst({
        where: { userId },
        include: { family: { include: { members: { include: { user: true } } } } }
    });

    if (!membership) {
        return [];
    }

    return membership.family.members.map(m => ({
        id: m.id,
        name: m.name,
        role: m.role,
        relation: m.relation,
        monthlyLimit: m.monthlyLimit,
        isAccepted: m.isAccepted,
        email: m.email || m.user?.email,
        avatarUrl: m.user?.avatarUrl || null,
        isCurrentUser: m.userId === userId
    }));
  }

  async inviteMember(userId: string, data: { name: string; email: string; role: string; relation: string; monthlyLimit: number }) {
    // 1. Get or Create Family logic
    let familyId: string;

    const membership = await this.prisma.familyMember.findFirst({
        where: { userId },
    });

    if (membership) {
        familyId = membership.familyId;
        // Verify permissions? (Assuming HEAD or SPOUSE can invite)
        if (membership.role !== 'HEAD' && membership.role !== 'SPOUSE') {
            throw new BadRequestException('Only Family Head or Spouse can invite members');
        }
    } else {
        // Create new Family for this user (they become HEAD)
        const family = await this.prisma.family.create({
            data: { name: 'My Family' }
        });
        familyId = family.id;
        
        // Add current user as HEAD
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        await this.prisma.familyMember.create({
            data: {
                familyId,
                userId,
                name: user.name,
                role: 'HEAD',
                relation: 'You',
                isAccepted: true,
                email: user.email 
            }
        });
    }

    // 2. Add new member
    const existingMember = await this.prisma.familyMember.findFirst({
        where: { familyId, email: data.email }
    });

    if (existingMember) {
        throw new BadRequestException('This email is already invited to the family');
    }
    
    // Check if invited user exists in system
    const invitedUser = await this.prisma.user.findUnique({ where: { email: data.email } });

    const newMember = await this.prisma.familyMember.create({
        data: {
            familyId,
            userId: invitedUser?.id || null,
            name: data.name,
            email: data.email,
            role: data.role as FamilyRole || 'MEMBER',
            relation: data.relation,
            monthlyLimit: data.monthlyLimit,
            isAccepted: false // Pending invitation
        }
    });

    // 3. Send Email
    const inviter = await this.prisma.user.findUnique({ where: { id: userId } });
    const inviteUrl = `${this.configService.get('FRONTEND_URL')}/family/accept?token=${newMember.id}`; // Simplified for demo

    await this.mailerService.sendMail({
        to: data.email,
        subject: `Family Invitation from ${inviter.name}`,
        template: 'family-invite',
        context: {
            frontendUrl: this.configService.get('FRONTEND_URL'),
            inviterName: inviter.name,
            role: data.role,
            url: inviteUrl
        }
    });

    return newMember;
  }

  async removeMember(userId: string, memberId: string) {
    // Validate requester is HEAD or modifying self?
    // Simplified: Allow removal
    await this.prisma.familyMember.delete({
        where: { id: memberId }
    });
  }
}
