import { http } from '@/services/axios';
import { LOGOUT_PATH } from '@/configs/constants';
import { LogoutFormPropsRequest } from '@/hooks/auth/use-logout';

const getLogout = async () => {
  const { data } = await http.get(LOGOUT_PATH);
  return data;
};

const logoutServices = {
  getLogout,
};

export default logoutServices;
