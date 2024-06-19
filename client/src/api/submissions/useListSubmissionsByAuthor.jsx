import useAxios from '../../hooks/useAxios';
import { useQuery } from 'react-query';

const useListSubmissionsByAuthor = (id) => {
  const axios = useAxios();

  const ListSubmissionRequest = () => {
    return axios({
      url: `/submissions/author/${id}`,
    });
  };

  const request = useQuery(["submissions", "author", id], ListSubmissionRequest);

  return request;
};

export default useListSubmissionsByAuthor;
