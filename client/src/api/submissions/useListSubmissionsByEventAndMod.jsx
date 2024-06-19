import useAxios from "../../hooks/useAxios";
import { useQuery } from "react-query";

const useListSubmissionsByEventAndMod = (params) => {
	const axios = useAxios();

	const ListSubmissionRequest = () => {
		return axios({
			url: `/submissions/event/${params.eventId}/mod/${params.modId}`,
		});
	};

	const request = useQuery(
		["submissions", "event", params.eventId, "mod", params.modId],
		ListSubmissionRequest
	);

	return request;
};

export default useListSubmissionsByEventAndMod;
