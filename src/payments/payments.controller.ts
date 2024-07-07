import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { $Enums } from '@prisma/client';
import { Roles } from '../auth/decorators/role.decorator';
import { AuthGuard } from '../auth/auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Get()
  @Roles($Enums.Role.ADMIN)
  findAll() {
    return this.paymentsService.findAll();
  }

  @Post('create-payment')
  @UseGuards(AuthGuard)
  createPayment(@Body() paymentDto: CreatePaymentDto) {
    return this.paymentsService.initPayment(paymentDto);
  }

  // @Post('payment-notification-handler')
}
