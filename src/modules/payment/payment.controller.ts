import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { PaymentService } from './payment.service';
import { PaymentMethod } from './entities/paymentMethod.entity';
import { PayMethodDataSeed } from 'src/database/seeds';

@UseGuards(JwtAuthGuard)
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('add-payment-methods')
  async addPayMethods() {
    const methods: Partial<PaymentMethod>[] = PayMethodDataSeed;
    return await this.paymentService.addPayMethods(methods);
  }
}
