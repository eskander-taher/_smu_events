import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Title from "../components/Title";

const Contacts = () => {
	return (
		<DefaultLayout>
			<div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
				<div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
					<div className="mt-4">
						<h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
							Контакты
						</h3>

						<div className="mx-auto max-w-180">
							<div className="ql-editor">
								<div className="flex flex-col gap-2">
									<p>Председатель СМУ: Ширяев Олег Валерьевич</p>
									<p>Зам. председателя СМУ: Казанцев Андрей Валерьевич</p>
									<p>Секретарь СМУ: Зайнагутдинова Эвелина Ильгизовна</p>
									<p>e-mail: smu@ugatu.su</p>

									<ol className="flex flex-col gap-2">
										<li>
											Казанцев А.В., к.т.н., доцент кафедры АСУ -
											представитель ФИРТ.
										</li>
										<p>e-mail: kazancev.av@ugatu.su</p>

										<li>
											Зайнагутдинова Э.И., оператор ЭВиВМ НИИ ЭТКиС -
											представитель ФАВИЭТ, инженер НИИ ЭТКиС ПИШ "Моторы
											будущего"
										</li>
										<p>e-mail: zaynagutdinova.ei@ugatu.su</p>

										<li>
											Назаров А.Ю., представитель ИАТМ, руководитель СКБ
											"Силовые машины"
										</li>
										<p>e-mail: nazarov.ayu@ugatu.su</p>

										<li>
											Пермяков А.В., к.т.н., доцент кафедры ПБ - представитель
											ФЗЧС.
										</li>
										<p>e-mail: @ugatu.su</p>

										<li>
											Шабельник Ю.А., старший преподаватель кафедры МиЦП -
											представитель ФАДЭТ.
										</li>
										<p>e-mail: shabelnik.yua@ugatu.su</p>

										<li>
											Дмитриева И.В., старший преподаватель кафедры ЭП -
											представитель ИНЭК.
										</li>
										<p>e-mail: dmitrieva.iv@ugatu.su</p>

										<li>
											Устимова Е.И., преподаватель кафедры ТиТМ -
											представитель филиала ФГБОУ ВО УУНиТ г. Ишимбай ,
											старший преподаватель кафедры ТиТМ.
										</li>
										<p>e-mail: ustimova.ei@ugatu.su</p>

										<li>
											Ишкулова А.Р., к.т.н., доцент кафедры ТПЛА -
											представитель филиала ФГБОУ ВО УУНиТ в г. Кумертау.
										</li>
										<p>e-mail: ishkulova.ar@ugatu.su</p>

										<li>
											Журавлев А.С., заместитель директора ЕИК - представитель
											административно-управленческих подразделений.
										</li>
										<p>e-mail: zhuravlev.as@ugatu.su</p>
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

export default Contacts;
