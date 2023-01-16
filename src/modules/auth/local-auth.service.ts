import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/CredentialsDto';
import { JwtPayloadDto } from './dto/JwtPayloadDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LocalAuthService implements AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(credentials: CredentialsDto): Promise<any> {
    const payload = await this.validateUser(credentials.email, credentials.password);
    return {
        access_token: this.jwtService.sign({
          id: payload.id,
          name: payload.name,
          email: payload.email,
        }),
    };
  }

  async register(credentials: CredentialsDto): Promise<any> {
    return null;
  }

  async validateUser(email: string, password: string): Promise<JwtPayloadDto> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === password) {
      return new JwtPayloadDto(String(user.id), user.name, user.email);
    }
    return null;
  }
}
