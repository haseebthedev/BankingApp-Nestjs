import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  message: string;
}
