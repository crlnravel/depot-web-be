import { Prisma, $Enums, Payment } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsEnum } from 'class-validator';

export class PaymentEntity implements Payment {
  @ApiProperty()
  id: string;

  @IsDecimal()
  @ApiProperty()
  amount: Prisma.Decimal;

  @ApiProperty()
  quantity: number;

  @IsEnum($Enums.PaymentStatus)
  @ApiProperty()
  status: $Enums.PaymentStatus;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  userId: number;
}
