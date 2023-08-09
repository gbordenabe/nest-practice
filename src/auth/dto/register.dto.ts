import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
