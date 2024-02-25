import { IsEmail, IsEnum, IsNotEmpty, IsString, isEnum } from 'class-validator';
import { DeepPartial } from 'typeorm';

export class SignInDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignUpDTO {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  type: DeepPartial<'consumer' | 'merchant'>;
}

export class ForgotPassDTO {
  @IsString()
  email: string;
}

export class ResetPassDTO {
  @IsString()
  email: string;

  @IsString()
  authCode: string;

  @IsString()
  newPassword: string;
}
