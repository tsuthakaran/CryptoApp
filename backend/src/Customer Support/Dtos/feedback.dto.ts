import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  starRating: number;

  @IsNotEmpty()
  @IsString()
  feedbackText: string;
}


