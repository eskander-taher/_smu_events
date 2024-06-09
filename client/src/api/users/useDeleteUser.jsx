import useAxios from "../../hooks/useAxios";
import { useMutation, useQueryClient } from "react-query";

const useDeleteUser = () => {
	const axios = useAxios();

	const quiryClient = useQueryClient();

	const deleteUserRequist = (id) => {
		return axios({
			url: `/users/${id}`,
			method: "DELETE",
		});
	};

	const request = useMutation({
		mutationFn: deleteUserRequist,
		onSuccess: () => {
			quiryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});

	return request;
};

export default useDeleteUser;
