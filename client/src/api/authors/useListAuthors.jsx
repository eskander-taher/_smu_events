import useAxios from '../../hooks/useAxios';
import { useQuery } from 'react-query';

const useListAuthors = () => {
  const axios = useAxios();

  const ListAuthorsRequest = () => {
    return axios({
      url: `/users/authors`,
    });
  };

  const request = useQuery(['users', 'authors'], ListAuthorsRequest);

  return request;
}

export default useListAuthors