import useAxios from '../../hooks/useAxios';
import { useQuery } from 'react-query';

const useListSubmissionsByMod = (id) => {
  const axios = useAxios();

  const ListSubmissionRequest = () => {
    return axios({
      url: `/submissions/mod/${id}`,
    });
  };

  const request = useQuery(['submissions', 'mod', id], ListSubmissionRequest);

  return request;
};

export default useListSubmissionsByMod;
