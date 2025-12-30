import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsString()
    @IsOptional()
    student_id?: string;

    @IsString()
    @IsOptional()
    phone_number?: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}
