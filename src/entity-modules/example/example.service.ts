import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Example } from '../../entities';
import { CreateExampleInputType } from './dto';
import { ExampleRepository } from './example.repository';

@Injectable()
export class ExampleService {
    constructor(
        @InjectRepository(Example)
        private readonly exampleRepository: ExampleRepository
    ) {}

    public getByName = async (name: string) => {
        const example = await this.exampleRepository.findOne({ where: { name } });
        if (!example) {
            throw new NotFoundException(`Example ${name} not found`);
        }

        return example;
    };

    public createExample = async (data: CreateExampleInputType) => {
        const example = this.exampleRepository.create({
            ...data,
        });

        return this.exampleRepository.save(example);
    };
}
