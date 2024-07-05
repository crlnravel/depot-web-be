import { BadRequestException, Injectable } from '@nestjs/common';
import { Snap } from 'midtrans-client';
import uniqid from 'uniqid';
import { UsersService } from '../users/users.service';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  private snap = new Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });

  constructor(private usersService: UsersService) {}

  async createPayment(paymentDto: PaymentDto) {
    const user = await this.usersService.findByEmail(paymentDto.userEmail);

    if (!user) {
      throw new BadRequestException('No such user');
    }

    const oid = uniqid('');

    return await this.snap.createTransactionToken({
      transaction_details: {
        order_id: 'YOUR-ORDERID-1234561',
        gross_amount: 10000,
      },
      credit_card: {
        secure: true,
      },
    });
  }
}
