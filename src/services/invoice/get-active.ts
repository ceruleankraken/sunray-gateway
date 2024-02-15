import { http } from '@/services/axios';
import { INVOICE_GET_PATIAL_PATH, LOGIN_PATH, PARTNER_GET_PATH, PRODUCT_GET_PATH, PRODUCT_GET_PATIAL_PATH } from '@/configs/constants';
import { LoginFormPropsRequest } from '@/hooks/auth/use-login';
import { User } from '@/types/user';
import { Pagination } from '@/types/pagination';


type InvoiceResponse = {
  id         : string,
  name       : string,
};

export type InvoiceGetActiveResponse = {
  status : number,
  message: string,
  meta   : null,
  data   : InvoiceResponse[]
};


const map = {
  getDataFromResponse: (response?: InvoiceGetActiveResponse) => {
    const InvoiceData = response?.data.map( (val) => {
      return {
        id         : val.id,
        name       : val.name,
      }
    })

    const ResponseData = {
      meta: null,
      data: InvoiceData
    }

    return ResponseData;
  },
};

const getInvoiceActive = async () => {

  // const { data } = partner_id ? await http.get(PARTNER_GET_PATH+`/${partner_id}`) : await http.get(PARTNER_GET_PATH);
  // let resp; 
  const {data} = await http.get(INVOICE_GET_PATIAL_PATH,{
    params: {
      q: ''

    }
  });
  return map.getDataFromResponse(data);
};

const invoiceGetActiveServices = {
  getInvoiceActive,
};

export default invoiceGetActiveServices;
