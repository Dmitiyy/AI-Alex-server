import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { VAR_CHAR } from './constants';

@ObjectType()
@Entity({name: 'rate'})
export class Rate {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  public id!: number

  @Field(() => String)
  @Column({ ...VAR_CHAR })
  public country!: string;

  @Field(() => String)
  @Column({ ...VAR_CHAR })
  public currency!: string;

  @Field(() => Int)
  @Column({ ...VAR_CHAR })
  public amount!: number;

  @Field(() => String)
  @Column({ ...VAR_CHAR })
  public code!: string;

  @Field(() => Float)
  @Column({ ...VAR_CHAR })
  public rate!: number;
}
