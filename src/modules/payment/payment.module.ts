import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PaymentMethod } from './entities/paymentMethod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, PaymentMethod])],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
