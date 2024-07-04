import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  oldPassword: string;

  @IsStrongPassword()
  newPassword: string;
}
