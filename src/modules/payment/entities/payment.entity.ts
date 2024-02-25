import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentMethod } from './paymentMethod.entity';
import { Booking } from '../../booking/entities/booking.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: false })
  bookingId: string;

  @Column()
  payMethodId: string;

  @Column()
  amount: number;

  @Column()
  status: string;

  @OneToOne(() => PaymentMethod)
  @JoinColumn({ name: 'payMethodId', referencedColumnName: 'id' })
  paymentMethod: PaymentMethod;

  @OneToOne(() => Booking)
  @JoinColumn({ name: 'bookingId', referencedColumnName: 'id' })
  booking: Booking;
}
