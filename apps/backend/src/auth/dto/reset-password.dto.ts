import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetPassword {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string
}