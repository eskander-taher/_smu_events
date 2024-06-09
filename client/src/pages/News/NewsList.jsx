import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import useListNews from "../../api/news/useListNews";
import { Link } from "react-router-dom";
import useDeleteNews from "../../api/news/useDeleteNews";

const NewsList = () => {
	const { data: news, isLoading, error, isSuccess } = useListNews();

	const { mutate, isLoading: isDeleting } = useDeleteNews();

	const handleDelete = (id) => {
		mutate(id);
	};

	return (
		<DefaultLayout>
			<Breadcrumb pageName="News" />
			<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
				<div className="max-w-full overflow-x-auto">
					<table className="w-full table-auto">
						<thead>
							<tr className="bg-gray-2 text-left dark:bg-meta-4">
								<th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
									title
								</th>
								<th className="py-4 px-4 font-medium text-black dark:text-white">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{isSuccess &&
								news.data.map((item) => (
									<tr key={item._id}>
										<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
											<h5 className="font-medium text-black dark:text-white">
												{item.title}
											</h5>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<div className="flex items-center space-x-3.5">
												{/* Add your action buttons here */}

												<Link
													to={`/news/${item._id}`}
													className="hover:bg-blue-600 transition-colors text-white  bg-primary py-2 px-4 rounded-lg"
												>
													Show
												</Link>
												<button
													onClick={() => handleDelete(item._id)}
													className="hover:bg-red-600 transition-colors text-white  bg-red-500 py-2 px-4 rounded-lg"
												>
													Remove
												</button>
												{/* <button className="hover:text-primary">Action 3</button> */}
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default NewsList;
