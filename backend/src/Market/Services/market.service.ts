import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Market } from '../Schemas/market.schema';

import { Currency } from '../Schemas/currency.schema';

@Injectable()
export class MarketService {
  constructor(@InjectModel(Market.name) private marketModel: Model<Market>) {}

  async getOrCreateMarket(): Promise<Market> {
    let market = await this.marketModel.findOne().exec();
    if (!market) {
      market = await this.marketModel.create({
        listOfAvailableCurrencies: [
          {
            symbol: 'USD',
            name: 'US Dollar',
            currency: 'USD',
            value: 1,
            change: 0,
            icon: 'usd-icon.png',
          },
          {
            symbol: 'ETH',
            name: 'Ethereum',
            currency: 'ETH',
            value: 0,
            change: 0,
            icon: 'eth-icon.png',
          },
          {
            symbol: 'BTC',
            name: 'Bitcoin',
            currency: 'BTC',
            value: 0,
            change: 0,
            icon: 'btc-icon.png',
          },
        ],
      });
    }
    return market;
  }

  async addCurrency(newCurrency: Currency): Promise<Market> {
    const market = await this.getOrCreateMarket();

    if (!newCurrency?.symbol) {
      throw new Error('Invalid currency object: missing symbol.');
    }

    const symbol = newCurrency.symbol.trim().toUpperCase();

    const exists = market.listOfAvailableCurrencies.some(
      (c) => c.symbol.toUpperCase() === symbol,
    );

    if (!exists) {
      market.listOfAvailableCurrencies.push({ ...newCurrency, symbol });
      return market.save();
    }

    return market;
  }

  async removeCurrency(symbol: string): Promise<Market> {
    const market = await this.getOrCreateMarket();

    const normalized = symbol.trim().toUpperCase();

    const exists = market.listOfAvailableCurrencies.some(
      (c) => c.symbol.toUpperCase() === normalized,
    );

    if (exists) {
      market.listOfAvailableCurrencies = market.listOfAvailableCurrencies.filter(
        (c) => c.symbol.toUpperCase() !== normalized,
      );
      return market.save();
    }

    return market;
  }
}