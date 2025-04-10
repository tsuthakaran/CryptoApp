import { IsNotEmpty, IsEmail } from 'class-validator';
export class CreateWalletDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  recoveryPhrases: string;

  @IsNotEmpty()
  walletType: string;
}
