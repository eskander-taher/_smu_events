import DefaultLayout from '../../layout/DefaultLayout';
import { Link, useParams } from 'react-router-dom';
import useGetEvent from '../../api/events/useGetEvent';
import useAuth from '../../hooks/useAuth';
import WinnersTable from './WinnersTable';

const Event = () => {
  const { eventId } = useParams();
  const { data, isLoading } = useGetEvent(eventId);
  const { user } = useAuth();

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <></>
        ) : (
          <>
            <div className=" bg-white rounded-md shadow-md p-4">
              <h1 className="text-3xl  text-primary font-semibold text-center">
                {data.data.name}
              </h1>
              <div className="ql-editor">
                <div
                  dangerouslySetInnerHTML={{ __html: data.data.description }}
                />
              </div>
            </div>
            {data?.data?.status !== 'ongoing' ||
            !user ||
            user.role !== 'author' ? (
              <div className="inline-flex items-center justify-center rounded-md bg-graydark py-4 px-10 text-center font-medium text-white text-xl">
                {data.data.status}
              </div>
            ) : (
              <Link
                to={`/events/${eventId}/add-submission`}
                className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Add Submission
              </Link>
            )}
          </>
        )}
      </div>
      {data?.data?.status === 'finished' && <WinnersTable eventId={eventId} />}
    </DefaultLayout>
  );
};

export default Event;
