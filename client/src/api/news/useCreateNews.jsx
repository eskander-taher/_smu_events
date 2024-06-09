import useAxios from "../../hooks/useAxios"
import { useMutation, useQueryClient } from "react-query";

const useCreateNews= () => {
  const axios = useAxios();

   const quiryClient = useQueryClient();

  const createNewsRequest = (data) => {
    return axios({
      url: `/news/`,
      method: "POST",
      data: data,
     
    });
  };

  const request = useMutation({
    mutationFn: createNewsRequest,
    onSuccess: () => {
      quiryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });

  return request;
};

export default useCreateNews;
