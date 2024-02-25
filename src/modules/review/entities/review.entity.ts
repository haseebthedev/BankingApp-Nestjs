import { Booking } from '../../booking/entities/booking.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookingId: string;

  @Column()
  review: string;

  @Column()
  rating: number;

  @Column()
  reviewBy: string;

  @OneToOne(() => Booking, (booking) => booking.reviewBy)
  @JoinColumn({ name: 'bookingId', referencedColumnName: 'id' })
  booking: Booking;

  @OneToOne(() => User, (user) => user.reviewBy)
  @JoinColumn({ name: 'reviewBy', referencedColumnName: 'id' })
  user: User;
}
