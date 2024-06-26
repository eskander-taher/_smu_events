import DefaultLayout from "../../layout/DefaultLayout";
import usePublicEventList from "../../api/events/usePublicEventList";
import Title from "../../components/Title";
import Skeleton from "../../components/Skeleton";
import LinkCard from "../../components/LinkCard";
import formatDate from "../../utils/dateFormater";

const EventSubmissionLists = () => {
	const { data, isLoading, isSuccess } = usePublicEventList();

	let events = [];
	if (isSuccess) {
		events = data.data.data;
	}

	return (
		<DefaultLayout>
			<Title>Заявки</Title>

			<div className="flex flex-col gap-4 md:gap-6">
				{isLoading ? (
					<Skeleton />
				) : isSuccess && events.length ? (
					events
						.slice()
						.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
						.map((event) => {
							return (
								<LinkCard
									key={event._id}
									to={`/submission-list/${event._id}`}
									title={event.name}
									subTitle={`${formatDate(event.createdAt)} | ${event.status}`}
								/>
							);
						})
				) : (
					<p>Нет мероприятий для отображения</p>
				)}
			</div>
		</DefaultLayout>
	);
};

export default EventSubmissionLists;
