import { IsNotEmpty, IsString } from 'class-validator';

export class SendNotification {
  @IsString()
  @IsNotEmpty()
  bookingId: string;

  @IsString()
  @IsNotEmpty()
  consumerId: string;
}
