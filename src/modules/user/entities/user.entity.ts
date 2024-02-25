import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Merchant } from './merchant.entity';
import { Consumer } from './consumer.entity';
import { Review } from '../../review/entities/review.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: null, type: 'enum', enum: ['consumer', 'merchant'] })
  type: string;

  @OneToOne(() => Merchant)
  merchant: Merchant;

  @OneToOne(() => Consumer)
  consumer: Consumer;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    try {
      if (this.password) {
        this.password = await bcrypt.hash(this.password, 10);
      }
    } catch (error) {
      User;
      console.log('Error hashing password: ', error);
      throw error;
    }
  }

  @OneToOne(() => Review, (review) => review.review)
  reviewBy: Review;
}
