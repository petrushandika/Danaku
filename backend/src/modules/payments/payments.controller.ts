import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('initiate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async initiatePayment(
    @CurrentUser() user: User,
    @Body() body: { plan: string; amount: number }
  ) {
    return this.paymentsService.createTransaction(user, body.plan, body.amount);
  }

  @Post('notification')
  async handleNotification(@Body() notificationData: any) {
    // Handling Midtrans Webhook
    return this.paymentsService.handleNotification(notificationData);
  }
}
