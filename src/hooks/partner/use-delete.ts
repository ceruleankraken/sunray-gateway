import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import {
  setUserAuth,
  setAccessToken,
  userLogout,
} from '@/stores/features/auth.slice';
import { useTypedSelector } from '../other/use-type-selector';
import { AlertError, AlertSuccess } from '@/utils/notification';
import { PartnerDeleteFormPropsRequest } from '@/services/partner/delete';
// import { setSidebar } from '@/stores/features/sidebar/slice';


const usePartnerDelete = ({getData}: any) => {
  const dispatch                  = useDispatch();
  const router                    = useRouter();

  return useMutation({
    mutationKey: ['parner-delete'],
    mutationFn : (payload: PartnerDeleteFormPropsRequest) => api.deletePartner({ payload }),
    onSuccess  : async (data) => {
      AlertSuccess("Data Deleted Successfully");
      getData();
      // router.replace('/');
    },
    onError: (data: any) => {
      let message = data?.response.data.Message || 'Something went wrong, please try again!'
      AlertError(message)
    },
  });
};

export default usePartnerDelete;
