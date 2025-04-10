import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from '../Schemas/wallet.schema';
import { WalletService } from '../Services/wallet.service';
import { WalletController } from '../Controllers/wallet.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }])],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService, MongooseModule],
})
export class WalletModule {}
