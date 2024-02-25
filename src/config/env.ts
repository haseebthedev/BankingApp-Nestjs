import * as Joi from 'joi';

export const EnvFilename = `.env.${process.env.NODE_ENV}`;

export const EnvSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),

  DB_TYPE: Joi.string().valid('postgres', 'mysql', 'sqlite').required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().port().required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
}).unknown(true);
