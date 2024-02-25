import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { GiveReviewDTO } from './dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
  ) {}

  async giveReview(userId: string, dto: GiveReviewDTO) {
    const review = this.reviewRepo.create({ ...dto, reviewBy: userId });
    await this.reviewRepo.save(review);
    return review;
  }
}
