import { http } from '@/services/axios';
import { LOGOUT_PATH, REFRESH_TOKEN_PATH } from '@/configs/constants';
import { RefreshFormPropsRequest } from '@/hooks/auth/use-refresh';

type RefreshProps = {
  payload: RefreshFormPropsRequest;
};

const getRefresh = async ({ payload }: RefreshProps) => {
  const { data } = await http.post(REFRESH_TOKEN_PATH, payload);
  return data;
};

const refreshServices = {
  getRefresh,
};

export default refreshServices;
