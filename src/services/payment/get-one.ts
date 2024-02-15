import { http } from '@/services/axios';
import { INVOICE_GET_ONE_PATH, PAYMENT_GET_ONE_PATH } from '@/configs/constants';


// type LoginProps = {
//   payload: LoginFormPropsRequest;
// };

type PaymentResponse = {
  id          : string,
  documentno  : string,
  batchno     : string,
  ispercentage: boolean
  discount    : number,
  total_line  : number,
  grand_total : number,
  status      : string,
  docaction   : string,
  created_at  : string,
  updated_at  : string,
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
};

export type PaymentGetOneResponse = {
  status : number,
  message: string,
  meta   : any,
  data   : PaymentResponse
};


const map = {
  getDataFromResponse: (response?: PaymentGetOneResponse) => {
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

const getPaymentOne = async (payment_id?: string) => {

  const {data} = await http.get(PAYMENT_GET_ONE_PATH+payment_id);
  return data;
  // return map.getDataFromResponse(data);
};

const paymentGetOneServices = {
  getPaymentOne,
};

export default paymentGetOneServices;
