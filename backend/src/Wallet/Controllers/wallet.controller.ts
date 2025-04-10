import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WalletService } from '../Services/wallet.service';
import { CreateWalletDto } from '../Dtos/create-wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('create')
  async createWallet(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(createWalletDto);
  }

  @Get()
  async getWallets() {
    return this.walletService.getWallets();
  }

  @Get('email/:email')
  async getWalletByEmail(@Param('email') email: string) {
    return this.walletService.findByEmail(email);
  }
  @Get('address/:wAddress')
  async getWalletByAddress(@Param('wAddress') wAddress: string) {
    return this.walletService.findByAddress(wAddress);
  }
  @Get(':id')
  async getWalletById(@Param('id') id: string) {
    return this.walletService.findById(id);
  }
}
