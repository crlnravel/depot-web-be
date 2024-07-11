import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
import { InitTokenResponseDto } from './dto/init-token-response.dto';
import { PaymentEntity } from './entities/payment.entity';
import { Request } from 'express';
import { ProductEntity } from '../products/entities/product.entity';
import { ProductsService } from '../products/products.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private paymentsService: PaymentsService,
    private productService: ProductsService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @Roles($Enums.Role.ADMIN)
  findAll(): Promise<PaymentEntity[]> {
    return this.paymentsService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findById(@Param('id') id: string): Promise<PaymentEntity> {
    return this.paymentsService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id/product')
  async findProductById(@Param('id') id: string): Promise<ProductEntity> {
    const payment = await this.paymentsService.findById(id);
    return this.productService.findById(payment.productId);
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
  ): Promise<InitTokenResponseDto> {
    return this.paymentsService.initPayment(request['user'], paymentDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post(':id/cancel')
  @Roles($Enums.Role.ADMIN)
  async cancelPayment(@Param('id') id: string) {
    return this.paymentsService.cancelPayment(id);
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
    await this.paymentsService.midtransNotificationHandler(notificationDto);
  }
}
