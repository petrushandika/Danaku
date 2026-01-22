import { Controller, Get, Put, Post, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SetupService } from './setup.service';
import { UpdateSetupDto } from './dto/update-setup.dto';
import { AddItemDto } from './dto/add-item.dto';
import { DeleteItemDto } from './dto/delete-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
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
  async updateSetup(@CurrentUser() user: any, @Body() updateSetupDto: UpdateSetupDto) {
    return this.setupService.updateSetup(user.id, updateSetupDto);
  }

  @Post('items')
  @ApiOperation({ summary: 'Add item to a category' })
  @ResponseMessage('Item added successfully')
  async addItem(@CurrentUser() user: any, @Body() addItemDto: AddItemDto) {
    return this.setupService.addItem(user.id, addItemDto);
  }

  @Delete('items')
  @ApiOperation({ summary: 'Delete item from a category' })
  @ResponseMessage('Item deleted successfully')
  async deleteItem(@CurrentUser() user: any, @Body() deleteItemDto: DeleteItemDto) {
    return this.setupService.deleteItem(user.id, deleteItemDto);
  }

  @Post('items/update')
  @ApiOperation({ summary: 'Update item in a category' })
  @ResponseMessage('Item updated successfully')
  async updateItem(@CurrentUser() user: any, @Body() updateItemDto: UpdateItemDto) {
    return this.setupService.updateItem(user.id, updateItemDto);
  }
}
