import {
  IsDecimal,
  IsEnum,
  IsInt,
} from 'class-validator';
import { Prisma, $Enums, Product } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProductEntity implements Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @IsDecimal()
  @ApiProperty()
  price: Prisma.Decimal;

  @IsInt()
  @ApiProperty()
  stock: number;

  @IsEnum($Enums.Category)
  @ApiProperty()
  category: $Enums.Category;

  @IsEnum($Enums.KualitasAir)
  @ApiProperty()
  kualitasAir: $Enums.KualitasAir;
}
