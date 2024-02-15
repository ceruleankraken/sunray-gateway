import { http } from '@/services/axios';
import { INVOICE_GET_PATH, PAYMENT_GET_PATH } from '@/configs/constants';
import { Pagination } from '@/types/pagination';

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

export type PaymentGetResponse = {
  status : number,
  message: string,
  meta   : any,
  data   : PaymentResponse[]
};

const map = {
  getDataFromResponse: (response?: PaymentGetResponse) => {
    const PaymentData = response?.data.map( (val) => {
      return {
        // id        : val.id,
        // name      : val.name,
        // created_by: val.created_by,
        // created_at: val.created_at,
        // dn_amount : val.dn_amount,
        // cn_amount : val.cn_amount,
        // isactive  : val.isactive,
        // bp_code   : val.bp_code,
      }
    })

    const ResponseData = {
      meta: {
        current_page: response?.meta?.current_page,
        total_page  : response?.meta.total_page,
        per_page    : response?.meta.per_page,
        total_data  : response?.meta.total_data,
      },
      data: PaymentData
    }

    return ResponseData;
  },
};

const getPayment = async (sortObject: any) => {

  // const { data } = partner_id ? await http.get(PARTNER_GET_PATH+`/${partner_id}`) : await http.get(PARTNER_GET_PATH);
  // let resp; 
  const {data} = await http.get(PAYMENT_GET_PATH,{
    params: {
      sort     : sortObject?.field,
      order    : sortObject?.sort,
      limit    : sortObject?.limit,
      offset   : sortObject?.offset,
      q        : sortObject?.q,
      date_from: sortObject?.date_from,
      date_to  : sortObject?.date_to,
    }
  });
  return data;
  // return map.getDataFromResponse(data);
};

const paymentGetServices = {
  getPayment,
};

export default paymentGetServices;
