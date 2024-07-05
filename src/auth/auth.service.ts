import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '24h',
      }),
      alamat: user.alamat,
    };
  }

  async logout(token: string) {
    // Set for blacklisted token so that users cannot access the web with same token
    await this.cacheManager.set(token, 'blacklisted', 86_400_000);
  }

  async register(email: string, name: string, pass: string) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new BadRequestException();
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(pass, salt);

    return this.usersService.create({
      email: email,
      name: name,
      password: hashedPassword,
    });
  }
}
