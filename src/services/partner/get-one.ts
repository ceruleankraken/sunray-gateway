import { http } from '@/services/axios';
import { PARTNER_GET_ONE_PATH } from '@/configs/constants';
import { LoginFormPropsRequest } from '@/hooks/auth/use-login';
import { User } from '@/types/user';


// type LoginProps = {
//   payload: LoginFormPropsRequest;
// };

type Pagination = {
  current_page: string,
  total_page  : string,
  per_page    : string,
  total_data  : string
}

type PartnerResponse = {
  id        : string,
  name      : string,
  created_at: string,
  created_by: string,
  User      : User
  dn_amount : number,
  cn_amount : number,
  isactive  : boolean,
  bpcode    : string
  invoice   : any
};

export type PartnerGetResponse = {
  status : number,
  message: string,
  meta   : any,
  data   : PartnerResponse[]
};


const map = {
  getDataFromResponse: (response?: PartnerGetResponse) => {
    const PartnerData = response?.data.map( (val) => {
      return {
        id        : val.id,  
        name      : val.name, 
        created_at: val.created_at, 
        created_by: val.created_by, 
        user      : {
          username: val.User.username,
          full_name: val.User.full_name,
          created_at: val.User.created_at,
          isactive: val.User.isactive,

        },
        dn_amount : val.dn_amount, 
        cn_amount : val.cn_amount, 
        isactive  : val.isactive, 
        bpcode    : val.bpcode, 
        invoice   : val.invoice
      }
    })
    return PartnerData;
  },
};

const getPartnerOne = async (partner_id?: string) => {

  // const { data } = partner_id ? await http.get(PARTNER_GET_PATH+`/${partner_id}`) : await http.get(PARTNER_GET_PATH);
  const {data} = await http.get(PARTNER_GET_ONE_PATH,
    {
      params: {
        id : partner_id
      }
    });
  // return resp.data;
  return map.getDataFromResponse(data);
};

const partnerGetOneServices = {
  getPartnerOne,
};

export default partnerGetOneServices;
