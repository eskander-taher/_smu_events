import useAxios from '../../hooks/useAxios';
import { useQuery } from 'react-query';

const useGetEvent = (eventId) => {
  const axios = useAxios();

  const getRequest = () => {
    return axios({
      url: `/events/${eventId}`,
    });
  };

  const request = useQuery({
    queryKey: ['events', eventId],
    queryFn: getRequest,
  });

  return request;
};

export default useGetEvent;
