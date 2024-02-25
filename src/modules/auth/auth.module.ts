import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumer } from '../user/entities/consumer.entity';
import { Merchant } from '../user/entities/merchant.entity';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User, Consumer, Merchant]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
