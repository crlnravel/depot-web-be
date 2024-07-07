import { IsDecimal, IsEmail, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @IsDecimal()
  @ApiProperty()
  amount: number;

  @IsEmail()
  @ApiProperty()
  userEmail: string;

  @IsInt()
  @ApiProperty()
  productId: number;
}
