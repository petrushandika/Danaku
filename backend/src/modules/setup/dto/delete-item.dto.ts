import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryType } from './add-item.dto';

export class DeleteItemDto {
  @ApiProperty({
    example: 'accountSummary',
    enum: CategoryType,
    description: 'Category type to delete item from',
  })
  @IsNotEmpty()
  @IsEnum(CategoryType)
  category: CategoryType;

  @ApiProperty({
    example: 'Mandiri',
    description: 'Item name to delete',
  })
  @IsNotEmpty()
  @IsString()
  itemName: string;
}
