import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ResponseMessage } from '@/common/decorators/response-message.decorator';

@ApiTags('reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('monthly')
  @ResponseMessage('Monthly report retrieved successfully')
  async getMonthlyReport(
    @CurrentUser() user: any,
    @Query('year') year: number,
    @Query('month') month: number,
  ) {
    return this.reportsService.getMonthlyReport(user.id, year, month);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get dashboard summary stats' })
  @ResponseMessage('Dashboard summary retrieved successfully')
  async getSummary(@CurrentUser() user: any) {
    return this.reportsService.getSummary(user.id);
  }
}
