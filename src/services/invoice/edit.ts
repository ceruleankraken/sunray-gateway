import { http } from '@/services/axios';
import { INVOICE_EDIT_PATH } from '@/configs/constants';
import { DocumentScanner } from '@mui/icons-material';

export interface InvoiceEditFormPropsRequest {
  // partner_id  : string | undefined,
  // batchno     : string | undefined,
  batchno     : string,
  discount    : string,
  ispercentage: boolean,
  partner_id  : string,
  docaction   : string,
  file        : File,
  image_action: string,
}

type InvoiceEditProps = {
  payload: InvoiceEditFormPropsRequest;
};

const editInvoice = async ({payload}: InvoiceEditProps, invoice_id: string) => {
  
  // const { data } = await http.put(INVOICE_EDIT_PATH+invoice_id, payload);
  // return data

  var formData = new FormData()

  const textData = {
    batchno     : payload.batchno,
    discount    : parseFloat(payload.discount),
    ispercentage: payload.ispercentage,
    docaction   : payload.docaction,
    partner_id  : payload.partner_id,
  }

  formData.append("data", JSON.stringify(textData));
  formData.append("files", payload.file);
  formData.append("image_action", payload.image_action)

  
  const { data } = await http.put(INVOICE_EDIT_PATH+invoice_id, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data
};

const invoiceEditServices = {
  editInvoice,
};

export default invoiceEditServices;