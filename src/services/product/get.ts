import { http } from '@/services/axios';
import { LOGIN_PATH, PARTNER_GET_PATH, PRODUCT_GET_PATH } from '@/configs/constants';
import { LoginFormPropsRequest } from '@/hooks/auth/use-login';
import { User } from '@/types/user';
import { Pagination } from '@/types/pagination';


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
  meta   : Pagination,
  data   : ProductResponse[]
};


const map = {
  getDataFromResponse: (response?: ProductGetResponse) => {
    const ProductData = response?.data.map( (val) => {
      return {
        id         : val.id,
        name       : val.name,
        description: val.description,
        value      : val.value,
        upc        : val.upc,
        dn_amount  : val.dn_amount,
        cn_amount  : val.cn_amount,
        created_by : val.created_by,
        created_at : val.created_at,
        updated_at : val.updated_at,
        isactive   : val.isactive,
      }
    })

    const ResponseData = {
      meta: {
        current_page: response?.meta?.current_page,
        total_page  : response?.meta.total_page,
        per_page    : response?.meta.per_page,
        total_data  : response?.meta.total_data,
      },
      data: ProductData
    }

    return ResponseData;
  },
};

const getProduct = async (sortObject: any) => {

  // const { data } = partner_id ? await http.get(PARTNER_GET_PATH+`/${partner_id}`) : await http.get(PARTNER_GET_PATH);
  // let resp; 
  const {data} = await http.get(PRODUCT_GET_PATH,{
    params: {
      sort  : sortObject?.field,
      order : sortObject?.sort,
      limit : sortObject?.limit,
      offset: sortObject?.offset,
      q     : sortObject?.q,

    }
  });
  return map.getDataFromResponse(data);
};

const productGetServices = {
  getProduct,
};

export default productGetServices;
