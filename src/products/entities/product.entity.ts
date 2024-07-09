import { IsDecimal, IsEnum, IsInt, IsString } from 'class-validator';
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
  @ApiProperty({ type: String })
  price: Prisma.Decimal;

  @IsInt()
  @ApiProperty()
  stock: number;

  @IsEnum($Enums.Category)
  @ApiProperty({ enum: () => $Enums.Category })
  category: $Enums.Category;

  @IsEnum($Enums.KualitasAir)
  @ApiProperty({ enum: () => $Enums.KualitasAir })
  kualitasAir: $Enums.KualitasAir;

  @IsString()
  @ApiProperty()
  imgUrl: string;

  @IsInt()
  @ApiProperty()
  totalRating: number;

  @IsInt()
  @ApiProperty()
  totalPurchases: number;
}
