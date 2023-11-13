import { http } from '@/services/axios';
import { PARTNER_CREATE_PATH, PARTNER_DELETE_PATH } from '@/configs/constants';
import { LoginFormPropsRequest } from '@/hooks/auth/use-login';
import { User } from '@/types/user';
import { PartnerCreateFormPropsRequest } from '@/modals/partner/create';
import { PartnerDeleteFormPropsRequest } from '@/hooks/partner/use-delete';

type PartnerDeleteProps = {
  payload: PartnerDeleteFormPropsRequest
};

const deletePartner = async ({ payload }: PartnerDeleteProps) => {
  console.log("ini delete: "+payload);
  console.log(typeof(payload));
  const partner_id = payload.partner_id;
  const { data }   = await http.delete(PARTNER_DELETE_PATH,
    {
      params: {
        id: partner_id
      }
    });
  return data
};

const partnerDeleteServices = {
  deletePartner,
};

export default partnerDeleteServices;
