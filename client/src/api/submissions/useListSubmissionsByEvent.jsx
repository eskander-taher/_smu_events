import useAxios from '../../hooks/useAxios';
import { useQuery } from 'react-query';

const useListSubmissionsByEvent = (id) => {
  const axios = useAxios();

  const ListSubmissionRequest = () => {
    return axios({
      url: `/submissions/event/${id}`,
    });
  };

  const request = useQuery(['submissions', 'event', id], ListSubmissionRequest);

  return request;
};

export default useListSubmissionsByEvent;
