"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const wallet_schema_1 = require("../../Wallet/Schemas/wallet.schema");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    walletModel;
    jwtService;
    constructor(walletModel, jwtService) {
        this.walletModel = walletModel;
        this.jwtService = jwtService;
    }
    async login(email, password) {
        const user = await this.walletModel.findOne({ email }).exec();
        if (!user || user.password !== password) {
            throw new Error('Invalid email or password');
        }
        const payload = { email: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                _id: user._id,
                email: user.email,
                wAddress: user.wAddress,
            },
        };
    }
    async verifyPassphrase(passphrase) {
        const user = await this.walletModel.findOne({ recoveryPhrases: passphrase });
        if (!user) {
            throw new Error('Passphrase is incorrect');
        }
        return user;
    }
    async generateToken(user) {
        const payload = { email: user.email, sub: user._id };
        return this.jwtService.sign(payload);
    }
    async verifyResetPasswordToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.walletModel.findOne({ email: payload.email });
            if (!user) {
                throw new Error('Invalid token or user not found.');
            }
            return user;
        }
        catch (error) {
            throw new Error('Invalid or expired token.');
        }
    }
    async resetPassword(email, newPassword) {
        const user = await this.walletModel.findOne({ email });
        if (!user) {
            throw new Error('User not found.');
        }
        user.password = newPassword;
        await user.save();
    }
    async generateResetToken(email) {
        const user = await this.walletModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const payload = { email: user.email, sub: user._id };
        const token = this.jwtService.sign(payload, { expiresIn: '15m' });
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(wallet_schema_1.Wallet.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map