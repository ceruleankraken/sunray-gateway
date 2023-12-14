import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import { AlertError, AlertSuccess } from '@/utils/notification';
import { PartnerEditFormPropsRequest } from '@/services/partner/edit';


export const usePartnerEdit = ({closeModal, partner_id, getData}: any) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['partner-edit'],
    mutationFn: (payload: PartnerEditFormPropsRequest) => api.editPartner({payload}, partner_id),
    onSuccess: (data) => {
      AlertSuccess("Data edited successfully");
      closeModal();
      getData();
    },
    onError: (data: any) => {
      let message = data?.response.data.Message || 'Something went wrong, please try again!'
      AlertError(message);
    },
  });
};
