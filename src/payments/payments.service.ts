import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Snap } from 'midtrans-client';
import { v4 as uuidv4 } from 'uuid';
import { md } from 'node-forge';
import { UsersService } from '../users/users.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from '../products/products.service';
import { $Enums, Payment, Product, User } from '@prisma/client';
import {
  MidtransNotificationDto,
  Status,
} from './dto/midtrans-notification.dto';
import { InitTokenDto } from './dto/init-token.dto';
import { PaymentEntity } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  public snap = new Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });

  constructor(
    private prisma: PrismaService,
    private productsService: ProductsService,
  ) {}

  async findAll(): Promise<Payment[]> {
    return this.prisma.payment.findMany();
  }

  async initPayment(
    user: User,
    paymentDto: CreatePaymentDto,
  ): Promise<InitTokenDto> {
    const product: Product = await this.productsService.findById(
      paymentDto.productId,
    );

    if (!product) {
      throw new BadRequestException('No such product');
    }

    const oid: string = uuidv4();
    const gross_amount: number = paymentDto.quantity * product.price.toNumber();

    const token: string = await this.snap.createTransactionToken({
      transaction_details: {
        order_id: oid,
        gross_amount: gross_amount,
      },
      credit_card: {
        secure: true,
      },
    });

    const transaction: PaymentEntity = await this.prisma.payment.create({
      data: {
        id: oid,
        userId: user.id,
        productId: product.id,
        quantity: paymentDto.quantity,
        amount: gross_amount,
        status: $Enums.PaymentStatus.PENDING,
      },
    });

    return {
      token: token,
      payment: transaction,
    };
  }

  async midtransNotificationHandler(
    notificationDto: MidtransNotificationDto,
  ): Promise<Payment> {
    // Notification validation
    if (
      !this._verifySignature(
        notificationDto.order_id,
        notificationDto.status_code.toString(),
        notificationDto.gross_amount,
        notificationDto.signature_key,
      )
    ) {
      throw new UnauthorizedException('Signature key is not valid!');
    }

    const status: $Enums.PaymentStatus = this._statusMapper(
      notificationDto.transaction_status,
    );

    if (notificationDto.fraud_status === 'accept') {
      return this.prisma.payment.update({
        where: {
          id: notificationDto.order_id,
        },
        data: {
          status: status,
          timestamp: new Date(notificationDto.transaction_time),
        },
      });
    }
  }

  _statusMapper(status: Status): $Enums.PaymentStatus {
    // Map status given by the notification to the corresponding payment status
    if (status === Status.CAPTURE || status === Status.SETTLEMENT) {
      return $Enums.PaymentStatus.SUCCESS;
    } else if (status === Status.PENDING || status === Status.AUTHORIZE) {
      return $Enums.PaymentStatus.PENDING;
    } else {
      return $Enums.PaymentStatus.FAILED;
    }
  }

  _verifySignature(
    orderId: string,
    statusCode: string,
    grossAmount: string,
    signatureKey: string,
  ): boolean {
    // Generating hashcode to verify signature
    const sha512 = md.sha512.create();
    sha512.update(
      orderId + statusCode + grossAmount + process.env.MIDTRANS_SERVER_KEY,
    );
    const generatedHash = sha512.digest().toHex().toString();
    return generatedHash === signatureKey;
  }
}
