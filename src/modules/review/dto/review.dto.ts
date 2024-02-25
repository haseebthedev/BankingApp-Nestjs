import { IsNumber, IsString } from 'class-validator';

export class GiveReviewDTO {
  @IsString()
  bookingId: string;

  @IsNumber()
  rating: number;

  @IsString()
  review: string;
}
