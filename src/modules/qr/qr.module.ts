import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QrController } from './qr.controller';
import { QrService } from './qr.service';
import { Qrs } from './entities/qr.entity';
import { PaymentService } from '../payment/payment.service';
import { Payment } from '../payment/entities/payment.entity';
import { PaymentMethod } from '../payment/entities/paymentMethod.entity';
import { Booking } from '../booking/entities/booking.entity';
import { BookingService } from '../booking/booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Qrs, Payment, PaymentMethod, Booking])],
  controllers: [QrController],
  providers: [QrService, PaymentService, BookingService],
})
export class QRModule {}
