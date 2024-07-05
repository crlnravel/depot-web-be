import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode, Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { AuthGuard } from '../auth/auth.guard';
import { SetAlamatDto } from './dto/set-alamat.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findByEmail(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateProfile(updateUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/update-password')
  updatePassword(@Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.usersService.updatePassword(updateUserPasswordDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('alamat/:id')
  getAlamat(@Param('id') id: string) {
    return this.usersService.getAlamat(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('alamat/:id')
  setAlamat(@Param('id') id: string, @Body() setAlamatDto: SetAlamatDto) {
    return this.usersService.setAlamat(+id, setAlamatDto);
  }
}
