import { http } from '@/services/axios';
import { LOGIN_PATH, PARTNER_GET_PATH } from '@/configs/constants';
import { LoginFormPropsRequest } from '@/hooks/auth/use-login';
import { User } from '@/types/user';
import { Pagination } from '@/types/pagination';

type PartnerResponse = {
  id        : string,
  name      : string,
  created_by: string,
  dn_amount : number,
  cn_amount : number,
  isactive  : boolean,
  bp_code   : string
};

export type PartnerGetResponse = {
  status : number,
  message: string,
  meta   : Pagination,
  data   : PartnerResponse[]
};


const map = {
  getDataFromResponse: (response?: PartnerGetResponse) => {
    const PartnerData = response?.data.map( (val) => {
      return {
        id        : val.id,
        name      : val.name,
        created_by: val.created_by,
        dn_amount : val.dn_amount,
        cn_amount : val.cn_amount,
        isactive  : val.isactive,
        bp_code   : val.bp_code,
      }
    })

    const ResponseData = {
      meta: {
        current_page: response?.meta?.current_page,
        total_page: response?.meta.total_page,
        per_page: response?.meta.per_page,
        total_data: response?.meta.total_data,
      },
      data: PartnerData
    }

    return ResponseData;
  },
};

const getPartner = async (sortObject: any) => {

  // const { data } = partner_id ? await http.get(PARTNER_GET_PATH+`/${partner_id}`) : await http.get(PARTNER_GET_PATH);
  // let resp; 
  const {data} = await http.get(PARTNER_GET_PATH,{
    params: {
      sort  : sortObject?.field,
      order : sortObject?.sort,
      limit : sortObject?.limit,
      offset: sortObject?.offset,

    }
  });
  return map.getDataFromResponse(data);
};

const partnerGetServices = {
  getPartner,
};

export default partnerGetServices;
