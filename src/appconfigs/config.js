const Joi = require('@hapi/joi');
require('dotenv').config();

const configs = () => {
  const values = ['development', 'production', 'test', 'provision'];
  const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().allow(...values).default('development'),
    PORT: Joi.number().default(4040),
    JWT_SECRET: Joi.string().required().description('JWT Secret required to sign'),
    DEV_DATABASE_URL: Joi.string().required().description('Postgres DB url'),
    TEST_DATABASE_URL: Joi.string().required().description('Postgres DB url'),
    PROD_DATABASE_URL: Joi.string().required().description('Postgres DB url'),
    SESSION_SECRET: Joi.string().required().description('Session secret required'),
    SENDGRID_API_KEY: Joi.string().required().description('Sendgrid api-key required'),
    SMTP_EMAIL: Joi.string().required().description('smtp email required'),
    SMTP_PASSWORD: Joi.string().required().description('smtp password required'),
    SMTP_SERVER: Joi.string().required().description('smtp server required'),
    SMTP_PORT: Joi.string().required().description('smtp port required'),
    EMAILING_CHANNEL: Joi.string().required().description('Emailing Channel required'),
    GOOGLE_CLIENT_ID: Joi.string().required().description('Google client id required'),
    GOOGLE_CLIENT_SECRET: Joi.string().required().description('Google client secret required'),
    FACEBOOK_APP_ID: Joi.string().required().description('Facebook app id required'),
    FACEBOOK_APP_SECRET: Joi.string().required().description('Facebook app secret required'),
    SERVER_API_URL: Joi.string().required().description('Server URL required'),
  }).unknown()
    .required();

  const { error, value: envVars } = envVarsSchema.validate(process.env);
  if (error) throw new Error(`Config validation error: ${error.message}`);

  const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    jwtSecret: envVars.JWT_SECRET,
    sessionSecret: envVars.SESSION_SECRET,
    devDatabaseUrl: envVars.DEV_DATABASE_URL,
    prodDatabaseUrl: envVars.PROD_DATABASE_URL,
    testDatabaseUrl: envVars.TEST_DATABASE_URL,
    smtp: {
      email: envVars.SMTP_EMAIL,
      password: envVars.SMTP_PASSWORD,
      server: envVars.SMTP_SERVER,
      port: envVars.SMTP_PORT,
      secure: false,
    },
    sendgrid: envVars.SENDGRID_API_KEY,
    channel: envVars.EMAILING_CHANNEL,
    googleId: envVars.GOOGLE_CLIENT_ID,
    googleSecret: envVars.GOOGLE_CLIENT_SECRET,
    facebookID: envVars.FACEBOOK_APP_ID,
    facebookSecret: envVars.FACEBOOK_APP_SECRET,
    serverUrl: envVars.serverUrl,
  };
  return config;
};

module.exports = configs;
