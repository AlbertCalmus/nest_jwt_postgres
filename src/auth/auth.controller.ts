import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() loginDto: LoginDto,
    @Request() req,
    @Res({ passthrough: true }) response: Response
  ) {
    const access_token = this.authService
      .login(req.user)
      .then((v) => v.access_token);

    response.cookie('access_token', await access_token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
      sameSite: 'none',
      secure: true
    });

    response.status(HttpStatus.OK);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req): Promise<UserDto> {
    return this.authService.getUserInfo(req.user.phoneNumber);
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('access_token', '', {
      maxAge: 0
    });
  }
}
