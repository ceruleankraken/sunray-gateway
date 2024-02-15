import { http } from '@/services/axios';
import { PAYMENT_LINE_EDIT_PATH } from '@/configs/constants';

export interface PaymentLineEditFormPropsRequest {
  payment_id  : string,
  price       : string,
  discount    : string,
  ispercentage: boolean
}

type PaymentLineEditProps = {
  payload: PaymentLineEditFormPropsRequest;
};

const editPaymentLine = async ({payload}: PaymentLineEditProps, payment_line_id: string) => {
  const { data } = await http.put(PAYMENT_LINE_EDIT_PATH+payment_line_id, 
    {
      payment_id  : payload.payment_id,
      price       : parseInt(payload.price),
      discount    : parseFloat(payload.discount),
      ispercentage: payload.ispercentage,
    });
  return data
};

const paymentLineEditServices = {
  editPaymentLine,
};

export default paymentLineEditServices;