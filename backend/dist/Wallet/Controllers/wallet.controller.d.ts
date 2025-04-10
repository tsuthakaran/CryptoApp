import { WalletService } from '../Services/wallet.service';
import { CreateWalletDto } from '../Dtos/create-wallet.dto';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    createWallet(createWalletDto: CreateWalletDto): Promise<import("../Schemas/wallet.schema").Wallet>;
    getWallets(): Promise<import("../Schemas/wallet.schema").Wallet[]>;
    getWalletByEmail(email: string): Promise<import("../Schemas/wallet.schema").Wallet | null>;
    getWalletByAddress(wAddress: string): Promise<import("../Schemas/wallet.schema").Wallet | null>;
    getWalletById(id: string): Promise<import("../Schemas/wallet.schema").Wallet | null>;
}
