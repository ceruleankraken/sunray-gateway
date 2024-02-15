import { http } from '@/services/axios';
import { PAYMENT_DELETE_PATH } from '@/configs/constants';


export interface PaymentDeleteFormPropsRequest {
  payment_id: string
}

type PaymentDeleteProps = {
  payload: PaymentDeleteFormPropsRequest
};

const deletePayment = async ({ payload }: PaymentDeleteProps) => {
  const payment_id = payload.payment_id;
  const { data }   = await http.delete(PAYMENT_DELETE_PATH+payment_id);
  return data
};

const paymentDeleteServices = {
  deletePayment,
};

export default paymentDeleteServices;
