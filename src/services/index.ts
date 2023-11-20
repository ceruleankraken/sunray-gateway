import loginServices from '@/services/auth/login';
import logoutServices from '@/services/auth/logout';
import partnerCreateServices from './partner/create';
import partnerGetServices from './partner/get';
import partnerGetOneServices from './partner/get-one';
import partnerDeleteServices from './partner/delete';
import partnerEditServices from './partner/edit';

const api = {
  ...loginServices,
  ...logoutServices,
  ...partnerCreateServices,
  ...partnerGetServices,
  ...partnerGetOneServices,
  ...partnerDeleteServices,
  ...partnerEditServices,
};

export default api;
