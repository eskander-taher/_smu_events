import React from "react";
import shiraev from "../../images/shiraev.jpg";

function Left() {
	return (
		<div className="flex flex-col items-center p-4 h-fit  rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-3 ">
			<div>
				<img className="w-50 rounded" src={shiraev} alt="" />
			</div>
			<h4 className="px-7.5 text-lg font-semibold text-center">Председатель СМУ:</h4>
			<h4 className="mb-4 px-7.5 text-lg font-semibold text-black dark:text-white text-center">
				Ширяев Олег Валерьевич
			</h4>
			<p className="flex flex-col">
				<span className="text-center">Адрес:</span>
				<span className="font-semibold text-black dark:text-white text-center"> УУНиТ</span>
			</p>
			<p className="flex flex-col">
				<span className="text-center">Время работы:</span>
				<span className="font-semibold text-black dark:text-white text-center">
					{" "}
					9:00 - 18:00
				</span>
			</p>
			<p className="flex flex-col">
				<span className="text-center">Контакты:</span>
				<span className="font-semibold text-black dark:text-white text-center">
					{" "}
					smu@ugatu.su
				</span>
			</p>
		</div>
	);
}

export default Left;
