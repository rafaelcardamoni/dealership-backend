import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  OneToMany
} from 'typeorm';
import { Images } from './Images';
import { v4 as uuid } from 'uuid';

@Entity('cars')
class Cars {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  trim: string;

  @Column()
  year: string;

  @Column()
  mileage: number;

  @Column()
  price: number;

  @Column()
  engine: string;

  @Column()
  transmission: string;

  @Column()
  power: number;

  @Column()
  fuel: string;

  @Column({ nullable: true })
  city_consumption: number;

  @Column({ nullable: true })
  road_consumption: number;

  @Column({ nullable: true })
  range: number;

  @Column()
  type: string;

  @Column()
  color: string;

  @OneToMany(() => Images, images => images.cars)
  images: Images[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Cars };
