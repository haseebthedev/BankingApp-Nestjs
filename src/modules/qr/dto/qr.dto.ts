import { IsString } from 'class-validator';

export class CreateQRCodeDTO {
  @IsString()
  bookingId: string;

  @IsString()
  merchantId: string;

  @IsString()
  consumerId: string;
}

export interface QRBookingPipe {
  qrId: string;
  bookingId: string;
  bookingMerchantId: string;
  bookingConsumerId: string;
  bookingDetails: string;
  bookingAmount: number;
  bookingStatus: string;
}
