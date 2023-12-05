export default () => ({
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT, 10) || 3000,

  fallbackLanguage: process.env.FALLBACK_LANGUAGE || 'en',

  jwtSecret: process.env.JWT_SECRET || 'secret',

  cookieName: process.env.COOKIE_NAME || 'token',
  cookieDomain: process.env.COOKIE_DOMAIN,
  allowNoSameSite: !!process.env.ALLOW_NO_SAME_SITE,

  database: {
    name: process.env.DB_NAME || '',
    password: process.env.DB_PASSWORD || '',
    username: process.env.DB_USERNAME || 'user',
    type: process.env.DB_DIALECT || ('postgres' as const),
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_DIALECT, 10) || 5432,
  },
});
