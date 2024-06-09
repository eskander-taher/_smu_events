import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useMutation, useQueryClient } from 'react-query';

const useDeleteEvent = () => {
  const axios = useAxios();

  const quiryClient = useQueryClient();

  const deleteEventRequist = (eventId) => {
    return axios({
      url: `/events/${eventId}`,
      method: 'DELETE',
    });
  };

  const request = useMutation({
    mutationFn: deleteEventRequist,
    onSuccess: () => {
      quiryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return request;
};

export default useDeleteEvent;
