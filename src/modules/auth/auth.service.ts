import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Merchant } from '../user/entities/merchant.entity';
import { Consumer } from '../user/entities/consumer.entity';
import { UserService } from '../user/user.service';
import { UserType } from 'src/common/enums';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService,
    @InjectRepository(Merchant) private merchantRepo: Repository<Merchant>,
    @InjectRepository(Consumer) private consumerRepo: Repository<Consumer>,
  ) {}

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const token = await this.jwt.signAsync(
      { sub: userId, email },
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
        secret: process.env.JWT_SECRET,
      },
    );
    return { access_token: token };
  }

  async signin(
    dto: SignInDTO,
  ): Promise<{ user: User; token: { access_token: string } }> {
    const user = await this.userService.findByEmail(dto.email);
    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch)
      throw new UnauthorizedException('Either email or password is invalid');

    const token = await this.signToken(user.id, user.email);
    return { user, token };
  }

  async signup(
    dto: SignUpDTO,
  ): Promise<{ user: User; token: { access_token: string } }> {
    try {
      const user = await this.userService.create(dto);

      if (user.type.toUpperCase().match(UserType.MERCHANT)) {
        const merchant = this.merchantRepo.create({ user });
        await this.merchantRepo.save(merchant);
      }

      if (user.type.toUpperCase().match(UserType.CONSUMER)) {
        const consumer = this.consumerRepo.create({ user });
        await this.consumerRepo.save(consumer);
      }

      const token = await this.signToken(user.id, user.email);
      return { user, token };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists with this email');
      }
      throw error;
    }
  }
}
