import { useQuery } from "react-query";
import useAxios from '../../hooks/useAxios';

const useListEvents = () => {
  const axios = useAxios();

  const ListEventsRequest = () => {
    return axios({
      url: `/events`,
    });
  };

  const request = useQuery(
    ["events"],
    ListEventsRequest,
  );

  return request;
};

export default useListEvents;
