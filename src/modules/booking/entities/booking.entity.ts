import { Qrs } from 'src/modules/qr/entities/qr.entity';
import { Review } from 'src/modules/review/entities/review.entity';
import { Consumer } from 'src/modules/user/entities/consumer.entity';
import { Merchant } from 'src/modules/user/entities/merchant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: false })
  merchantId: string;

  @Column({ unique: false })
  consumerId: string;

  @Column({ unique: false })
  details: string;

  @Column({ unique: false })
  amount: number;

  @Column({ unique: false })
  status: string;

  @OneToOne(() => Merchant)
  @JoinColumn({ name: 'merchantId', referencedColumnName: 'id' })
  merchant: Merchant;

  @OneToOne(() => Consumer)
  @JoinColumn({ name: 'consumerId', referencedColumnName: 'id' })
  consumer: Consumer;

  @OneToOne(() => Qrs, (qrs) => qrs.booking)
  qrs: Qrs;

  @OneToOne(() => Review, (review) => review.booking)
  reviewBy: Review;
}
