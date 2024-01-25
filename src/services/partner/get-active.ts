import { http } from '@/services/axios';
import { LOGIN_PATH, PARTNER_GET_PATH, PARTNER_GET_PATIAL_PATH } from '@/configs/constants';
import { LoginFormPropsRequest } from '@/hooks/auth/use-login';
import { User } from '@/types/user';
import { Pagination } from '@/types/pagination';


type PartnerResponse = {
  id        : string,
  name      : string,
};

type PartnerGetActiveResponse = {
  status : number,
  message: string,
  meta   : null,
  data   : PartnerResponse[]
};


const map = {
  getDataFromResponse: (response?: PartnerGetActiveResponse) => {
    const PartnerData = response?.data.map( (val) => {
      return {
        id        : val.id,
        name      : val.name,
      }
    })

    const ResponseData = {
      meta: null,
      data: PartnerData
    }

    return ResponseData;
  },
};

const getPartnerActive = async () => {

  // const { data } = partner_id ? await http.get(PARTNER_GET_PATH+`/${partner_id}`) : await http.get(PARTNER_GET_PATH);
  // let resp; 
  const {data} = await http.get(PARTNER_GET_PATIAL_PATH,{
    params: {
      q     : ''
    }
  });
  return map.getDataFromResponse(data);
};

const partnerGetActiveServices = {
  getPartnerActive,
};

export default partnerGetActiveServices;
