import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AchievementsService } from './achievements.service';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('achievements')
@ApiBearerAuth()
@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  @ApiOperation({ summary: 'Get user achievements' })
  @ApiResponse({ status: 200, description: 'Return list of achievements and user progress' })
  async getUserAchievements(@CurrentUser() user: any) {
    const result = await this.achievementsService.getUserAchievements(user.id);
    return {
      success: true,
      data: result,
    };
  }
}
