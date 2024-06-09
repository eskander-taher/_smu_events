import DefaultLayout from "../../layout/DefaultLayout";
import EventCard from "./EventCard";
import useEventList from "../../api/events/useEventList";
import Title from "../../components/Title";

const Events = () => {
	const { data, isLoading } = useEventList();

	return (
		<DefaultLayout>
			<Title>Мероприятия</Title>
			<div className="flex flex-wrap gap-5 flex-col">
				{isLoading ? (
					<h1>Loading</h1>
				) : (
					data?.data?.map((event) => {
						return <EventCard {...event} key={event._id} />;
					})
				)}
				{!data && <h1>There are no events to view</h1>}
			</div>
		</DefaultLayout>
	);
};

export default Events;
