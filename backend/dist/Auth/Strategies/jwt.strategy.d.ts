import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Wallet } from '../../Wallet/Schemas/wallet.schema';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private walletModel;
    constructor(configService: ConfigService, walletModel: Model<Wallet>);
    validate(payload: any): Promise<Wallet & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
export {};
