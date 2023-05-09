import env from './env';

export const API_URL     = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export const API_MOCKING = process.env.NEXT_PUBLIC_API_MOCKING === 'true';

export const IS_DEVELOPMENT = env.nodeEnv === 'development';
export const IS_TEST        = env.nodeEnv === 'test';
export const IS_PRODUCTION  = env.nodeEnv === 'production';

export const IS_BROWSER = typeof window !== 'undefined';
export const IS_SERVER  = typeof window === 'undefined';

export const LOGIN_PATH            = '/api/auth/login';
export const LOGOUT_PATH           = '/api/auth/logout';
export const REFRESH_TOKEN_PATH    = '/refresh-token';
export const PRODUCT_CATEGORY_PATH = '/productCategory';
