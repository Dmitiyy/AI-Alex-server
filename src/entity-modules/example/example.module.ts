import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Example } from '../../entities';
import { ExampleResolver } from './example.resolver';
import { ExampleService } from './example.service';

@Module({
    imports: [TypeOrmModule.forFeature([Example])],
    providers: [ExampleService, ExampleResolver],
    exports: [ExampleService],
})
export class ExampleModule {}
