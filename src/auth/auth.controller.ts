import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';
import { RegisterDto } from './dto/register-user.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Req() request: Request) {
    return this.authService.logout(request['user']);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.email,
      registerDto.name,
      registerDto.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-token')
  @UseGuards(AuthGuard)
  verifyToken() {
    return HttpStatus.OK;
  }

  @HttpCode(HttpStatus.OK)
  @Post('kualitas-air')
  @UseGuards(AuthGuard)
  ubahKualitasAir(@Body() obj) {
    return 'Sukses';
  }
}
