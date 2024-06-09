import useAxios from '../../hooks/useAxios';
import { useQuery } from 'react-query';

const useGetNew = (id) => {
  const axios = useAxios();

  const getNewRequest = () => {
    return axios({
      url: `/news/${id}`,
    });
  };

  const request = useQuery({
    queryKey: ['news', id],
    queryFn: getNewRequest,
  });

  return request;
};

export default useGetNew;
