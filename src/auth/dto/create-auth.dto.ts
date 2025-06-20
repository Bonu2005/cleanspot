import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export enum Role {
    CLIENT = 'CLIENT',
    DRIVER = 'DRIVER',
    ADMIN = 'ADMIN',
}

export class CreateAuthDto {
    @ApiProperty({ example: 'bonu123', description: 'Имя пользователя' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: 'bonu@mail.com', description: 'Почта пользователя' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'qwerty123', description: 'Пароль', minLength: 6 })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: '998971718717', description: 'Телефон', minLength: 6 })
    @IsString()
    @MinLength(6)
    phone: string;

    @ApiProperty({ enum: Role, example: Role.CLIENT, description: 'Роль пользователя' })
    @IsEnum(Role)
    role: Role;
}



export class LoginDto {
    @ApiProperty({ example: 'alishersharipov670@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '12345' })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    location?: string
}

export class ActivateDto {
    @ApiProperty({ example: 'alishersharipov670@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '12324' })
    @IsNotEmpty()
    @IsString()
    otp: string;
}

export class SendOtpDto {
    @ApiProperty({ example: 'alishersharipov670@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class RefreshTokenDto {
    @ApiProperty({ example: 'refresh token' })
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}

export class ResetPasswordDto {
    @ApiProperty({ example: 'alishersharipov670@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '12345' })
    @IsNotEmpty()
    @IsString()
    otp: string;

    @ApiProperty({ example: '54321' })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    new_password: string;
}