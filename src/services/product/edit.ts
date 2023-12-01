import { http } from '@/services/axios';
import { PRODUCT_EDIT_PATH } from '@/configs/constants';

export interface ProductEditFormPropsRequest {
  name       ?: string | undefined,
  description?: string | undefined,
  value      ?: string | undefined,
  upc        ?: string | undefined,
}

type ProductEditProps = {
  payload: ProductEditFormPropsRequest;
};

const editProduct = async ({payload}: ProductEditProps, partner_id: string) => {

  const { data } = await http.put(PRODUCT_EDIT_PATH+partner_id, payload);
  return data
};

const productEditServices = {
  editProduct,
};

export default productEditServices;