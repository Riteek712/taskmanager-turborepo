import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetPassword {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string
}

export class ResetPasswordNext{
    @ApiProperty()
    @IsNotEmpty()
    token: string

    @ApiProperty()
    @IsNotEmpty()
    newPassword: string
}