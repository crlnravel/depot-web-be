import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { $Enums } from '@prisma/client';
import { Roles } from '../auth/decorators/role.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { MidtransNotificationDto } from './dto/midtrans-notification.dto';
import { InitTokenDto } from './dto/init-token.dto';
import { PaymentEntity } from './entities/payment.entity';
import { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @Roles($Enums.Role.ADMIN)
  findAll(): Promise<PaymentEntity[]> {
    return this.paymentsService.findAll();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('create-payment')
  @UseGuards(AuthGuard)
  @ApiProperty({
    description: 'Create a snap token for payment',
  })
  createPayment(
    @Req() request: Request,
    @Body() paymentDto: CreatePaymentDto,
  ): Promise<InitTokenDto> {
    return this.paymentsService.initPayment(request['user'], paymentDto);
  }

  /**
   * MIDTRANS NOTIFICATION HANDLER
   */
  @HttpCode(HttpStatus.OK)
  @Post('payment-notification-handler')
  @ApiHideProperty()
  async midtransNotificationHandler(
    @Body() notificationDto: MidtransNotificationDto,
  ): Promise<void> {
    console.log('KUONDOL');
    await this.paymentsService.midtransNotificationHandler(notificationDto);
  }
}
