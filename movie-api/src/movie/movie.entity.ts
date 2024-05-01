

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  releaseYear: number;
  @Column({ nullable: true })
  title: string;

  @Column()
  genre: string;

  @OneToMany(() => Review, review => review.movie, { nullable: true }) // Set nullable option to true
  reviews: Review[];
}
