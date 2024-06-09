import { Link } from 'react-router-dom';

const EventCard = ({name,status,_id}) => {
  return (
    <Link
      to={`/events/${_id}`}
      className="flex gap-3  bg-white rounded-md shadow-md hover:shadow-xl transition-shadow cursor-pointer"
    >
      <div className="flex gap-2 flex-col p-2">
        <div className="flex space-x-3 align-middle">
          <div>
            <h2 className="text-2xl  text-primary font-medium">{name}</h2>
          </div>
          <p>|</p>
          <p>{status}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
