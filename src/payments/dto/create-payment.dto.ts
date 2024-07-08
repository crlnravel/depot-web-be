import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @IsInt()
  @ApiProperty()
  quantity: number;

  @IsInt()
  @ApiProperty()
  productId: number;
}
