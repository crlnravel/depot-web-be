import { IsInt, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsInt()
  @ApiProperty()
  productId: number;
}
