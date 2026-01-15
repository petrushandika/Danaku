import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { InviteMemberDto } from './dto/invite-member.dto';
import { ResponseMessage } from '@/common/decorators/response-message.decorator';

@ApiTags('members')
@ApiBearerAuth()
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @ResponseMessage('Members retrieved successfully')
  async getMembers(@CurrentUser() user: any) {
    return this.membersService.getMembers(user.id);
  }

  @Post('invite')
  @ApiOperation({ summary: 'Invite a member' })
  @ResponseMessage('Invitation sent successfully')
  async inviteMember(
    @CurrentUser() user: any, 
    @Body() body: InviteMemberDto
  ) {
    return this.membersService.inviteMember(user.id, body);
  }

  @Delete(':memberId')
  @ApiOperation({ summary: 'Remove a member' })
  @ResponseMessage('Member removed successfully')
  async removeMember(@CurrentUser() user: any, @Param('memberId') memberId: string) {
    await this.membersService.removeMember(user.id, memberId);
    return null;
  }
}
