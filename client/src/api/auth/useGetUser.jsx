import useAxios from '../../hooks/useAxios';
import { useQuery } from 'react-query';

const useGetUser = (userId) => {
  const axios = useAxios();

  const getRequest = () => {
    return axios({
      url: `/users/${userId}`,
    });
  };

  const request = useQuery({
    queryKey: ['users', userId],
    queryFn: getRequest,
  });

  return request;
};

export default useGetUser;
