import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
