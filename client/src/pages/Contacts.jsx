import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Title from "../components/Title";

const Contacts = () => {
	return (
		<DefaultLayout>
			<Title>Контакты</Title>
			<div className="flex flex-col gap-3">
				<div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                Контакты
				</div>
			</div>
		</DefaultLayout>
	);
};

export default Contacts;
