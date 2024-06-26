import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ChangePassDTO, UpdateProfileDTO } from './dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards';
import { GetUser } from 'src/common/decorators';
import { User } from './entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getProfile(@GetUser() user: User) {
    return this.userService.findById(user.id);
  }

  @Post('me')
  async updateProfile(@GetUser() user: User, @Body() dto: UpdateProfileDTO) {
    return this.userService.findByIdandUpdate(user.id, dto);
  }

  @Post('change-password')
  async changePassword(@GetUser() user: User, @Body() dto: ChangePassDTO) {
    return this.userService.changePassword(user.id, dto);
  }
}
