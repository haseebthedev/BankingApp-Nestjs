import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserModule } from './user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Consumer } from './entities/consumer.entity';
import { Merchant } from './entities/merchant.entity';
import { Payment } from '../payment/entities/payment.entity';
import { PaymentMethod } from '../payment/entities/paymentMethod.entity';
import { Qrs } from '../qr/entities/qr.entity';
import { Review } from '../review/entities/review.entity';
import { Booking } from '../booking/entities/booking.entity';
import supertest from 'supertest';

let app: INestApplication;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [
      UserModule,
      // Use the e2e_test database to run the tests
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          User,
          Consumer,
          Merchant,
          Booking,
          Payment,
          PaymentMethod,
          Qrs,
          Review,
        ],
        synchronize: false,
      }),
    ],
  }).compile();
  app = module.createNestApplication();
  await app.init();

  let userRepo: Repository<User>;
  beforeAll(async () => {
    // Add this line at the end of the beforeAll method
    userRepo = module.get('users');
  });

  describe('POST /auth/signin', () => {
    it('should signup user', async () => {
      // Pre-populate the DB with some dummy users
      const newUser = userRepo.create({
        firstname: 'john',
        lastname: 'doe',
        email: 'john@gmail.com',
        password: 'Test@1234',
      });
      await userRepo.save(newUser);

      // Run your end-to-end test
      const response = await supertest
        .agent(app.getHttpServer())
        .post('/auth/signin')
        .send(newUser)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      expect(response.status).toEqual(201);
    });
  });
});

afterAll(async () => {
  await app.close();
});
