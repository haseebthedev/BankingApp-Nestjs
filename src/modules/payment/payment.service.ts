import { Injectable } from '@nestjs/common';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod } from './entities/paymentMethod.entity';
import { CreatePaymentDTO } from './dto/payment.dto';
import { PaymentStatus } from 'src/common/enums';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(PaymentMethod)
    private paymentMethodRepo: Repository<PaymentMethod>,
  ) {}

  async addPayMethods(methods: Partial<PaymentMethod>[]) {
    await this.paymentMethodRepo.insert(methods);
    return { status: 'Payment Method seed data loaded' };
  }

  async makePayment(amount: number, bookingId: string, payMethodId: string) {
    const payment = this.paymentRepo.create({
      amount,
      bookingId,
      payMethodId,
      status: String(PaymentStatus.PAID),
    });
    return await this.paymentRepo.save(payment);
  }
}
