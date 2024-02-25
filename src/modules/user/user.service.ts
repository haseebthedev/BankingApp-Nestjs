import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { SignUpDTO } from '../auth/dto';
import { ChangePassDTO, UpdateProfileDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Consumer } from './entities/consumer.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Consumer) private consumerRepo: Repository<Consumer>,
  ) {}

  async create(dto: SignUpDTO): Promise<User> {
    const userInDB = await this.userRepo.findOne({
      where: {
        email: dto.email,
      },
    });

    if (userInDB) {
      throw new ConflictException('User already exists with this email');
    }

    const user = this.userRepo.create(dto);
    return await this.userRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { email },
    });

    if (user) return user;
    else throw new NotFoundException(`User with email ${email} not found`);
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    return user;
  }

  async findUserByConsumerId(consumerId: string): Promise<User | null> {
    const user = await this.consumerRepo
      .createQueryBuilder('consumers')
      .leftJoinAndSelect('consumers.user', 'users')
      .where('consumers.userId = users.id')
      .andWhere('consumers.userId  = :consumerId', { consumerId })
      .getOne();

    if (!user)
      throw new NotFoundException(`User with ID ${consumerId} not found`);
    return user.user;
  }

  async findByIdandUpdate(
    userId: string,
    dto: UpdateProfileDTO,
  ): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    return await this.userRepo.save({ ...user, ...dto });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async changePassword(userId: string, dto: ChangePassDTO) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const isPassMatch = await bcrypt.compare(dto.oldPassword, user.password);

    if (!isPassMatch) {
      throw new BadRequestException('Your current password is not correct.');
    }

    user.password = dto.newPassword;
    await this.userRepo.save(user);

    return { result: 'Your password has been changed successfully.' };
  }
}
