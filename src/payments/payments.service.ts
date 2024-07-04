import { Injectable } from '@nestjs/common';
import { Snap } from 'midtrans-client';

@Injectable()
export class PaymentsService {
  private snap = new Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });

  constructor() {}

  async createPayment() {


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
