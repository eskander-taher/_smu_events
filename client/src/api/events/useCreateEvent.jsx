import useAxios from '../../hooks/useAxios';
import { useMutation, useQueryClient } from 'react-query';

const useCreateEvent = () => {
  const axios = useAxios();

  const quiryClient = useQueryClient();

  const createEventRequest = (data) => {
    return axios({
      url: `/events`,
      method: 'POST',
      data: data,
    });
  };

  const request = useMutation({
    mutationFn: createEventRequest,
    onSuccess: () => {
      quiryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return request;
};

export default useCreateEvent;
