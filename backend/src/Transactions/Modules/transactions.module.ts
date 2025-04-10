import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from '../Schemas/transaction.schema';
import { TransactionService } from '../Services/transactions.service';
import { TransactionController } from '../Controllers/transactions.controller';
import { WalletModule } from 'src/Wallet/Modules/wallet.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    WalletModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
