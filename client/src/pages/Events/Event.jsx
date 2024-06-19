import DefaultLayout from '../../layout/DefaultLayout';
import { Link, useParams } from 'react-router-dom';
import useGetEvent from '../../api/events/useGetEvent';
import useAuth from '../../hooks/useAuth';
import WinnersTable from './WinnersTable';
import formatDate from "../../utils/dateFormater";
import Skeleton from "../../components/Skeleton";

const Event = () => {
	const { eventId } = useParams();
	const { data, isLoading, isSuccess, isError } = useGetEvent(eventId);
	const { user } = useAuth();

	let event = {};
	if (isSuccess) {
		event = data.data.data;
	}

	return (
		<DefaultLayout>
			{isError ? (
				<p>Не удалось загрузить данные с сервера</p>
			) : (
				<>
					{event.status === "идет" && user.role === "автор" && (
						<Link
							to={`/events/${eventId}/add-submission`}
							className="w-full inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
						>
							Загрузить статью
						</Link>
					)}

					<div className=" w-full inline-flex items-center justify-center rounded-md bg-graydark py-4 px-10 text-center font-medium text-white text-xl">
						{
							isLoading
								? "Loading..." // Render a loading indicator while fetching data
								: isSuccess
									? event.status // Render the event status if data is successfully fetched
									: "No data available" // Render a message if there is no data available
						}
					</div>

					{event.status === "завершен" && <WinnersTable eventId={eventId} />}

					<div className="flex flex-col gap-3">
						<div className="flex flex-col gap-3">
							{isLoading ? (
								<Skeleton />
							) : (
								<div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
									<div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
										<div className="mt-4">
											<h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
												{event.name}
											</h3>
											<span className="text-sm font-medium">
												{formatDate(event.createdAt)}
											</span>

											<div className="mx-auto max-w-180">
												<div className="ql-editor">
													<div
														dangerouslySetInnerHTML={{
															__html: event.description,
														}}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</>
			)}
		</DefaultLayout>
	);
};

export default Event;
