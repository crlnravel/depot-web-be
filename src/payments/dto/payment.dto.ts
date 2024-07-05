import { IsDate, IsDecimal, IsEmail, IsNotEmpty } from 'class-validator';

export class PaymentDto {
  @IsNotEmpty()
  id: string;

  @IsDecimal()
  amount: number;

  @IsEmail()
  userEmail: string;
}
