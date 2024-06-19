import { Link } from 'react-router-dom';
import useListSubmissions from "../../api/submissions/useListSubmissions";
import DefaultLayout from "../../layout/DefaultLayout";
import { baseURL } from "../../context/AxiosProvider";
import Title from "../../components/Title";

function SubmissionList() {
	const { data, isSuccess } = useListSubmissions();

	let submissions = [];
	if (isSuccess) {
		submissions = data.data.data;
	}

	console.log(submissions);

	return (
		<DefaultLayout>
			<Title>Статьи</Title>
			{isSuccess && submissions.length > 0 && (
				<table className="w-full table-auto">
					<thead>
						<tr className="bg-gray-2 text-left dark:bg-meta-4">
							<th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
								Имя автора
							</th>
							<th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
								Название работы
							</th>
							<th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
								Имя руководителя
							</th>
							<th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
								Мероприятие
							</th>
							<th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
								Секция
							</th>
							<th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
								статус
							</th>
							<th className="py-4 px-4 font-medium text-black dark:text-white">
								Действия
							</th>
						</tr>
					</thead>
					<tbody>
						{submissions.map((item) => (
							<tr key={item.id}>
								<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
									<h5 className="font-medium text-black dark:text-white">
										{item.author.firstName}
									</h5>
								</td>
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
										{`${item.section.order}. ${item.section.name}`}
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
											Скачать
										</a>
										<Link
											to={`/submissions/${item._id}/grade`}
											className="hover:bg-blue-600 transition-colors text-white  bg-primary py-2 px-4 rounded-lg"
										>
											Оценить
										</Link>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</DefaultLayout>
	);
}

export default SubmissionList;
