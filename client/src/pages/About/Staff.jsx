import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Title from "../../components/Title";

const Goals = () => {
	return (
		<DefaultLayout>
			<Title>Состав совета</Title>
			<div className="flex flex-col gap-3">
				<div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
					about
				</div>
			</div>
		</DefaultLayout>
	);
};

export default Goals;
