import { useMutation, useQueryClient } from 'react-query';
import useAxios from '../../hooks/useAxios';

const useCreateSubmissions = () => {
 const axios = useAxios();

 const quiryClient = useQueryClient();

 const createSubmissionRequest = (data) => {
   return axios({
     url: `/submissions/`,
     method: 'POST',
     data: data,
     headers: {
       'Content-Type': 'multipart/form-data',
     },
   });
 };

 const request = useMutation({
   mutationFn: createSubmissionRequest,
   onSuccess: () => {
     quiryClient.invalidateQueries({ queryKey: ['submissions'] });
   },
 });

 return request;
}

export default useCreateSubmissions