import { Query, Resolver } from '@nestjs/graphql';
import { ExchangeRateService } from './exchange-rate.service';
import { Rate } from '../../entities/rate.entity';
import { RateWithTime } from './dto';

@Resolver()
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    // TODO: Implement a GraphQL Query that returns the exchange rates
    @Query(() => RateWithTime)
    async exchangeRates(): Promise<RateWithTime> {
        return this.exchangeRateService.getExchangeRates();
    }
}
    