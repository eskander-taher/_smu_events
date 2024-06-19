import useGetEventWinners from '../../api/events/useGetEventWinners';
import Title from '../../components/Title';

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

  let winners = isSuccess? data.data.data: []

  return (
		<>
			{isSuccess && (
				<>
					<Title>
						Победители и призеры
					</Title>
					<div className="my-5 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
						<div className="max-w-full overflow-x-auto">
							<table className="w-full table-auto">
								<thead>
									<tr className="bg-gray-2 text-left dark:bg-meta-4">
										<th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
											Секция
										</th>
										<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
											Первое место
										</th>
										<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
											Второе место
										</th>
										<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
											Третье место
										</th>
									</tr>
								</thead>
								<tbody>
									{winners.map((sectionResult, key) => (
										<tr key={key}>
											<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
												<h5 className="font-medium text-black dark:text-white">
													{`${sectionResult.section.order}. ${sectionResult.section.name}`}
													
												</h5>
											</td>
											<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
												{sectionResult.winners.first.map((winner, i) => (
													<p
														key={i}
														className="text-black dark:text-white"
													>
														{"- "}{winner.author.fullName}
													</p>
												))}
											</td>
											<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
												{sectionResult.winners.second.map((winner, i) => (
													<p
														key={i}
														className="text-black dark:text-white"
													>
														{"- "}{winner.author.fullName}
													</p>
												))}
											</td>
											<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
												{sectionResult.winners.third.map((winner, i) => (
													<p
														key={i}
														className="text-black dark:text-white"
													>
														{"- "}{winner.author.fullName}
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
