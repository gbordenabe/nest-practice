import { IsNumber, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    firstName: string

    @IsString()
    lastName: string;
  
    @IsNumber()
    dni: number;

    @IsString()
    username: string

    @IsString()
    password: string
}
