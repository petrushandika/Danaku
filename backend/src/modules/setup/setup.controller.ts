import { Controller, Get, Put, Post, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SetupService } from './setup.service';
import { UpdateSetupDto } from './dto/update-setup.dto';
import { AddItemDto } from './dto/add-item.dto';
import { DeleteItemDto } from './dto/delete-item.dto';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('setup')
@ApiBearerAuth()
@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) {}

  @Get()
  @ApiOperation({ summary: 'Get user setup configuration' })
  async getSetup(@CurrentUser() user: any) {
    const setup = await this.setupService.getSetup(user.id);
    return {
      success: true,
      data: setup,
    };
  }

  @Put()
  @ApiOperation({ summary: 'Update setup configuration' })
  async updateSetup(@CurrentUser() user: any, @Body() updateSetupDto: UpdateSetupDto) {
    const setup = await this.setupService.updateSetup(user.id, updateSetupDto);
    return {
      success: true,
      data: setup,
      message: 'Setup updated successfully',
    };
  }

  @Post('items')
  @ApiOperation({ summary: 'Add item to a category' })
  async addItem(@CurrentUser() user: any, @Body() addItemDto: AddItemDto) {
    const result = await this.setupService.addItem(user.id, addItemDto);
    return {
      success: true,
      data: result,
      message: `Item "${result.itemName}" added to ${result.category} successfully`,
    };
  }

  @Delete('items')
  @ApiOperation({ summary: 'Delete item from a category' })
  async deleteItem(@CurrentUser() user: any, @Body() deleteItemDto: DeleteItemDto) {
    const result = await this.setupService.deleteItem(user.id, deleteItemDto);
    return {
      success: true,
      data: result,
      message: `Item "${result.itemName}" deleted from ${result.category} successfully`,
    };
  }
}
