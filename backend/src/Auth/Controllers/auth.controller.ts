import {
  Post,
  Body,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../Services/auth.service';
import { WalletService } from '../../Wallet/Services/wallet.service';
import { Controller, Get, UseGuards, Request} from '@nestjs/common';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private walletService: WalletService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    try {
      const token = await this.authService.login(email, password);
      return { message: 'Login successful', access_token: token.access_token };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('register')
  async register(
    @Body()
    body: {
      email: string;
      password: string;
      walletType: string;
      recoveryPhrases: string;
    },
  ) {
    const { email, password, walletType, recoveryPhrases } = body;

    try {
      const existingWallet = await this.walletService.findByEmail(email);
      if (existingWallet) {
        throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
      }

      const newWallet = await this.walletService.createWallet({
        email,
        password,
        walletType,
        recoveryPhrases,
      });

      return { message: 'User registered successfully', user: newWallet };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  
  // Passphrase verification endpoint
  @Post('verify-passphrase')
  async verifyPassphrase(@Body() body: { passphrase: string }) {
    try {
      const user = await this.authService.verifyPassphrase(body.passphrase);
      const token = await this.authService.generateToken(user); // Use real token logic
      return { message: 'Passphrase verified successfully', token };
    } catch (error) {
      throw new HttpException('Incorrect passphrase', HttpStatus.UNAUTHORIZED);
    }
  }
  
  // Reset password endpoint
  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    const { token, newPassword } = body;

    try {
      // Decode and verify the token
      const user = await this.authService.verifyResetPasswordToken(token);

      // If the token is valid, proceed with resetting the password
      await this.authService.resetPassword(user.email, newPassword);

      return { message: 'Password successfully reset.' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('generate-reset-token')
  async generateResetToken(@Body() body: { email: string }) {
    const { email } = body;

    try {
      // Generate reset token
      const token = await this.authService.generateResetToken(email);
      return { message: 'Reset token generated successfully', token };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

@Controller('profile')
export class ProfileController {
  @UseGuards(JwtAuthGuard)  // Protect the route
  @Get('me')
  getProfile(@Request() req) {
    console.log(req.user);  // Log the user information
    return req.user;  // Access the user information from the JWT
  }
}

