import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The account has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The account already exists.',
  })
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiOperation({ summary: 'Login with an existing user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully logged in.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user does not exist or the password does not match.',
  })
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
