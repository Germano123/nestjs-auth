import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalAuthService } from './local-auth.service';

const providers = [
  {
    provide: AuthService,
    useClass: LocalAuthService,
  },
  LocalStrategy,
  JwtStrategy,
];

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: "my-super-secret",
      signOptions: { expiresIn: '3000s' },
    }),
    // with custom api config
    // JwtModule.registerAsync({
    //   imports: [SharedModule],
    //   inject: [ApiConfigService],
    //   useFactory: (config: ApiConfigService) => {
    //     return {
    //       secret: config.jwtConfig.secret,
    //       signOptions: {
    //         expiresIn: config.jwtConfig.expiration,
    //       }
    //     }
    //   },
  ],
  controllers: [AuthController],
  providers,
})
export class AuthModule {}
