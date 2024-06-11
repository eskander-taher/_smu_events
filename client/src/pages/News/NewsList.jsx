import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Title from "../../components/Title";
import useListNews from "../../api/news/useListNews";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useConfirm from "../../hooks/useConfirm";
import useDeleteNews from "../../api/news/useDeleteNews";

const NewsList = () => {
	const { data, isLoading, error, isSuccess } = useListNews();
	const [openModal, ConfirmationModalComponent] = useConfirm();
	const { mutate } = useDeleteNews();

	let news = [];
	if (isSuccess) {
		news = data.data.data;
	}

	const handleDelete = (id) => {
		openModal(() => {
			mutate(id, {
				onSuccess: () => {
					toast.success("Новость успешно удалена");
				},
				onError: (error) => {
					toast.error("Не удалось удалить новость");
					console.log(error);
				},
			});
		}, "Вы уверены, что хотите удалить эту новость?");
	};

	return (
		<DefaultLayout>
			<Title>Новости</Title>
			<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
				<div className="max-w-full overflow-x-auto">
					<table className="w-full table-auto">
						<thead>
							<tr className="bg-gray-2 text-left dark:bg-meta-4">
								<th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
									Заголовок
								</th>
								<th className="py-4 px-4 font-medium text-black dark:text-white">
									Действия
								</th>
							</tr>
						</thead>
						<tbody>
							{isLoading && (
								<tr>
									<td colSpan="2" className="text-center py-5">
										Загрузка...
									</td>
								</tr>
							)}
							{error && (
								<tr>
									<td colSpan="2" className="text-center py-5">
										Не удалось загрузить новости.
									</td>
								</tr>
							)}
							{isSuccess &&
								news &&
								news.length > 0 &&
								news.map((item) => (
									<tr key={item._id}>
										<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
											<h5 className="font-medium text-black dark:text-white">
												{item.title}
											</h5>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<div className="flex items-center space-x-3.5">
												<Link
													to={`/news/${item._id}`}
													className="hover:bg-blue-600 transition-colors text-white bg-primary py-2 px-4 rounded-lg"
												>
													Показать
												</Link>
												<button
													onClick={() => handleDelete(item._id)}
													className="hover:bg-red-600 transition-colors text-white bg-red-500 py-2 px-4 rounded-lg"
												>
													Удалить
												</button>
											</div>
										</td>
									</tr>
								))}
							{isSuccess && news && news.length === 0 && (
								<tr>
									<td colSpan="2" className="text-center py-5">
										Нет доступных новостей.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			<ToastContainer position="top-center" autoClose={false} draggable />
			<ConfirmationModalComponent />
		</DefaultLayout>
	);
};

export default NewsList;
