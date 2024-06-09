import useAxios from "../../hooks/useAxios";
import { useMutation } from "react-query";

const useRegisterModerator = () => {
	const axios = useAxios();
	const registerRequest = (data) => {
		return axios({ url: `/register/mod`, data: data, method: "POST" });
	};

	const registerModMutaion = useMutation(registerRequest);
	return registerModMutaion;
};

export default useRegisterModerator;
