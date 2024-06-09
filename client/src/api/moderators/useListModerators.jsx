import useAxios from '../../hooks/useAxios';
import { useQuery } from 'react-query';

const useListModerators = () => {
  const axios = useAxios();

  const ListModsRequest = () => {
    return axios({
      url: `/users/mods`,
    });
  };

  const request = useQuery(['users'], ListModsRequest);

  return request;
}

export default useListModerators