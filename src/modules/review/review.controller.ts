import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { ReviewService } from './review.service';
import { GiveReviewDTO } from './dto';
import { GetUser } from 'src/common/decorators';

@UseGuards(JwtAuthGuard)
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post('/give-review')
  async giveReview(@GetUser('id') userId: string, @Body() dto: GiveReviewDTO) {
    return await this.reviewService.giveReview(userId, dto);
  }
}
