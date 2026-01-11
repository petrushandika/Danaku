import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AchievementsService } from './achievements.service';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ResponseMessage } from '@/common/decorators/response-message.decorator';

@ApiTags('achievements')
@ApiBearerAuth()
@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  @ApiOperation({ summary: 'Get user achievements' })
  @ApiResponse({ status: 200, description: 'Return list of achievements and user progress' })
  @ResponseMessage('Achievements retrieved successfully')
  async getUserAchievements(@CurrentUser() user: any) {
    return this.achievementsService.getUserAchievements(user.id);
  }
}
