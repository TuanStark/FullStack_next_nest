import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, StrategyOptionsWithRequest } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
      passReqToCallback: true, // ✅ Đã thêm tham số này
    } as StrategyOptionsWithRequest);
  }

  async validate(
    req: any, // ✅ Phải có req vì passReqToCallback: true
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    console.log('Google Profile:', profile); // 🐛 Debug dữ liệu profile

    if (!profile || !profile.emails || profile.emails.length === 0) {
      return done(new Error('Google account does not provide an email'), false);
    }

    const user = await this.authService.validateGoogleUser({
        email: profile.emails[0].value,
        name: profile.displayName,
        avatar: profile.photos[0].value,
        password: '',
    });

    console.log('Authenticated User:', user); // 🐛 Debug dữ liệu user

    return done(null, user);
  }
}
