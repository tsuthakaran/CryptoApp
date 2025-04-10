import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketService } from '../Services/market.service';
import { MarketController } from '../Controllers/market.controller';
import { Market, MarketSchema } from '../Schemas/market.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Market.name, schema: MarketSchema }])],
  controllers: [MarketController],
  providers: [MarketService],
  exports: [MarketService],
})
export class MarketModule {}
