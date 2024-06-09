import React from "react";
import shiraev from "../../images/shiraev.jpg";

function Left() {
	return (
		<div className="flex flex-col items-center p-4 h-fit  rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-3 ">
			<div>
				<img className="w-50 rounded" src={shiraev} alt="" />
			</div>
			<h4 className=" px-7.5 text-lg font-semibold text-black dark:text-white text-center">
				Председатель СМУ:
			</h4>
			<h4 className="mb-6 px-7.5 text-lg font-semibold text-black dark:text-white text-center">
				Ширяев Олег Валерьевич
			</h4>
			<p>
				<span className="font-semibold text-black dark:text-white">Адрес:</span> УУНиТ{" "}
			</p>
			<p>
				<span className="font-semibold text-black dark:text-white">Время работы:</span> 9:00
				- 18:00{" "}
			</p>
			<p>
				<span className="font-semibold text-black dark:text-white">Контакты:</span>{" "}
				smu@ugatu.su{" "}
			</p>
		</div>
	);
}

export default Left;
