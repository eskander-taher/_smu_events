import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import { useParams } from "react-router-dom";
import useGetNew from "../../api/news/useGetNew";
import formatDate from "../../utils/dateFormater";

const NewsDetail = () => {
	const { id } = useParams();

	const { data, isLoading } = useGetNew(id);

	return (
		<DefaultLayout>
			<div className="flex flex-col gap-3">
				{isLoading ? (
					<></>
				) : (
					<div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
						<div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
							<div className="mt-4">
								<h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
									{data?.data.title}
								</h3>
								<span className="text-sm font-medium">
									{formatDate(data?.data.createdAt)}
								</span>
								<p className="font-medium">
									<div className="mx-auto max-w-180">
										<p className="mt-4.5">
											<div className="ql-editor">
												<div
													dangerouslySetInnerHTML={{
														__html: data.data.content,
													}}
												/>
											</div>
										</p>
									</div>
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</DefaultLayout>
	);
};

export default NewsDetail;
