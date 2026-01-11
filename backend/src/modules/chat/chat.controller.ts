import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('session')
  createSession(@CurrentUser() user: User) {
    return this.chatService.createSession(user.id);
  }

  @Get('sessions')
  getSessions(@CurrentUser() user: User) {
    return this.chatService.getSessions(user.id);
  }

  @Post('message')
  sendMessage(
    @CurrentUser() user: User,
    @Body() body: { sessionId: string; content: string }
  ) {
    return this.chatService.sendMessage(user.id, body.sessionId, body.content);
  }
}
