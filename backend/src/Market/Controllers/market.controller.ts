import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { MarketService } from '../Services/market.service';
import { CreateCurrencyDto } from '../Dtos/create-currency.dto';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get()
  async getMarket() {
    return this.marketService.getOrCreateMarket();
  }

  @Post('add-currency')
  async addCurrency(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.marketService.addCurrency(createCurrencyDto);
  }

  @Delete('remove-currency/:symbol')
  async removeCurrency(@Param('symbol') symbol: string) {
    return this.marketService.removeCurrency(symbol);
  }
}

