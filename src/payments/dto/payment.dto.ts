import { IsDate, IsDecimal, IsNotEmpty } from 'class-validator';

export class Payment {
  @IsNotEmpty()
  id: string;

  @IsDecimal()
  transaction_amt: number;

  @IsDate()
  date: Date;
}
