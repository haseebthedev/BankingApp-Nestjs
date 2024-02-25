import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvFilename, EnvSchema } from './config/env';
import { dataSourceOptions } from './database/data-source';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ResultInterceptor } from './common/interceptors/result.interceptors';
import { BookingModule } from './modules/booking/booking.module';
import { PaymentModule } from './modules/payment/payment.module';
import { QRModule } from './modules/qr/qr.module';
import { ReviewModule } from './modules/review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: EnvFilename,
      validationSchema: EnvSchema,
      validationOptions: { allowUnknown: true },
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UserModule,
    BookingModule,
    PaymentModule,
    QRModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResultInterceptor,
    },
  ],
})
export class AppModule {}
