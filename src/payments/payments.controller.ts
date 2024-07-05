import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentDto } from './dto/payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('create-payment')
  createPayment(@Body() paymentDto: PaymentDto) {
    return this.paymentsService.createPayment(paymentDto);
  }

  // @Post('payment-notification-handler')

}
