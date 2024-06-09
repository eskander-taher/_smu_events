import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../../utils/dateFormater";

const EventCard = (item) => {
	return (
		<Link to={`/events/${item._id}`}>
			<div className=" w-full rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
				<div className="mt-4 flex items-end justify-between">
					<div>
						<h4 className="text-title-md font-bold text-black dark:text-white">
							{item.name}
						</h4>
						<span className="text-sm font-medium">{formatDate(item.createdAt)} {" | "} {item.status}</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default EventCard;
