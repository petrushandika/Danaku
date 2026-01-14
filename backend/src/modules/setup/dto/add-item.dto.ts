import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum CategoryType {
  ACCOUNT_SUMMARY = 'accountSummary',
  INCOME_SOURCES = 'incomeSources',
  NEEDS = 'needs',
  WANTS = 'wants',
  SAVINGS = 'savings',
  ACCOUNT_ASSETS = 'accountAssets',
}

export class AddItemDto {
  @ApiProperty({
    example: 'accountSummary',
    enum: CategoryType,
    description: 'Category type to add item to',
  })
  @IsNotEmpty()
  @IsEnum(CategoryType)
  category: CategoryType;

  @ApiProperty({
    example: 'Mandiri',
    description: 'Item name to add',
  })
  @IsNotEmpty()
  @IsString()
  itemName: string;
}
