import loginServices from '@/services/auth/login';
import logoutServices from '@/services/auth/logout';
import partnerCreateServices from './partner/create';
import partnerGetServices from './partner/get';
import partnerGetOneServices from './partner/get-one';
import partnerGetActiveServices from './partner/get-active';
import partnerDeleteServices from './partner/delete';
import partnerEditServices from './partner/edit';

import productCreateServices from './product/create';
import productEditServices from './product/edit';
import productGetServices from './product/get';
import productGetOneServices from './product/get-one';
import productGetActiveServices from './product/get-active';
import productDeleteServices from './product/delete';

import invoiceCreateServices from './invoice/create';
import invoiceEditServices from './invoice/edit';
import invoiceGetServices from './invoice/get';
import invoiceGetOneServices from './invoice/get-one';
import invoiceGetActiveServices from './invoice/get-active'
import invoiceDeleteServices from './invoice/delete';
import invoiceLineEditServices from './invoice/edit-line';
import invoiceLineDeleteServices from './invoice/delete-line';
import invoiceLineGetOneServices from './invoice/get-line';

import paymentCreateServices from './payment/create';
import paymentEditServices from './payment/edit';
import paymentGetServices from './payment/get';
import paymentGetOneServices from './payment/get-one';
import paymentDeleteServices from './payment/delete';
import paymentLineEditServices from './payment/edit-line';
import paymentLineDeleteServices from './payment/delete-line';
import paymentLineGetOneServices from './payment/get-line';


const api = {
  ...loginServices,
  ...logoutServices,
  ...partnerCreateServices,
  ...partnerGetServices,
  ...partnerGetOneServices,
  ...partnerGetActiveServices,
  ...partnerDeleteServices,
  ...partnerEditServices,
  ...productCreateServices,
  ...productEditServices,
  ...productGetServices,
  ...productGetOneServices,
  ...productGetActiveServices,
  ...productDeleteServices,
  ...invoiceCreateServices,
  ...invoiceEditServices,
  ...invoiceGetServices,
  ...invoiceGetOneServices,
  ...invoiceGetActiveServices,
  ...invoiceDeleteServices,
  ...invoiceLineEditServices,
  ...invoiceLineDeleteServices,
  ...invoiceLineGetOneServices,
  ...paymentCreateServices,
  ...paymentEditServices,
  ...paymentGetServices,
  ...paymentGetOneServices,
  ...paymentDeleteServices,
  ...paymentLineEditServices,
  ...paymentLineDeleteServices,
  ...paymentLineGetOneServices,
  
};

export default api;
