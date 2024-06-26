import DefaultLayout from "../../layout/DefaultLayout";

import useListEvents from "../../api/events/useEventList";
import useChangeEventStatus from "../../api/events/useChangeEventStatus";
import useDeleteEvent from "../../api/events/useDeleteEvent";

import Title from "../../components/Title";

import { useQueryClient } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import useConfirm from "../../hooks/useConfirm";
import { Link, useNavigate } from "react-router-dom";

const eventStatusEnum = ["черновик", "предстоящий", "идет", "проверка статей", "завершен"];

const EventList = () => {
	const { data, isSuccess } = useListEvents();
	const { mutate } = useChangeEventStatus();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	let events = [];
	if (isSuccess) {
		events = data.data.data;
	}

	const [openModal, ConfirmationModalComponent] = useConfirm();
	const { mutate: deleteEventMutation } = useDeleteEvent();

	let news = [];
	if (isSuccess) {
		news = data.data.data;
	}

	const handleDelete = (id) => {
		openModal(() => {
			deleteEventMutation(id, {
				onSuccess: () => {
					toast.success("Мероприятие успешно удалена");
					queryClient.invalidateQueries({ queryKey: ["events"] });
				},
				onError: (error) => {
					toast.error("Не удалось удалить мероприятие");
					console.log(error);
				},
			});
		}, "Вы уверены, что хотите удалить мероприятие?");
	};

	const handleStatusChange = (eventId, newStatus) => {
		let params = `${eventId}/${newStatus}`;
		mutate(params, {
			onSuccess: () => {
				toast.success("Мероприятие успешно отредактировано");
				queryClient.invalidateQueries({ queryKey: ["events"] });
			},
			onError: (error) => {
				console.log(error);
				toast.error("Не удалось редактировать мероприятие");
			},
		});
	};

	return (
		<DefaultLayout>
			<Title>Мероприятия</Title>
			{events.length > 0 ? (
				<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
					<div className="max-w-full overflow-x-auto">
						<table className="w-full table-auto">
							<thead>
								<tr className="bg-gray-2 text-left dark:bg-meta-4">
									<th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
										Название мероприятия
									</th>
									<th className="py-4 px-4 font-medium text-black dark:text-white">
										Действия
									</th>
								</tr>
							</thead>
							<tbody>
								{events.map((event) => (
									<tr key={event._id}>
										<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
											<Link to={`/events/${event._id}`}>
												<h5 className="font-medium text-black dark:text-white">
													{event.name}
												</h5>
											</Link>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<div className="flex gap-1">
												<select
													value={event.status}
													name="eventStatus"
													onChange={(e) =>
														handleStatusChange(
															event._id,
															e.target.value
														)
													}
													className={`relative z-20 appearance-none rounded border border-stroke bg-transparent outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
														event.status
															? "text-black dark:text-white"
															: ""
													}`}
												>
													{eventStatusEnum.map((status) => {
														return (
															<option
																key={status}
																value={status}
																className="text-body dark:text-bodydark"
															>
																{status}
															</option>
														);
													})}
												</select>
												<button
													onClick={() =>
														navigate(
															`/events-dashboard/edit-event/${event._id}`
														)
													}
													className="hover:bg-green-600 transition-colors text-white bg-green-500 py-2 px-4 rounded-lg"
												>
													Редактировать
												</button>
												<button
													onClick={() => handleDelete(event._id)}
													className="hover:bg-red-600 transition-colors text-white bg-red-500 py-2 px-4 rounded-lg"
												>
													Удалить
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			) : (
				<p>Нет мероприятий для отображения</p>
			)}
			<ToastContainer position="top-center" autoClose={false} draggable />
			<ConfirmationModalComponent />
		</DefaultLayout>
	);
};

export default EventList;
