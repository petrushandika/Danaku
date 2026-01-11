import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FamilyService } from './family.service';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('family')
@ApiBearerAuth()
@Controller('family')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user family members' })
  async getFamily(@CurrentUser() user: any) {
    const result = await this.familyService.getFamily(user.id);
    return {
      success: true,
      data: result,
    };
  }

  @Post('invite')
  @ApiOperation({ summary: 'Invite a family member' })
  async inviteMember(
    @CurrentUser() user: any, 
    @Body() body: { name: string; email: string; role: string; relation: string; monthlyLimit: number }
  ) {
    const result = await this.familyService.inviteMember(user.id, body);
    return {
      success: true,
      data: result,
      message: 'Invitation sent successfully',
    };
  }

  @Delete(':memberId')
  @ApiOperation({ summary: 'Remove a family member' })
  async removeMember(@CurrentUser() user: any, @Param('memberId') memberId: string) {
    await this.familyService.removeMember(user.id, memberId);
    return {
      success: true,
      message: 'Member removed successfully',
    };
  }
}
