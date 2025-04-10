"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const market_schema_1 = require("../Schemas/market.schema");
let MarketService = class MarketService {
    marketModel;
    constructor(marketModel) {
        this.marketModel = marketModel;
    }
    async getOrCreateMarket() {
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
    async addCurrency(newCurrency) {
        const market = await this.getOrCreateMarket();
        if (!newCurrency?.symbol) {
            throw new Error('Invalid currency object: missing symbol.');
        }
        const symbol = newCurrency.symbol.trim().toUpperCase();
        const exists = market.listOfAvailableCurrencies.some((c) => c.symbol.toUpperCase() === symbol);
        if (!exists) {
            market.listOfAvailableCurrencies.push({ ...newCurrency, symbol });
            return market.save();
        }
        return market;
    }
    async removeCurrency(symbol) {
        const market = await this.getOrCreateMarket();
        const normalized = symbol.trim().toUpperCase();
        const exists = market.listOfAvailableCurrencies.some((c) => c.symbol.toUpperCase() === normalized);
        if (exists) {
            market.listOfAvailableCurrencies = market.listOfAvailableCurrencies.filter((c) => c.symbol.toUpperCase() !== normalized);
            return market.save();
        }
        return market;
    }
};
exports.MarketService = MarketService;
exports.MarketService = MarketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(market_schema_1.Market.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MarketService);
//# sourceMappingURL=market.service.js.map