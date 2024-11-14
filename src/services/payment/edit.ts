import { http } from '@/services/axios';
import { PAYMENT_EDIT_PATH } from '@/configs/constants';

export interface PaymentEditFormPropsRequest {
  // partner_id  : string | undefined,
  // batchno     : string | undefined,
  batchno     : string,
  discount    : string,
  ispercentage: boolean,
  partner_id  : string,
  docaction   : string,
  file        : File | null,
  image_action: string,
}

type PaymentEditProps = {
  payload: PaymentEditFormPropsRequest;
};

const editPayment = async ({payload}: PaymentEditProps, payment_id: string) => {
  // const { data } = await http.put(PAYMENT_EDIT_PATH+payment_id, payload);
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
  formData.append("files", payload.file || "");
  formData.append("image_action", payload.image_action)

  
  const { data } = await http.put(PAYMENT_EDIT_PATH+payment_id, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data
};

const paymentEditServices = {
  editPayment,
};

export default paymentEditServices;