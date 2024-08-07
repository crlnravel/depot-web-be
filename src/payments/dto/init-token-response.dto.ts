import { ApiProperty } from '@nestjs/swagger';
import { PaymentEntity } from '../entities/payment.entity';

export class InitTokenResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty({ type: () => PaymentEntity })
  payment: PaymentEntity;
}
