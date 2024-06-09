import useListSubmissionsByAuthor from "../../api/submissions/useListSubmissionsByAuthor";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import useAuth from "../../hooks/useAuth";

function AuthorSubmissionList() {
	const { user } = useAuth();
	const { data, isSuccess } = useListSubmissionsByAuthor(user?.id);

	return (
		<DefaultLayout>
			<Breadcrumb pageName="Author Submissions" />
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
					</tr>
				</thead>
				<tbody>
					{isSuccess ? (
						data.data.map((item) => (
							<tr key={item.id}>
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

export default AuthorSubmissionList;
