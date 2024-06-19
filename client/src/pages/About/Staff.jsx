import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";

const Goals = () => {
	return (
		<DefaultLayout>
			<div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
				<div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
					<div className="mt-4">
						<h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
							Состав совета
						</h3>

						<div className="mx-auto max-w-180">
							<div className="ql-editor">
								<div>
									<p>Состав Совета молодых ученых литера Т УУНиТ:</p>
									<br />
									<ol className="flex flex-col gap-2">
										<li>
											Ширяев О.В., к.т.н., доцент кафедры ЦТЭУ - председатель.
										</li>
										<li>
											Казанцев А.В., к.т.н., доцент кафедры АСУ - заместитель
											председателя, представитель ФИРТ.
										</li>
										<li>
											Зайнагутдинова Э.И., инженер НИИ ЭТкиС ПИШ "Моторы
											будущего" - ответственный секретарь, представитель
											ФАВИЭТ.
										</li>
										<li>
											Назаров А.Ю., руководитель СКБ "Силовые машины" -
											представитель ИАТМ.
										</li>
										<li>
											Пермяков А.В., к.т.н., доцент кафедры ПБ - представитель
											ФЗЧС.
										</li>
										<li>
											Шабельник Ю.А., старший преподаватель кафедры МиЦП -
											представитель ФАДЭТ.
										</li>
										<li>
											Дмитриева И.В., старший преподаватель кафедры ЭП -
											представитель ИНЭК.
										</li>
										<li>
											Устимова Е.И., старший преподаватель кафедры ТиТМ -
											представитель филиала ФГБОУ ВО УУНиТ г. Ишимбай.
										</li>
										<li>
											Ишкулова А.Р., к.т.н., доцент кафедры ТПЛА -
											представитель филиала ФГБОУ ВО УУНиТ в г. Кумертау.
										</li>
										<li>
											Журавлев А.С., заместитель директора ЕИК - представитель
											административно-управленческих подразделений.
										</li>
									</ol>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default Goals;
