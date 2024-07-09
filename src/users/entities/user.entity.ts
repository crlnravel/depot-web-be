import { $Enums, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UserEntity implements User {
  @ApiProperty()
  email: string;

  @ApiProperty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiProperty()
  alamat: string;

  @IsEnum($Enums.Role)
  @ApiProperty({ enum: () => $Enums.Role })
  role: $Enums.Role;
}
