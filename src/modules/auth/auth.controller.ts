import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/CredentialsDto';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UseGuards(LocalAuthGuard)
  async login(@Body() credentials: CredentialsDto): Promise<any> {
    return await this.authService.login(credentials);
  }

  @Post("register")
  async register(@Body() credentials: CredentialsDto): Promise<any> {
    return await this.authService.register(credentials);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async me(@AuthUser() user: User): Promise<any> {
    return user;
  }
}
