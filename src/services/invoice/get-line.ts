import { http } from '@/services/axios';
import {INVOICE_LINE_GET_PATH } from '@/configs/constants';


type InvoiceLineResponse = {
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
    usename  : string,
  } 
  updatedby: {
    user_uuid: string,
    usename  : string,
  }
  product: {
    id  : string,
    name: string,
  }
  invoice: {
    id        : string,
    batchno   : string,
    documentno: string,
  }
};

export type InvoiceLineGetOneResponse = {
  status : number,
  message: string,
  meta   : any,
  data   : InvoiceLineResponse
};


const map = {
  getDataFromResponse: (response?: InvoiceLineGetOneResponse) => {
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

const getInvoiceLineOne = async (invoice_line_id?: string) => {

  const {data} = await http.get(INVOICE_LINE_GET_PATH+invoice_line_id);
  return data;
  // return map.getDataFromResponse(data);
};

const invoiceLineGetOneServices = {
  getInvoiceLineOne,
};

export default invoiceLineGetOneServices;
