import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user || !user.password) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, name: user.name, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(email: string, name: string, pass: string) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new BadRequestException();
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(pass, salt);

    const newUser = await this.usersService.create({
      email: email,
      name: name,
      password: hashedPassword,
    });

    const payload = {
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async changeName(email: string, name: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException();
    }

    this.usersService.update(user.id, { name: name });
  }

  async changePassword(
    email: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException();
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    this.usersService.update(user.id, { password: hashedPassword });
  }
}
