import { http } from '@/services/axios';
import { LOGIN_PATH } from '@/configs/constants';
import { LoginFormPropsRequest } from '@/hooks/auth/use-login';
import { User } from '@/types/user';

type LoginProps = {
  payload: LoginFormPropsRequest;
};

type UserReponse = {
  uid     ?: number | undefined;
  username?: string;
  name    ?: string;
  sex     ?: string;
  email   ?: string | undefined;
};

export type GetLoginResponse = {
  user?: UserReponse;
  accessToken?: string;
};


const map = {
  getAuthFromRemote: (response?: GetLoginResponse) => {
    return {
      user:
        ({
          uid     : response?.user?.uid ?? undefined,
          username: response?.user?.username ?? '',
          name    : response?.user?.name ?? '',
          sex     : response?.user?.sex ?? '',
          email   : response?.user?.email ?? undefined,
        } as User) ?? {},
      accessToken: response?.accessToken ?? '',
    };
  },
};

const getLogin = async ({ payload }: LoginProps) => {
  console.log("==========API===============");
  console.log(payload);
  console.log(LOGIN_PATH);
  const { data } = await http.post(LOGIN_PATH, payload);
  console.log(data);
  return map.getAuthFromRemote(data);
};

const loginServices = {
  getLogin,
};

export default loginServices;
