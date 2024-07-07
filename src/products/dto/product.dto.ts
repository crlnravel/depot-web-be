import {
  IsDecimal,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { $Enums } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDecimal()
  price: number;

  @IsInt()
  stock: number;

  @IsNotEmpty()
  @IsEnum($Enums.Category)
  category: $Enums.Category;

  @IsNotEmpty()
  @IsEnum($Enums.KualitasAir)
  kualitasAir: $Enums.KualitasAir;
}
