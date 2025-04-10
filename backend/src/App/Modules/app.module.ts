import { Module } from '@nestjs/common';
import { AppController } from '../Controllers/app.controller';
import { AppService } from '../Services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletModule } from 'src/Wallet/Modules/wallet.module';
import { TransactionModule } from 'src/Transactions/Modules/transactions.module';
import { SupportThreadModule } from 'src/Customer Support/Modules/cust-supp.module';
import { AuthModule } from '../../Auth/Modules/auth.module';
const username = encodeURIComponent("mongoDBfrostyshrek");
const password = encodeURIComponent("CFRci28MGXkr34uw");

const uri = 'mongodb+srv://mongoDBfrostyshrek:CFRci28MGXkr34uw@clustermain.g1xju.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMain';

@Module({
  imports: [
    MongooseModule.forRoot(uri),
    WalletModule,
    TransactionModule,
    SupportThreadModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
