import { http } from '@/services/axios';
import { LOGOUT_PATH } from '@/configs/constants';
import { LogoutFormPropsRequest } from '@/hooks/auth/use-logout';

type LogoutProps = {
  payload: LogoutFormPropsRequest;
};

const getLogout = async ({ payload }: LogoutProps) => {
  const { data } = await http.post(LOGOUT_PATH, payload);
  return data;
};

const logoutServices = {
  getLogout,
};

export default logoutServices;
