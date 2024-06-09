import useAxios from "../../hooks/useAxios";
import { useQuery, useQueryClient } from "react-query";

const useGetUserProfile = ({ options }) => {
	const axios = useAxios();

	const deleteUserRequist = (id) => {
		return axios({
			url: `/users/${id}`,
			method: "GET",
		});
	};

	const request = useQuery(["user-profile"], deleteUserRequist);

	return request;
};

export default useGetUserProfile;
