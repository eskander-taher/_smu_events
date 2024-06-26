import { Link } from "react-router-dom";
import useListSubmissionsByMod from "../../api/submissions/useListSubmissionsByMod";
import Title from "../../components/Title";
import DefaultLayout from "../../layout/DefaultLayout";
import useAuth from "../../hooks/useAuth";
import { baseURL } from "../../context/AxiosProvider";

function ModSubmissionList() {
	const { user } = useAuth();
	const { data, isSuccess } = useListSubmissionsByMod(user?.id);
	let submissions = isSuccess ? data.data.data : [];

	return (
		<DefaultLayout>
			<Title>Заявки</Title>
			<table className="w-full table-auto">
				<thead>
					<tr className="bg-gray-2 text-left dark:bg-meta-4">
						<th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
							Work name
						</th>
						<th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
							Supervisor name
						</th>
						<th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
							event
						</th>
						<th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
							Section
						</th>
						<th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
							status
						</th>
						<th className="py-4 px-4 font-medium text-black dark:text-white">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{isSuccess ? (
						submissions.map((item) => (
							<tr key={item._id}>
								<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
									<h5 className="font-medium text-black dark:text-white">
										{item.workName}
									</h5>
								</td>
								<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
									<h5 className="font-medium text-black dark:text-white">
										{item.supervisorName}
									</h5>
								</td>
								<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
									<h5 className="font-medium text-black dark:text-white">
										{item.event.name}
									</h5>
								</td>
								<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
									<h5 className="font-medium text-black dark:text-white">
										{item.section.name}
									</h5>
								</td>
								<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
									<h5 className="font-medium text-black dark:text-white">
										{item.status}
									</h5>
								</td>
								<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
									<div className="flex items-center space-x-3.5">
										{/* Add your action buttons here */}
										<a
											href={`${baseURL}api/submissions/download/${item.file}`}
											className="hover:bg-blue-600 transition-colors text-white  bg-blue-500 py-2 px-4 rounded-lg"
										>
											Download
										</a>
										<Link
											to={`/submissions/${item._id}/grade`}
											className="hover:bg-blue-600 transition-colors text-white  bg-primary py-2 px-4 rounded-lg"
										>
											grade
										</Link>
									</div>
								</td>
							</tr>
						))
					) : (
						<></>
					)}
				</tbody>
			</table>
		</DefaultLayout>
	);
}

export default ModSubmissionList;
