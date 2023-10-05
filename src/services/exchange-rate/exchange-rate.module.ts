import { Module, CacheModule } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateResolver } from './exchange-rate.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from '../../entities/rate.entity';

@Module({
    imports: [
        CacheModule.register({ttl: 300000}),
        TypeOrmModule.forFeature([Rate])
    ],
    providers: [ExchangeRateService, ExchangeRateResolver],
    exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
