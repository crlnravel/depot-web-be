import { Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('create-payment')
  createPayment() {
    return this.paymentsService.createPayment();
  }

  // @Post('payment-notification-handler')

}
