/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthenticationService {
  async signUp(signUpDto: SignUpDto) {
    return 'signUp';
  }

  async signIn(signInDto: SignInDto) {
    return 'signIn';
  }
}
