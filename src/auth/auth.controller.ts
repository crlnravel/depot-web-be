import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-token')
  @UseGuards(AuthGuard)
  verifyToken() {
    return HttpStatus.OK;
  }

  @HttpCode(HttpStatus.OK)
  @Get('tes')
  @UseGuards(AuthGuard)
  tes(@Query() nama: String) {
    return 'Halo ' + nama;
  }

  @HttpCode(HttpStatus.OK)
  @Post('kualitas-air')
  @UseGuards(AuthGuard)
  ubahKualitasAir(@Body() obj) {
    return 'Sukses';
  }
}
