import { IsString } from 'class-validator';

export class EmailTokenDto {
  @IsString()
  emailToken: string;
}
