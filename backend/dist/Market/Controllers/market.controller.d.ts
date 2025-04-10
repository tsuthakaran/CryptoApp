import { MarketService } from '../Services/market.service';
import { CreateCurrencyDto } from '../Dtos/create-currency.dto';
export declare class MarketController {
    private readonly marketService;
    constructor(marketService: MarketService);
    getMarket(): Promise<import("../Schemas/market.schema").Market>;
    addCurrency(createCurrencyDto: CreateCurrencyDto): Promise<import("../Schemas/market.schema").Market>;
    removeCurrency(symbol: string): Promise<import("../Schemas/market.schema").Market>;
}
