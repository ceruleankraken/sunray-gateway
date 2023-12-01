import { http } from '@/services/axios';
import { PARTNER_GET_ONE_PATH, PRODUCT_GET_ONE_PATH } from '@/configs/constants';
import { LoginFormPropsRequest } from '@/hooks/auth/use-login';


type ProductResponse = {
  id         : string,
  name       : string,
  description: string,
  value      : string,
  upc        : string,
  dn_amount  : number,
  cn_amount  : number,
  created_by : string,
  created_at : string,
  updated_at : string,
  isactive   : boolean,
};

export type ProductGetResponse = {
  status : number,
  message: string,
  meta   : any,
  data   : ProductResponse
};


const map = {
  getDataFromResponse: (response?: ProductGetResponse) => {
    return {
      id         : response?.data.id,
      name       : response?.data.name,
      description: response?.data.description,
      value      : response?.data.value,
      upc        : response?.data.upc,
      dn_amount  : response?.data.dn_amount,
      cn_amount  : response?.data.cn_amount,
      created_by : response?.data.created_by,
      created_at : response?.data.created_at,
      updated_at : response?.data.updated_at,
      isactive   : response?.data.isactive,
    }
    // return PartnerData;
  },
};

const getProductOne = async (partner_id?: string) => {

  // const { data } = partner_id ? await http.get(PARTNER_GET_PATH+`/${partner_id}`) : await http.get(PARTNER_GET_PATH);
  const {data} = await http.get(PRODUCT_GET_ONE_PATH+partner_id);
  // return resp.data;
  return map.getDataFromResponse(data);
};

const productGetOneServices = {
  getProductOne,
};

export default productGetOneServices;
