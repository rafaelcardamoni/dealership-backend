import {
  Entity,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Cars } from './Cars';

@Entity('images')
class Images {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  car_id: string;

  @ManyToOne(() => Cars)
  @JoinColumn({ name: 'car_id' })
  cars: Cars;

  @CreateDateColumn({ select: false })
  created_at: Date;
}

export { Images };
