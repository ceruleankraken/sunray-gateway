import { http } from '@/services/axios';
import { LOGIN_PATH } from '@/configs/constants';
import { LoginFormPropsRequest } from '@/hooks/auth/use-login';
import { User } from '@/types/user';

type LoginProps = {
  payload: LoginFormPropsRequest;
};

type UserResponse = {
  user_information: User,
  user_session: {
    access_token : string,
    refresh_token: string,
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
      user_information: {
        username  : response?.data.user_information.username,
        full_name : response?.data.user_information.full_name,
        created_at: response?.data.user_information.created_at,
        isactive  : response?.data.user_information.isactive,
      },
      user_session: {
        access_token: response?.data.user_session.access_token,
        refresh_token: response?.data.user_session.refresh_token,
      }
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
