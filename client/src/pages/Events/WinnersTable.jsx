import useGetEventWinners from '../../api/events/useGetEventWinners';

// Sample winner data structure
const winnerData = [
  {
    section: { _id: 'section1', name: 'Section 1' },
    winners: {
      first: [{ author: { fullName: 'Alice' } }],
      second: [{ author: { fullName: 'Bob' } }],
      third: [{ author: { fullName: 'Charlie' } }],
    },
  },
  {
    section: { _id: 'section2', name: 'Section 2' },
    winners: {
      first: [
        { author: { fullName: 'Dave' } },
        { author: { fullName: 'Eve' } },
      ],
      second: [],
      third: [],
    },
  },
];

const WinnersTable = ({ eventId }) => {
  const { data, isSuccess } = useGetEventWinners(eventId);

  return (
    <>
      {isSuccess && (
        <>
          <h1 className="text-3xl mb-5 text-primary font-semibold">Winners</h1>
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Section
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      First Place
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Second Place
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Third Place
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((sectionResult, key) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {sectionResult.section.name}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {sectionResult.winners.first.map((winner, i) => (
                          <p key={i} className="text-black dark:text-white">
                            {winner.author.firstName}
                          </p>
                        ))}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {sectionResult.winners.second.map((winner, i) => (
                          <p key={i} className="text-black dark:text-white">
                            {winner.author.firstName}
                          </p>
                        ))}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        {sectionResult.winners.third.map((winner, i) => (
                          <p key={i} className="text-black dark:text-white">
                            {winner.author.firstName}
                          </p>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WinnersTable;
