import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CarShop } from './carShop';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  color: string;

  @Column()
  price: number;

  @Column()
  carShopCnpj: string;

  @Column()
  image: string;

  @ManyToOne(() => CarShop, carShop => carShop.cars)
  @JoinColumn({ name: 'carShopCnpj', referencedColumnName: 'cnpj' })
  carShop: CarShop;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
