import { Model } from 'mongoose';
import { Market } from '../Schemas/market.schema';
import { Currency } from '../Schemas/currency.schema';
export declare class MarketService {
    private marketModel;
    constructor(marketModel: Model<Market>);
    getOrCreateMarket(): Promise<Market>;
    addCurrency(newCurrency: Currency): Promise<Market>;
    removeCurrency(symbol: string): Promise<Market>;
}
