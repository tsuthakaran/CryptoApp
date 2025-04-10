import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from '../Schemas/wallet.schema';
import { CreateWalletDto } from '../Dtos/create-wallet.dto';

@Injectable()
export class WalletService {
  constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>) {}

  async createWallet(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const randomPrefix = Math.floor(10000 + Math.random() * 90000);
  
    const existingByEmail = await this.walletModel.findOne({ email: createWalletDto.email });
    if (existingByEmail) {
      throw new Error('A wallet with this email already exists.');
    }

    let wAddressExists = true;
    let wAddress = '';
    while (wAddressExists) {
      wAddress = String(Math.floor(10000 + Math.random() * 90000));
      const existingByAddress = await this.walletModel.findOne({ wAddress });
      if (!existingByAddress) {
        wAddressExists = false;
      }
    }

    const newWalletData = {
      ...createWalletDto,
      wAddress: randomPrefix,
    };
  
    const newWallet = await this.walletModel.create(newWalletData);
  
    return newWallet;
  }

  async getWallets(): Promise<Wallet[]> {
    return this.walletModel.find().exec();
  }
  async findByEmail(email: string): Promise<Wallet | null> {
    return await this.walletModel.findOne({ email }).exec();
  }
  async findByAddress(wAddress: string): Promise<Wallet | null> {
    return await this.walletModel.findOne({ wAddress }).exec();
  }
  async findById(id: string): Promise<Wallet | null> {
    return await this.walletModel.findById(id).exec();
  }
}
