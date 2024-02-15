import { http } from '@/services/axios';
import { PAYMENT_LINE_GET_PATH } from '@/configs/constants';


type PaymentLineResponse = {
  id          : string,
  price       : number,
  amount      : number,
  batchno     : string,
  discount    : number,
  ispercentage: boolean,
  payment: {
    id        : string,
    batchno   : string,
    documentno: string,
  }
  createdby   : {
    user_uuid: string,
    usename  : string,
  } 
  updatedby: {
    user_uuid: string,
    usename  : string,
  }
  invoice: {
    id        : string,
    batchno   : string,
    documentno: string,
  }
};

export type PaymentLineGetOneResponse = {
  status : number,
  message: string,
  meta   : any,
  data   : PaymentLineResponse
};


const map = {
  getDataFromResponse: (response?: PaymentLineGetOneResponse) => {
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

const getPaymentLineOne = async (payment_line_id?: string) => {

  const {data} = await http.get(PAYMENT_LINE_GET_PATH+payment_line_id);
  return data;
  // return map.getDataFromResponse(data);
};

const paymentLineGetOneServices = {
  getPaymentLineOne,
};

export default paymentLineGetOneServices;
