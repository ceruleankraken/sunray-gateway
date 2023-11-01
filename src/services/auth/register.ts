import { http } from '@/services/axios';
import { LOGIN_PATH, REGISTER_PATH } from '@/configs/constants';
import { RegisterFormPropsRequest } from '@/hooks/auth/use-register';

type RegisterProps = {
  payload: RegisterFormPropsRequest;
};

type UserResponse = {
    id        : string;
    username  : string;
    full_name : string;
    created_at: string;
    isactive  : boolean;
};

export type GetRegisterResponse = {
  status : number,
  message: string,
  meta   : any,
  data   : UserResponse
};


const map = {
  getDataFromRemote: (response?: GetRegisterResponse) => {
    return {
      id        : response?.data.id,
      username  : response?.data.username,
      full_name : response?.data.full_name,
      created_at: response?.data.created_at,
      isactive  : response?.data.isactive,
    };
  },
};

const getRegister = async ({ payload }: RegisterProps) => {
  console.log("==========API===============");
  console.log(payload);
  console.log(REGISTER_PATH);
  const { data } = await http.post(REGISTER_PATH, payload);
  console.log(data);
  return map.getDataFromRemote(data);
};

const registerServices = {
  getRegister,
};

export default registerServices;
