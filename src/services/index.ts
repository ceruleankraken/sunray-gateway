import loginServices from '@/services/auth/login';
import logoutServices from '@/services/auth/logout';
import partnerCreateServices from './partner/create';
import partnerGetServices from './partner/get';
import partnerGetOneServices from './partner/get-one';
import partnerDeleteServices from './partner/delete';
import partnerEditServices from './partner/edit';

import productCreateServices from './product/create';
import productEditServices from './product/edit';
import productGetServices from './product/get';
import productGetOneServices from './product/get-one';
import productDeleteServices from './product/delete';

import invoiceCreateServices from './invoice/create';
import invoiceEditServices from './invoice/edit';
import invoiceGetServices from './invoice/get';
import invoiceGetOneServices from './invoice/get-one';
import invoiceDeleteServices from './invoice/delete';
import invoiceLineEditServices from './invoice/edit-line';
import invoiceLineDeleteServices from './invoice/delete-line';
import invoiceLineGetOneServices from './invoice/get-line';

const api = {
  ...loginServices,
  ...logoutServices,
  ...partnerCreateServices,
  ...partnerGetServices,
  ...partnerGetOneServices,
  ...partnerDeleteServices,
  ...partnerEditServices,
  ...productCreateServices,
  ...productEditServices,
  ...productGetServices,
  ...productGetOneServices,
  ...productDeleteServices,
  ...invoiceCreateServices,
  ...invoiceEditServices,
  ...invoiceGetServices,
  ...invoiceGetOneServices,
  ...invoiceDeleteServices,
  ...invoiceLineEditServices,
  ...invoiceLineDeleteServices,
  ...invoiceLineGetOneServices,
  
};

export default api;
