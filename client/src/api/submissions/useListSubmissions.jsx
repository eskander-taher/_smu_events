import useAxios from '../../hooks/useAxios';
import { useQuery } from 'react-query';

const useListSubmissions = () => {
 const axios = useAxios();

 const ListSubmissionRequest = () => {
   return axios({
     url: `/submissions/`,
   });
 };

 const request = useQuery(['submissions'], ListSubmissionRequest);

 return request;
}

export default useListSubmissions