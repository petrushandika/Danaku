import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/config/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createSession(userId: string) {
    return this.prisma.chatSession.create({
      data: { userId },
    });
  }

  async getSessions(userId: string) {
    return this.prisma.chatSession.findMany({
      where: { userId, isActive: true },
      orderBy: { updatedAt: 'desc' },
      include: { messages: { take: 1, orderBy: { createdAt: 'desc' } } }
    });
  }

  async sendMessage(userId: string, sessionId: string, content: string) {
    // Save user message
    const message = await this.prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'USER',
        content,
      },
    });

    // Mock AI response for now (to be replaced with actual AI service)
    const aiResponse = await this.prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'ASSISTANT',
        content: `I received your message: "${content}". How can I verify this is working?`,
      },
    });

    return [message, aiResponse];
  }
}
