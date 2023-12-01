import { http } from '@/services/axios';
import { PARTNER_DELETE_PATH } from '@/configs/constants';

export interface ProductDeleteFormPropsRequest {
  product_id: string
}

type ProductDeleteProps = {
  payload: ProductDeleteFormPropsRequest
};

const deleteProduct = async ({ payload }: ProductDeleteProps) => {
  const product_id = payload.product_id;
  const { data }   = await http.delete(PARTNER_DELETE_PATH+product_id);
  return data
};

const productDeleteServices = {
  deleteProduct,
};

export default productDeleteServices;
