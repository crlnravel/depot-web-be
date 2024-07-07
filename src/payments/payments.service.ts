import { BadRequestException, Injectable } from '@nestjs/common';
import { Snap } from 'midtrans-client';
import uniqid from 'uniqid';
import { UsersService } from '../users/users.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from '../products/products.service';
import { $Enums, Payment, Product, User } from '@prisma/client';
import {
  MidtransNotificationDto,
  Status,
} from './dto/midtrans-notification.dto';

@Injectable()
export class PaymentsService {
  public snap = new Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });

  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async findAll(): Promise<Payment[]> {
    return this.prisma.payment.findMany();
  }

  async initPayment(paymentDto: CreatePaymentDto): Promise<string> {
    const user: User = await this.usersService.findByEmail(
      paymentDto.userEmail,
    );

    const product: Product = await this.productsService.findById(
      paymentDto.productId,
    );

    if (!user || !product) {
      throw new BadRequestException('No such user');
    }

    return await this.snap.createTransactionToken({
      transaction_details: {
        order_id: uniqid(),
        gross_amount: paymentDto.amount,
      },
      credit_card: {
        secure: true,
      },
    });
  }

  async midtransNotificationHandler(
    notificationDto: MidtransNotificationDto,
  ): Promise<Payment> {
    if (
      this._statusMapper(notificationDto.transaction_status) ===
      $Enums.PaymentStatus.SUCCESS
    ) {
      return;
    }
  }

  _statusMapper(status: Status): $Enums.PaymentStatus {
    if (status === Status.CAPTURE || status === Status.SETTLEMENT) {
      return $Enums.PaymentStatus.SUCCESS;
    } else if (status === Status.PENDING || status === Status.AUTHORIZE) {
      return $Enums.PaymentStatus.PENDING;
    } else {
      return $Enums.PaymentStatus.FAILED;
    }
  }
}
