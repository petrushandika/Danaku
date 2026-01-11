import { Controller, Get, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SetupService } from './setup.service';
import { UpdateSetupDto } from './dto/update-setup.dto';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ResponseMessage } from '@/common/decorators/response-message.decorator';

@ApiTags('setup')
@ApiBearerAuth()
@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) {}

  @Get()
  @ApiOperation({ summary: 'Get user setup configuration' })
  @ResponseMessage('Setup configuration retrieved successfully')
  async getSetup(@CurrentUser() user: any) {
    return this.setupService.getSetup(user.id);
  }

  @Put()
  @ApiOperation({ summary: 'Update setup configuration' })
  @ResponseMessage('Setup updated successfully')
  async updateSetup(
    @CurrentUser() user: any,
    @Body() updateSetupDto: UpdateSetupDto,
  ) {
    return this.setupService.updateSetup(user.id, updateSetupDto);
  }
}
