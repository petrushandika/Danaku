import { Module } from '@nestjs/common';
import { SpendingService } from './spending.service';
import { SpendingController } from './spending.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { BudgetsModule } from '../budgets/budgets.module';

@Module({
  imports: [NotificationsModule, BudgetsModule],
  controllers: [SpendingController],
  providers: [SpendingService],
  exports: [SpendingService],
})
export class SpendingModule {}
