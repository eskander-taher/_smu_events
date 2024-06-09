import useAxios from "../../hooks/useAxios";
import { useMutation } from "react-query";

const useRegisterAuthor = () => {
	const axios = useAxios();
	const registerRequest = (data) => {
		return axios({
			url: `/register/author`,
			data: data,
			method: "POST",
		});
	};

	const request = useMutation(registerRequest);
	return request;
};

export default useRegisterAuthor;
