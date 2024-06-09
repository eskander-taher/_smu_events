import useAxios from '../../hooks/useAxios';
import { useQuery } from 'react-query';

const useListUsers = () => {
   const axios = useAxios();

   const LisrUsersRequest = () => {
     return axios({
       url: `api/users/`,
     });
   };

   const request = useQuery(['users'], LisrUsersRequest);

   return request;
}

export default useListUsers