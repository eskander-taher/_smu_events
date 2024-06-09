import useAxios from "../../hooks/useAxios";
import { useMutation, useQueryClient } from "react-query";

const useUpdateEvent = () => {
	const axios = useAxios();
	const queryClient = useQueryClient();

	const updateEventRequest = ({ eventId, data }) => {
		return axios({
			url: `/events/${eventId}`,
			method: "PUT",
			data: data,
		});
	};

	const request = useMutation({
		mutationFn: ({ eventId, data }) => updateEventRequest({ eventId, data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
		},
	});

	return request;
};

export default useUpdateEvent;
