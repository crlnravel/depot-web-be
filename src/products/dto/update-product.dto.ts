import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import { $Enums } from '@prisma/client';

export class UpdateProductDto {
  @ApiProperty()
  @IsInt()
  stock: number;

  @ApiProperty()
  @IsEnum($Enums.KualitasAir)
  kualitasAir: $Enums.KualitasAir;
}
