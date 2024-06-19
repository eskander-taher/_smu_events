import useAxios from '../../hooks/useAxios';
import { useMutation, useQueryClient } from 'react-query';

const useVeriftyModerator = () => {
  const axios = useAxios();

  const quiryClient = useQueryClient();

  const deleteModeratorsRequist = (moderatorId) => {
    return axios({
      url: `/verify-mod/${moderatorId}`,
      method: 'PUT',
    });
  };

  const request = useMutation({
    mutationFn: deleteModeratorsRequist,
    onSuccess: () => {
      quiryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return request;
};

export default useVeriftyModerator;
