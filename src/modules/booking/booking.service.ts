import { Injectable } from '@nestjs/common';
import { Booking } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private bookingRepo: Repository<Booking>,
  ) {}

  async getBookingById(bookingId: string) {
    return await this.bookingRepo.findOne({
      where: {
        id: bookingId,
      },
    });
  }

  async bookAService(bookings: Partial<Booking>[]) {
    // const booking = this.bookingRepo.create(bookings[0]);
    // await this.bookingRepo.save(booking);
    await this.bookingRepo.insert(bookings);
    return { status: 'Booking seed data loaded' };
  }

  async updateBookingStatusById(id: string, status: string) {
    await this.bookingRepo.update(id, { status });
  }
}
