import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';
import * as cheerio from 'cheerio';
import { Rate } from '../../entities/rate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RateRepository } from './exchange-rate.repository';

@Injectable()
export class ExchangeRateService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @InjectRepository(Rate) private readonly rateRepository: RateRepository
    ) {}

    private fetchData = async (): Promise<string[][] | undefined> => {
        const url = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/';

        try {
            const response = await axios.get(url);
            const html = response.data;
        
            const $ = cheerio.load(html);
        
            const tableOfContent = $('.currency-table tbody tr td')
                .map((_, element) => $(element).text())
                .get();

            const resultArray = [];
            const chunkSize = 5; // each five elements (one row)

            for (let i = 0; i < tableOfContent.length; i += chunkSize) {
                const chunk = tableOfContent.slice(i, i + chunkSize);
                resultArray.push(chunk);
            }
        
            return resultArray;
        } catch (error) {
          console.error('Error:', error.message); //! ERROR
        }
    };

    public getExchangeRates = async (): Promise<any> => {
        const cachedRates = await this.cacheManager.get('rates');
        const cachedTime = await this.cacheManager.get('time');

        if (cachedRates) {
            // @ts-ignore
            return {rates: cachedRates, time: cachedTime};
        }
        
        const result = await this.fetchData();
        
        if (result) {
            const parsed = result.map((item, index) => {
                return {
                    country: item[0], 
                    currency: item[1], 
                    amount: +item[2], 
                    code: item[3], 
                    rate: +item[4],
                    id: index
                }
            });

            await this.cacheManager.set('rates', parsed);    
            await this.cacheManager.set('time', Date.now());     
            
            const entities = parsed.map(item => {
                return this.rateRepository.create(item);
            });
            
            const inserted = await this.rateRepository.save(entities);
            return {rates: inserted, time: 0};
        }

        return [];
    };   
}
  