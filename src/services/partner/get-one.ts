import { http } from '@/services/axios';
import { PARTNER_GET_ONE_PATH } from '@/configs/constants';
import { LoginFormPropsRequest } from '@/hooks/auth/use-login';


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
  dn_amount : number,
  cn_amount : number,
  isactive  : boolean,
  bp_code    : string
};

export type PartnerGetResponse = {
  status : number,
  message: string,
  meta   : any,
  data   : PartnerResponse
};


const map = {
  getDataFromResponse: (response?: PartnerGetResponse) => {
    return {
      id       : response?.data.id,
      name     : response?.data.name,
      dn_amount: response?.data.dn_amount,
      cn_amount: response?.data.cn_amount,
      isactive : response?.data.isactive,
      bp_code   : response?.data.bp_code,
    }
    // return PartnerData;
  },
};

const getPartnerOne = async (partner_id?: string) => {

  // const { data } = partner_id ? await http.get(PARTNER_GET_PATH+`/${partner_id}`) : await http.get(PARTNER_GET_PATH);
  const {data} = await http.get(PARTNER_GET_ONE_PATH+partner_id);
  // return resp.data;
  return map.getDataFromResponse(data);
};

const partnerGetOneServices = {
  getPartnerOne,
};

export default partnerGetOneServices;
