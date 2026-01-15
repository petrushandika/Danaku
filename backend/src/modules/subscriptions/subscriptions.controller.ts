import { Controller, Get, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ResponseMessage } from '@/common/decorators/response-message.decorator';

@ApiTags('subscriptions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('current')
  @ApiOperation({ summary: 'Get current subscription details' })
  @ResponseMessage('Current subscription retrieved successfully')
  async getCurrent(@CurrentUser() user: User) {
    return this.subscriptionsService.getCurrentSubscription(user.id);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get subscription history' })
  @ResponseMessage('Subscription history retrieved successfully')
  async getHistory(@CurrentUser() user: User) {
    return this.subscriptionsService.getHistory(user.id);
  }
}
