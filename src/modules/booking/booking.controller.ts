import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { ConsumerGuard } from 'src/common/guards';
import { BookingDataSeed } from 'src/database/seeds';

@UseGuards(JwtAuthGuard)
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  // Consumer User Routes
  @UseGuards(ConsumerGuard)
  @Post('book-a-service')
  async bookAService() {
    const bookings: Partial<Booking>[] = BookingDataSeed;

    return this.bookingService.bookAService(bookings);
  }
}
