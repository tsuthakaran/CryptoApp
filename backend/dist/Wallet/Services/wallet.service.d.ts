import { Model } from 'mongoose';
import { Wallet } from '../Schemas/wallet.schema';
import { CreateWalletDto } from '../Dtos/create-wallet.dto';
export declare class WalletService {
    private walletModel;
    constructor(walletModel: Model<Wallet>);
    createWallet(createWalletDto: CreateWalletDto): Promise<Wallet>;
    getWallets(): Promise<Wallet[]>;
    findByEmail(email: string): Promise<Wallet | null>;
    findByAddress(wAddress: string): Promise<Wallet | null>;
    findById(id: string): Promise<Wallet | null>;
}
