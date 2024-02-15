import { http } from '@/services/axios';
import { PAYMENT_EDIT_PATH } from '@/configs/constants';

export interface PaymentEditFormPropsRequest {
  // partner_id  : string | undefined,
  // batchno     : string | undefined,
  partner_id   : string,
  batchno      : string,
  docaction   ?: string,
}

type PaymentEditProps = {
  payload: PaymentEditFormPropsRequest;
};

const editPayment = async ({payload}: PaymentEditProps, payment_id: string) => {
  const { data } = await http.put(PAYMENT_EDIT_PATH+payment_id, payload);
  return data
};

const paymentEditServices = {
  editPayment,
};

export default paymentEditServices;