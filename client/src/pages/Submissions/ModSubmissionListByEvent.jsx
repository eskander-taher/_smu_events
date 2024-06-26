import { Link, useParams } from "react-router-dom";
import useListSubmissionsByEventAndMod from "../../api/submissions/useListSubmissionsByEventAndMod";
import DefaultLayout from "../../layout/DefaultLayout";
import { baseURL } from "../../context/AxiosProvider";
import Title from "../../components/Title";
import Skeleton from "../../components/Skeleton";
import useAuth from "../../hooks/useAuth";

const SubmissionTable = ({ submissions }) => (
	<table className="w-full table-auto">
		<thead>
			<tr className="bg-gray-2 text-left dark:bg-meta-4">
				{["ФИО автора", "Название работы", "Секция", "Статус", "Действия"].map(
					(heading) => (
						<th
							key={heading}
							className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11"
						>
							{heading}
						</th>
					)
				)}
			</tr>
		</thead>
		<tbody>
			{submissions.map((item) => (
				<tr key={item._id}>
					<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
						<h5 className="font-medium text-black dark:text-white">
							{item.author.fullName}
						</h5>
					</td>
					<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
						<h5 className="font-medium text-black dark:text-white">{item.workName}</h5>
					</td>
					<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
						<h5 className="font-medium text-black dark:text-white">{`${item.section.order}. ${item.section.name}`}</h5>
					</td>
					<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
						<h5 className="font-medium text-black dark:text-white">{item.status}</h5>
					</td>
					<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
						<div className="flex items-center space-x-3.5">
							<a
								href={`${baseURL}/submissions/download/${item.file}`}
								className="hover:bg-blue-600 transition-colors text-white bg-blue-500 py-2 px-4 rounded-lg"
							>
								Скачать
							</a>
							<Link
								to={`/submissions/${item._id}/grade`}
								className="hover:bg-blue-600 transition-colors text-white bg-primary py-2 px-4 rounded-lg"
							>
								Оценить
							</Link>
						</div>
					</td>
				</tr>
			))}
		</tbody>
	</table>
);

const ModSubmissionListByEvent = () => {
	const { eventId } = useParams();
	const { user } = useAuth();
	const { data, isSuccess, isError, isLoading } = useListSubmissionsByEventAndMod({
		eventId,
		modId: user.id,
	});
	const submissions = isSuccess ? data.data.data : [];

	return (
		<DefaultLayout>
			<Title>Заявки</Title>
			{isLoading ? (
				<Skeleton />
			) : isError ? (
				<p>Server Can't respond</p>
			) : (
				<>
					{isSuccess && submissions.length > 0 ? (
						<SubmissionTable submissions={submissions} />
					) : (
						<p>Нет статей для показа</p>
					)}
				</>
			)}
		</DefaultLayout>
	);
};

export default ModSubmissionListByEvent;
