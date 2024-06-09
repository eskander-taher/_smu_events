import useAxios from '../../hooks/useAxios';
import { useQuery } from 'react-query';

const useGetEventWinners = (eventId) => {
  const axios = useAxios();

  const getRequest = () => {
    return axios({
      url: `/submissions/results/${eventId}`,
    });
  };

  const request = useQuery({
    queryKey: ['winners', eventId],
    queryFn: getRequest,
  });

  return request;
};

export default useGetEventWinners;
