import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/config/prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async getCurrentSubscription(userId: string) {
    return this.prisma.subscription.findFirst({
        where: { userId, status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' },
    });
  }

  async getHistory(userId: string) {
    return this.prisma.subscription.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });
  }
}
