import { Model } from 'mongoose';
import { Wallet } from '../../Wallet/Schemas/wallet.schema';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private walletModel;
    private jwtService;
    constructor(walletModel: Model<Wallet>, jwtService: JwtService);
    login(email: string, password: string): Promise<{
        access_token: string;
        user: any;
    }>;
    verifyPassphrase(passphrase: string): Promise<import("mongoose").Document<unknown, {}, Wallet> & Wallet & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    generateToken(user: any): Promise<string>;
    verifyResetPasswordToken(token: string): Promise<import("mongoose").Document<unknown, {}, Wallet> & Wallet & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    resetPassword(email: string, newPassword: string): Promise<void>;
    generateResetToken(email: string): Promise<string>;
}
