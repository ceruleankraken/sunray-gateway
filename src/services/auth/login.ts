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
    org_id       : string,
    org_uuid     : string,
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
        organizationId: response?.data.user_information.OrganizationId,
      },
      user_session: {
        access_token : response?.data.user_session.access_token,
        refresh_token: response?.data.user_session.refresh_token,
        org_id       : response?.data.user_session.org_id,
        org_uuid     : response?.data.user_session.org_uuid,
      }
    };
  },
};

const getLogin = async ({ payload }: LoginProps) => {
  const { data } = await http.post(LOGIN_PATH, payload, 
    {
      headers: {
        'Content-Type' : 'application/json',
      }
    }
  );
  return map.getAuthFromRemote(data);
};

const loginServices = {
  getLogin,
};

export default loginServices;
