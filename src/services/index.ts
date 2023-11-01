import loginServices from '@/services/auth/login';
import logoutServices from '@/services/auth/logout';
import partnerCreateServices from './partner/create';

const api = {
  ...loginServices,
  ...logoutServices,
  ...partnerCreateServices
};

export default api;
