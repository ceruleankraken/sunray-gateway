import env from './env';

export const API_URL     = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export const API_MOCKING = process.env.NEXT_PUBLIC_API_MOCKING === 'true';

export const IS_DEVELOPMENT = env.nodeEnv === 'development';
export const IS_TEST        = env.nodeEnv === 'test';
export const IS_PRODUCTION  = env.nodeEnv === 'production';

export const IS_BROWSER = typeof window !== 'undefined';
export const IS_SERVER  = typeof window === 'undefined';

export const REGISTER_PATH       = '/user/register';
export const LOGIN_PATH          = '/user/login';
export const LOGOUT_PATH         = '/user/logout';
export const REFRESH_TOKEN_PATH  = '/user/refresh';
export const PARTNER_CREATE_PATH = '/partner';
