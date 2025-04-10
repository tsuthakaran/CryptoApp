import { AuthService } from '../Services/auth.service';
import { WalletService } from '../../Wallet/Services/wallet.service';
export declare class AuthController {
    private authService;
    private walletService;
    constructor(authService: AuthService, walletService: WalletService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        access_token: string;
    }>;
    register(body: {
        email: string;
        password: string;
        walletType: string;
        recoveryPhrases: string;
    }): Promise<{
        message: string;
        user: import("../../Wallet/Schemas/wallet.schema").Wallet;
    }>;
    verifyPassphrase(body: {
        passphrase: string;
    }): Promise<{
        message: string;
        token: string;
    }>;
    resetPassword(body: {
        token: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    generateResetToken(body: {
        email: string;
    }): Promise<{
        message: string;
        token: string;
    }>;
}
export declare class ProfileController {
    getProfile(req: any): any;
}
