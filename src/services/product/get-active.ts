import { http } from '@/services/axios';
import { LOGIN_PATH, PARTNER_GET_PATH, PRODUCT_GET_PATH, PRODUCT_GET_PATIAL_PATH } from '@/configs/constants';
import { LoginFormPropsRequest } from '@/hooks/auth/use-login';
import { User } from '@/types/user';
import { Pagination } from '@/types/pagination';


type ProductResponse = {
  id         : string,
  name       : string,
};

export type ProductGetActiveResponse = {
  status : number,
  message: string,
  meta   : null,
  data   : ProductResponse[]
};


const map = {
  getDataFromResponse: (response?: ProductGetActiveResponse) => {
    const ProductData = response?.data.map( (val) => {
      return {
        id         : val.id,
        name       : val.name,
      }
    })

    const ResponseData = {
      meta: null,
      data: ProductData
    }

    return ResponseData;
  },
};

const getProductActive = async () => {

  // const { data } = partner_id ? await http.get(PARTNER_GET_PATH+`/${partner_id}`) : await http.get(PARTNER_GET_PATH);
  // let resp; 
  const {data} = await http.get(PRODUCT_GET_PATIAL_PATH,{
    params: {
      q: ''

    }
  });
  return map.getDataFromResponse(data);
};

const productGetActiveServices = {
  getProductActive,
};

export default productGetActiveServices;
