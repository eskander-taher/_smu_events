import useAxios from '../../hooks/useAxios';
import { useMutation, useQueryClient } from 'react-query';

const useDeleteSection = () => {
  const axios = useAxios();

  const quiryClient = useQueryClient();

  const deleteSectionRequist = (sectionId) => {
    return axios({
      url: `/sections/${sectionId}`,
      method: 'DELETE',
    });
  };

  const request = useMutation({
    mutationFn: deleteSectionRequist,
    onSuccess: () => {
      quiryClient.invalidateQueries({ queryKey: ['sections'] });
    },
  });

  return request;
};

export default useDeleteSection;
