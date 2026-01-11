import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ResponseMessage } from '@/common/decorators/response-message.decorator';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('session')
  @ApiOperation({ summary: 'Create a new chat session' })
  @ResponseMessage('Chat session created successfully')
  async createSession(@CurrentUser() user: User) {
    return this.chatService.createSession(user.id);
  }

  @Get('sessions')
  @ApiOperation({ summary: 'Get all chat sessions for current user' })
  @ResponseMessage('Chat sessions retrieved successfully')
  async getSessions(@CurrentUser() user: User) {
    return this.chatService.getSessions(user.id);
  }

  @Post('message')
  @ApiOperation({ summary: 'Send a message to AI assistant' })
  @ResponseMessage('Message sent successfully')
  async sendMessage(
    @CurrentUser() user: User,
    @Body() body: { sessionId: string; content: string }
  ) {
    return this.chatService.sendMessage(user.id, body.sessionId, body.content);
  }
}
