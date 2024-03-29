import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import { AlertError, AlertSuccess } from '@/utils/notification';
import { PartnerCreateFormPropsRequest } from '@/services/partner/create';


export const usePartnerCreate = ({closeModal, getData}: any) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['partner-create'],
    mutationFn: (payload: PartnerCreateFormPropsRequest) => api.createPartner({ payload }),
    onSuccess: (data) => {
      AlertSuccess("Data created successfully");
      closeModal()
      getData()
    },
    onError: (data: any) => {
      let message = data?.response.data.Message || 'Something went wrong, please try again!'
      AlertError(message)
    },
  });
};
