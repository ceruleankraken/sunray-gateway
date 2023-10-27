import loginServices from '@/services/login';
import logoutServices from '@/services/logout';

const api = {
  ...loginServices,
  ...logoutServices
};

export default api;
