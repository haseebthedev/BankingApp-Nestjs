import { Booking } from '../../booking/entities/booking.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('qrs')
export class Qrs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  bookingId: string;

  @Column({ nullable: false })
  merchantId: string;

  @Column({ nullable: false })
  consumerId: string;

  @OneToOne(() => Booking, (booking) => booking.qrs)
  @JoinColumn({ name: 'bookingId', referencedColumnName: 'id' })
  booking: Booking;
}
