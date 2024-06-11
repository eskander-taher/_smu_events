import { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Title from "../../components/Title";

import useCreateSubmissions from "../../api/submissions/useCreateSubmissions";
import { useParams } from "react-router-dom";

import useGetEvent from "../../api/events/useGetEvent";
import { MdKeyboardArrowDown } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

import { ToastContainer, toast } from "react-toastify";

const formFields = {
	workName: "",
	event: "",
	section: "",
	file: null,
	supervisorName: "",
	supervisorAcademicDegree: "",
	withPublication: false,
	coauthors: [{ fullName: "", university: "" }],
};

const AddSubmissions = () => {
	const { user } = useAuth();
	const { id } = useParams();
	const [data, setData] = useState({
		...formFields,
		event: id,
		author: user.id,
	});

	const [isOptionSelected, setIsOptionSelected] = useState(false);

	const { data: eventData, isLoading: isEventLoading, isSuccess } = useGetEvent(id);

	let event = {};

	if (isSuccess) {
		event = eventData.data.data;
	}

	const { mutate, isLoading } = useCreateSubmissions();

	const changeTextColor = () => {
		setIsOptionSelected(true);
	};

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleCoauthorChange = (index, field, value) => {
		const newCoauthors = data.coauthors.map((coauthor, i) =>
			i === index ? { ...coauthor, [field]: value } : coauthor
		);
		setData({ ...data, coauthors: newCoauthors });
	};

	const addCoauthor = () => {
		setData({
			...data,
			coauthors: [...data.coauthors, { fullName: "", university: "" }],
		});
	};

	const removeCoauthor = (index) => {
		setData({
			...data,
			coauthors: data.coauthors.filter((_, i) => i !== index),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		mutate(data, {
			onSuccess: () => {
				toast.success("Статья успешно загружена");
				setData({
					...formFields,
				});
			},
			onError(error) {
				toast.error("Не удалось загрузить статью");
				console.log(error);
			},
		});
	};
	return (
		<DefaultLayout>
			<Title>Загрузить статью</Title>
			<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
				<form className="pt-3 pb-3 pl-5 pr-5">
					<div className="mb-4">
						<label className="mb-2.5 block font-medium text-black dark:text-white">
							Выберите секцию
						</label>

						<div className="relative z-20 bg-white dark:bg-form-input">
							<select
								value={data.section}
								placeholder="Выберите Секцию"
								name="section"
								onChange={(e) => {
									handleChange(e);
									changeTextColor();
								}}
								className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
									isOptionSelected ? "text-black dark:text-white" : ""
								}`}
							>
								{isEventLoading ? (
									<option
										value=""
										disabled
										className="text-body dark:text-bodydark"
									>
										загрузка
									</option>
								) : (
									<>
										<option
											value=""
											disabled
											className="text-body dark:text-bodydark"
										>
											Выберите секцию
										</option>
										{event.sections.map((section) => {
											return (
												<option
													key={section._id}
													value={section._id}
													className="text-body dark:text-bodydark"
												>
													{`${section.order}. ${section.name}`}
												</option>
											);
										})}
									</>
								)}
							</select>
							<span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
								<MdKeyboardArrowDown />
							</span>
						</div>
					</div>
					<div className="mb-4">
						<label className="mb-2.5 block font-medium text-black dark:text-white">
							Название работы
						</label>
						<div className="relative">
							<input
								type="text"
								name="workName"
								value={data.workName}
								onChange={handleChange}
								placeholder="Введите Название Работы"
								className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
							/>
						</div>
					</div>
					<div className="mb-4">
						<label className="mb-2.5 block font-medium text-black dark:text-white">
							Имя руководителя
						</label>
						<div className="relative">
							<input
								type="text"
								name="supervisorName"
								value={data.supervisorName}
								onChange={handleChange}
								placeholder="Введите Имя Руководителя"
								className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
							/>
						</div>
					</div>
					<div className="mb-4">
						<label className="mb-2.5 block font-medium text-black dark:text-white">
							Ученая степень руководителя
						</label>
						<div className="relative">
							<input
								type="text"
								name="supervisorAcademicDegree"
								value={data.supervisorAcademicDegree}
								onChange={handleChange}
								placeholder="Введите Ученую Степень Руководителя"
								className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
							/>
						</div>
					</div>

					{data.coauthors.map((coauthor, index) => (
						<div
							key={index}
							className="mb-4.5 flex flex-col gap-6 xl:flex-row align-middle bord"
						>
							<div className="w-full xl:w-1/3">
								<label className="mb-2.5 block text-black dark:text-white">
									Полное имя соавтора
								</label>
								<input
									type="text"
									placeholder="Введите Полное Имя"
									value={coauthor.fullName}
									onChange={(e) =>
										handleCoauthorChange(index, "fullName", e.target.value)
									}
									className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
								/>
							</div>
							<div className="w-full xl:w-1/3">
								<label className="mb-2.5 block text-black dark:text-white">
									Университет соавтора
								</label>
								<input
									type="text"
									placeholder="Введите Университет"
									value={coauthor.university}
									onChange={(e) =>
										handleCoauthorChange(index, "university", e.target.value)
									}
									className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
								/>
							</div>

							<button
								type="button"
								onClick={() => removeCoauthor(index)}
								className="py-2 px-3 mt-7 flex h-10 w-full items-center justify-center rounded bg-red-500 text-white hover:bg-red-600 xl:w-auto"
							>
								Удалить
							</button>
						</div>
					))}
					<button
						type="button"
						onClick={addCoauthor}
						className="mb-4 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
					>
						Добавить нового соавтора
					</button>

					<div className="mb-4">
						<label className="mb-2.5 block font-medium text-black dark:text-white">
							Прикрепить файл
						</label>
						<input
							type="file"
							name="file"
							onChange={(e) => setData({ ...data, file: e.target.files[0] })}
							className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
						/>
					</div>
					<div className="mb-4">
						<label className="mb-2.5 block font-medium text-black dark:text-white">
							<p className="mb-2.5">С публикацией</p>
							<div className="relative">
								<input
									type="checkbox"
									id="toggle3"
									className="sr-only"
									onChange={() => {
										setData({
											...data,
											withPublication: !data.withPublication,
										});
									}}
								/>
								<div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
								<div
									className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
										data.withPublication &&
										"!right-1 !translate-x-full !bg-primary dark:!bg-white"
									}`}
								>
									<span className={`hidden ${data.withPublication && "!block"}`}>
										<svg
											className="fill-white dark:fill-black"
											width="11"
											height="8"
											viewBox="0 0 11 8"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
												fill=""
												stroke=""
												strokeWidth="0.4"
											></path>
										</svg>
									</span>
									<span className={`${data.withPublication && "hidden"}`}>
										<svg
											className="h-4 w-4 stroke-current"
											fill="none"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M6 18L18 6M6 6l12 12"
											></path>
										</svg>
									</span>
								</div>
							</div>
						</label>
					</div>

					<div className="mb-5">
						<input
							type="submit"
							onClick={handleSubmit}
							disabled={isLoading}
							value={isLoading ? "Загрузка" : "Отправить"}
							className={`w-full  rounded-lg border border-primary  p-4 text-white transition ${
								isLoading
									? " bg-slate-500"
									: "bg-primary cursor-pointer hover:bg-opacity-90"
							}`}
						/>
					</div>
				</form>
			</div>
			<ToastContainer position="top-center" autoClose={false} draggable />
		</DefaultLayout>
	);
};

export default AddSubmissions;
