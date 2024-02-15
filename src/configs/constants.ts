import env from './env';

export const API_URL     = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export const API_MOCKING = process.env.NEXT_PUBLIC_API_MOCKING === 'true';

export const IS_DEVELOPMENT = env.nodeEnv === 'development';
export const IS_TEST        = env.nodeEnv === 'test';
export const IS_PRODUCTION  = env.nodeEnv === 'production';

export const IS_BROWSER = typeof window !== 'undefined';
export const IS_SERVER  = typeof window === 'undefined';

export const REGISTER_PATH        = '/user/register';
export const LOGIN_PATH           = '/user/login';
export const LOGOUT_PATH          = '/user/logout';
export const REFRESH_TOKEN_PATH   = '/user/refresh';

export const PARTNER_CREATE_PATH     = '/partner/';
export const PARTNER_GET_PATH        = '/partners/';
export const PARTNER_GET_ONE_PATH    = '/partner/';
export const PARTNER_GET_PATIAL_PATH = '/partner/patial/';
export const PARTNER_EDIT_PATH       = '/partner/';
export const PARTNER_DELETE_PATH     = '/partner/';

export const PRODUCT_CREATE_PATH     = '/product/';
export const PRODUCT_GET_PATH        = '/products/';
export const PRODUCT_GET_ONE_PATH    = '/product/';
export const PRODUCT_GET_PATIAL_PATH = '/product/patial/';
export const PRODUCT_EDIT_PATH       = '/product/';
export const PRODUCT_DELETE_PATH     = '/product/';

export const INVOICE_CREATE_PATH      = '/invoice/v2';
export const INVOICE_GET_PATH         = '/invoices/';
export const INVOICE_GET_ONE_PATH     = '/invoice/';
export const INVOICE_GET_PATIAL_PATH  = '/invoice/patial/';
export const INVOICE_EDIT_PATH        = '/invoice/';
export const INVOICE_DELETE_PATH      = '/invoice/';
export const INVOICE_LINE_EDIT_PATH   = '/invoiceline/';
export const INVOICE_LINE_DELETE_PATH = '/invoiceline/';
export const INVOICE_LINE_GET_PATH    = '/invoiceline/';

export const PAYMENT_CREATE_PATH      = '/payment/v2';
export const PAYMENT_GET_PATH         = '/payments/';
export const PAYMENT_GET_ONE_PATH     = '/payment/';
export const PAYMENT_EDIT_PATH        = '/payment/';
export const PAYMENT_DELETE_PATH      = '/payment/';
export const PAYMENT_LINE_EDIT_PATH   = '/paymentline/';
export const PAYMENT_LINE_DELETE_PATH = '/paymentline/';
export const PAYMENT_LINE_GET_PATH    = '/paymentline/';
