import { useQuery } from "react-query";
import useAxios from '../../hooks/useAxios';

const useListNews = () => {
  const axios = useAxios();

  const ListNewsRequest = () => {
    return axios({
      url: `/news/`,
    });
  };

  const request = useQuery(
    ["news"],
    ListNewsRequest,
  );

  return request;
};

export default useListNews;
