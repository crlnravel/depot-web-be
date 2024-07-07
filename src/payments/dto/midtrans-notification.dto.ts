import {
  IsDateString,
  IsDecimal,
  IsEnum,
  IsInt,
  IsNotEmpty, IsNumberString,
  IsString,
} from 'class-validator';

export enum Status {
  CAPTURE = 'capture',
  SETTLEMENT = 'settlement',
  PENDING = 'pending',
  DENY = 'deny',
  CANCEL = 'cancel',
  EXPIRE = 'expire',
  FAILURE = 'failure',
  REFUND = 'refund',
  PARTIAL_REFUND = 'partial_refund',
  AUTHORIZE = 'authorize',
}

export class MidtransNotificationDto {
  @IsNotEmpty()
  @IsDateString()
  transaction_time: string;

  @IsNotEmpty()
  @IsEnum(Status)
  transaction_status: Status;

  @IsNotEmpty()
  @IsNumberString()
  status_code: number;

  @IsNotEmpty()
  @IsDecimal()
  gross_amount: string;

  @IsNotEmpty()
  @IsString()
  fraud_status: string;

  @IsNotEmpty()
  @IsString()
  order_id: string;

  @IsNotEmpty()
  @IsString()
  signature_key: string;
}
