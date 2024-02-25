import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Payment } from './payment.entity';

@Entity('payment_methods')
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @OneToOne(() => Payment)
  payment: Payment;
}
