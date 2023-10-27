import { http } from '@/services/axios';
import { LOGIN_PATH } from '@/configs/constants';
import { LoginFormPropsRequest } from '@/hooks/auth/use-login';
import { User } from '@/types/user';

type LoginProps = {
  payload: LoginFormPropsRequest;
};

type UserResponse = {
  user_session: {
    access_token: string,
    refresh_token: string,
    user: {
      uid     : number;
      username: string;
      name    : string;
      sex     : string;
      email   : string;
      // name    ?: string;
      // sex     ?: string;
      // email   ?: string | undefined;
    }
  }
};

export type GetLoginResponse = {
  status: number,
  message: string,
  meta: any,
  data: UserResponse
};


const map = {
  getAuthFromRemote: (response?: GetLoginResponse) => {
    return {
      user_session: {
        access_token: response?.data.user_session.access_token,
        refresh_token: response?.data.user_session.refresh_token,
        user: {
          uid     : '28afa9f0-a884-4596-b5ba-04041314298d',
          username: 'london',
          name    : 'london',
          sex     : 'L',
          email   : 'london@london.com',
        }
      }
      // user:
      //   ({
      //     uid     : response?.user?.uid ?? undefined,
      //     username: response?.user?.username ?? '',
      //     name    : response?.user?.name ?? '',
      //     sex     : response?.user?.sex ?? '',
      //     email   : response?.user?.email ?? undefined,
      //   } as User) ?? {},
      // accessToken: response?.accessToken ?? '',
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
