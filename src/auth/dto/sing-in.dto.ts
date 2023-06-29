import { IsNumber, IsString } from "class-validator"

export class SingInDto {

    @IsNumber()
    dni: number

    @IsString()
    password: string
}
