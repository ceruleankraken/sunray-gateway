import { http } from '@/services/axios';
import { PRODUCT_CREATE_PATH } from '@/configs/constants';

export interface ProductCreateFormPropsRequest {
  name        : string | undefined,
  description?: string | undefined,
  value      ?: string | undefined,
  upc        ?: string | undefined,
}

type ProductCreateProps = {
  payload: ProductCreateFormPropsRequest;
};

const createProduct = async ({ payload }: ProductCreateProps) => {

  const { data } = await http.post(PRODUCT_CREATE_PATH, payload);
  return data
};

const productCreateServices = {
  createProduct,
};

export default productCreateServices;
