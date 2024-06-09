import useAxios from '../../hooks/useAxios';
import { useMutation, useQueryClient } from 'react-query';

const useDeleteNews = () => {
  const axios = useAxios();

  const quiryClient = useQueryClient();

  const deleteNewsRequist = (newsId) => {
    return axios({
      url: `/news/${newsId}`,
      method: 'DELETE',
    });
  };

  const request = useMutation({
    mutationFn: deleteNewsRequist,
    onSuccess: () => {
      quiryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });

  return request;
};

export default useDeleteNews;
