import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import { useParams } from "react-router-dom";
import useGetNew from "../../api/news/useGetNew";
import formatDate from "../../utils/dateFormater";
import Skeleton from "../../components/Skeleton";

const NewsDetail = () => {
	const { id } = useParams();

	const { data, isLoading, isSuccess } = useGetNew(id);

	let news = {};
	if (isSuccess) {
		news = data.data.data;
	}

	return (
		<DefaultLayout>
			<div className="flex flex-col gap-3">
				{isLoading ? (
					<Skeleton />
				) : (
					<div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
						<div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
							<div className="mt-4">
								<h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
									{news.title}
								</h3>
								<span className="text-sm font-medium">
									{formatDate(news.createdAt)}
								</span>

								<div className="mx-auto max-w-180">
									<div className="ql-editor">
										<div
											dangerouslySetInnerHTML={{
												__html: news.content,
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</DefaultLayout>
	);
};

export default NewsDetail;
