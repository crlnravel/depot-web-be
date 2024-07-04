import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: createUserDto.password,
        role: 'USER',
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async updateProfile(updateUserDto: UpdateUserDto) {
    const user = await this.findByEmail(updateUserDto.email);

    if (!user) {
      throw new BadRequestException();
    }

    return this.prisma.user.update({
      where: {
        email: updateUserDto.email,
      },
      data: {
        name: updateUserDto.name,
        alamat: updateUserDto.alamat,
      },
    });
  }

  async updatePassword(updateUserPasswordDto: UpdateUserPasswordDto) {
    const user = await this.findByEmail(updateUserPasswordDto.email);

    if (!user) {
      throw new BadRequestException();
    }

    const isPasswordValid = await bcrypt.compare(
      updateUserPasswordDto.oldPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const hashedPassword = await bcrypt.hash(
      updateUserPasswordDto.newPassword,
      10,
    );

    return this.prisma.user.update({
      where: {
        email: updateUserPasswordDto.email,
      },
      data: {
        password: hashedPassword,
      },
    });
  }
}
