import { http } from '@/services/axios';
import { INVOICE_GET_ONE_PATH } from '@/configs/constants';


// type LoginProps = {
//   payload: LoginFormPropsRequest;
// };

type InvoiceResponse = {
  id          : string,
  created_at  : string,
  updated_at  : string,
  batchno     : string,
  status      : string,
  docaction   : string,
  outstanding : number,
  documentno  : string,
  ispercentage: boolean
  pay_date    : string,
  total_line  : number,
  discount    : number,
  grand_total : number,
  createdby   : {
    user_uuid: string,
    usename  : string,
  } 
  updatedby: {
    user_uuid: string,
    usename  : string,
  }
  partner: {
    id  : string,
    name: string,
  }
  line: {
    id          : string,
    created_at  : string,
    updated_at  : string,
    qty         : number,
    price       : number,
    amount      : number,
    discount    : number,
    ispercentage: boolean,
    createdby   : {
      user_uuid: string,
      username : string,
    },
    updatedby   : {
      user_uuid: string,
      username : string,
    },
    invoice: {
      id        : string,
      batchno   : string,
      documentno: string,
      oustanding: number,
    },
    product: {
      id  : string,
      name: string,
    }
  }
};

export type InvoiceGetOneResponse = {
  status : number,
  message: string,
  meta   : any,
  data   : InvoiceResponse
};


const map = {
  getDataFromResponse: (response?: InvoiceGetOneResponse) => {
    return {
      // id        : response?.data.id,
      // name      : response?.data.name,
      // dn_amount : response?.data.dn_amount,
      // cn_amount : response?.data.cn_amount,
      // isactive  : response?.data.isactive,
      // bp_code   : response?.data.bp_code,
      // created_at: response?.data.created_at,
      // created_by: response?.data.created_by,
    }
    // return PartnerData;
  },
};

const getInvoiceOne = async (invoice_id?: string) => {

  const {data} = await http.get(INVOICE_GET_ONE_PATH+invoice_id);
  return data;
  // return map.getDataFromResponse(data);
};

const invoiceGetOneServices = {
  getInvoiceOne,
};

export default invoiceGetOneServices;
