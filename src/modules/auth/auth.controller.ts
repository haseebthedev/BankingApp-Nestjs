import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ForgotPassDTO, ResetPassDTO, SignInDTO, SignUpDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signin(@Body() dto: SignInDTO) {
    return this.authService.signin(dto);
  }

  @Post('signup')
  signup(@Body() dto: SignUpDTO) {
    return this.authService.signup(dto);
  }
}
