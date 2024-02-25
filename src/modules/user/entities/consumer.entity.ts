import { Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Booking } from 'src/modules/booking/entities/booking.entity';

@Entity('consumers')
export class Consumer {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToOne(() => User, (user) => user.merchant)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @OneToOne(() => Booking, (booking) => booking.consumer)
  booking: Booking;
}
