import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from '../../Wallet/Schemas/wallet.schema';

import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<{ access_token: string; user: any }> {
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

  async verifyPassphrase(passphrase: string) {
    const user = await this.walletModel.findOne({ recoveryPhrases: passphrase });

    if (!user) {
      throw new Error('Passphrase is incorrect');
    }

    return user;
  }
  async generateToken(user: any) {
    const payload = { email: user.email, sub: user._id };
    return this.jwtService.sign(payload); 
  }
  async verifyResetPasswordToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);  // Decode and verify token
      const user = await this.walletModel.findOne({ email: payload.email });

      if (!user) {
        throw new Error('Invalid token or user not found.');
      }

      return user;
    } catch (error) {
      throw new Error('Invalid or expired token.');
    }
  }

  async resetPassword(email: string, newPassword: string) {
    const user = await this.walletModel.findOne({ email });

    if (!user) {
      throw new Error('User not found.');
    }

    // Update the password
    user.password = newPassword;
    await user.save();
  }
  async generateResetToken(email: string) {
    const user = await this.walletModel.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload, { expiresIn: '15m' });

    return token;
  }

}
