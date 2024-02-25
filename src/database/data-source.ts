import { EnvFilename } from 'src/config/env';
import { Booking } from 'src/modules/booking/entities/booking.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { PaymentMethod } from 'src/modules/payment/entities/paymentMethod.entity';
import { Qrs } from 'src/modules/qr/entities/qr.entity';
import { Review } from 'src/modules/review/entities/review.entity';
import { Consumer } from 'src/modules/user/entities/consumer.entity';
import { Merchant } from 'src/modules/user/entities/merchant.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

require('dotenv').config({ path: EnvFilename });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
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
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
