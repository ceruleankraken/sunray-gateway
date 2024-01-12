import { http } from '@/services/axios';
import { INVOICE_GET_PATH } from '@/configs/constants';
import { Pagination } from '@/types/pagination';

type InvoiceResponse = {
  id          : string,
  created_at  : string,
  updated_at  : string
  grand_total : number,
  discount    : number,
  batchno     : string,
  status      : string,
  docaction   : string,
  outstanding : number,
  documentno  : string,
  ispercentage: boolean
  pay_date    : string,
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

export type InvoiceGetResponse = {
  status : number,
  message: string,
  meta   : any,
  data   : InvoiceResponse[]
};

const map = {
  getDataFromResponse: (response?: InvoiceGetResponse) => {
    const PartnerData = response?.data.map( (val) => {
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
      data: PartnerData
    }

    return ResponseData;
  },
};

const getInvoice = async (sortObject: any) => {

  // const { data } = partner_id ? await http.get(PARTNER_GET_PATH+`/${partner_id}`) : await http.get(PARTNER_GET_PATH);
  // let resp; 
  const {data} = await http.get(INVOICE_GET_PATH,{
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

const invoiceGetServices = {
  getInvoice,
};

export default invoiceGetServices;
