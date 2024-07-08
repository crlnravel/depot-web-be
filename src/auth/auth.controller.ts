import {
  Body,
  Controller,
  Get,
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
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  @UseGuards(AuthGuard)
  logout(@Req() request: Request): Promise<void> {
    return this.authService.logout(request['user']['token']);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.email,
      registerDto.name,
      registerDto.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('verify-token')
  @UseGuards(AuthGuard)
  verifyToken(): void {
    return;
  }
}
