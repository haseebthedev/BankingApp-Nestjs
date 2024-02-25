import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { QrService } from './qr.service';
import { CreateQRCodeDTO } from './dto';
import { GetUser } from 'src/common/decorators';
import { PaymentService } from '../payment/payment.service';
import { BookingService } from '../booking/booking.service';
import { JwtAuthGuard } from '../auth/guards';
import { PaymentStatus } from 'src/common/enums';
import { NotificationService } from '../notification/notification.service';

@UseGuards(JwtAuthGuard)
@Controller('qr')
export class QrController {
  constructor(
    private qrService: QrService,
    private paymentService: PaymentService,
    private bookingService: BookingService,
    private notificationService: NotificationService,
  ) {}

  @Post('create-qr')
  async createQRCode(@GetUser() userId: string, @Body() dto: CreateQRCodeDTO) {
    return await this.qrService.createQRCode(userId, dto);
  }

  @Get('scan-qr')
  async scanQRCode(
    @Query('qrId') qrCodeId: string,
    @Query('payMethodId') payMethodId: string,
  ) {
    // Getting all booking data by qrCodeId
    const booking = await this.qrService.scanQRCode(qrCodeId);

    // Making the payment here
    const payment = await this.paymentService.makePayment(
      booking.amount,
      booking.id,
      payMethodId,
    );

    // Changing the booking status to PaymentStatus.PAID
    await this.bookingService.updateBookingStatusById(
      booking.id,
      String(PaymentStatus.PAID),
    );

    // Sending the success notification here to consumer
    await this.notificationService.sendEmail({
      bookingId: booking.id,
      consumerId: booking.consumerId,
    });
    return payment;
  }
}
