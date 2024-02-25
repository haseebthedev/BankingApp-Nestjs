import { Injectable } from '@nestjs/common';
import { Qrs } from './entities/qr.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQRCodeDTO } from './dto';
import { Payment } from '../payment/entities/payment.entity';
import { Booking } from '../booking/entities/booking.entity';

@Injectable()
export class QrService {
  constructor(
    @InjectRepository(Qrs) private qrRepo: Repository<Qrs>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(Booking) private bookingRepo: Repository<Booking>,
  ) {}

  async createQRCode(userId: string, data: CreateQRCodeDTO) {
    const qr = this.qrRepo.create({ merchantId: userId, ...data });
    await this.qrRepo.save(qr);

    return {
      qrCodeId: qr.id,
      status: 'Your QR Code has been created successfully!',
    };
  }

  async scanQRCode(qrId: string) {
    const { booking } = await this.qrRepo
      .createQueryBuilder('qrs')
      .leftJoinAndSelect('qrs.booking', 'booking')
      .leftJoinAndSelect('booking.merchant', 'merchant')
      .leftJoinAndSelect('merchant.user', 'user')
      .leftJoinAndSelect('booking.consumer', 'consumer')
      .leftJoinAndSelect('consumer.user', 'cUser')
      .where('qrs.bookingId = booking.id')
      .andWhere('qrs.id = :qrId', { qrId })
      .getOne();

    return booking;
  }
}
