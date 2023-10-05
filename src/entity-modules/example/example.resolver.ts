import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Example } from '../../entities';
import { ExampleService } from './example.service';
import { CreateExampleInputType } from './dto';

@Resolver(() => Example)
export class ExampleResolver {
    constructor(private readonly propertyService: ExampleService) {}

    @Query(() => Example, { nullable: true })
    public async exampleByName(@Args('name') name: string) {
        return this.propertyService.getByName(name);
    }

    @Mutation(() => Example)
    public async createExample(@Args('data') data: CreateExampleInputType): Promise<Example> {
        return this.propertyService.createExample(data);
    }
}
