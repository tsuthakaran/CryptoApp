import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SupportThread,
  SupportThreadSchema,
} from '../Schemas/cust-supp.schema';
import { CustomerSupportService } from '../Services/cust-supp.service';
import { CustomerSupportController } from '../Controllers/cust-supp.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportThread.name, schema: SupportThreadSchema },
    ]),
  ],
  providers: [CustomerSupportService],
  controllers: [CustomerSupportController],
})
export class SupportThreadModule {}