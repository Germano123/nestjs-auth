import { CredentialsDto } from './dto/CredentialsDto';
import { JwtPayloadDto } from './dto/JwtPayloadDto';

export abstract class AuthService {
  abstract login(credentials: CredentialsDto): Promise<any>;
  abstract register(credentials: CredentialsDto): Promise<any>;
  abstract validateUser(email: string, password: string): Promise<JwtPayloadDto>;
}
