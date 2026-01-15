import api from "../api";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  xp: number;
  category?: string;
  unlocked: boolean;
  unlockedAt?: string | null;
}

export interface AchievementProgress {
  level: number;
  title: string;
  totalPoints: number;
  totalXP: number;
  nextLevelXP: number;
  achievements: Achievement[];
}

export const getAchievements = async (): Promise<AchievementProgress> => {
  const response = await api.get("/achievements");
  return response.data.data;
};
