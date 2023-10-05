import { ObjectType, Field } from '@nestjs/graphql';
import { Rate } from '../../../entities/rate.entity';

@ObjectType()
export class RateWithTime {
  @Field(() => [Rate]) 
  public rates!: Rate[];

  @Field(() => String) 
  public time!: string;
}
