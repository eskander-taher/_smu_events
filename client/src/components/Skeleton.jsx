import React from "react";

const Skeleton = () => {
	return (
		<>
			<div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark animate-pulse">
				<div className="mt-4 flex items-end justify-between">
					<div>
						<div className="h-6 w-3/4 mb-2 bg-gray-300 rounded animate-pulse"></div>
						<div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse"></div>
					</div>
				</div>
			</div>
			<div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark animate-pulse">
				<div className="mt-4 flex items-end justify-between">
					<div>
						<div className="h-6 w-3/4 mb-2 bg-gray-300 rounded animate-pulse"></div>
						<div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse"></div>
					</div>
				</div>
			</div>
			<div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark animate-pulse">
				<div className="mt-4 flex items-end justify-between">
					<div>
						<div className="h-6 w-3/4 mb-2 bg-gray-300 rounded animate-pulse"></div>
						<div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse"></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Skeleton;
