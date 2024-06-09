import { ChangeEvent, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

import useCreateSubmissions from "../../api/submissions/useCreateSubmissions";
import { useParams } from "react-router-dom";

import useGetEvent from "../../api/events/useGetEvent";
import { MdClose, MdKeyboardArrowDown } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

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
	const { eventId } = useParams();
	const [data, setData] = useState({
		...formFields,
		event: eventId,
		author: user.id,
	});

	const [alert, setAlert] = useState({
		type: "",
		message: "",
		active: false,
	});

	console.log(user);

	const [isOptionSelected, setIsOptionSelected] = useState(false);

	const { data: event, isLoading: isEventLoading } = useGetEvent(eventId);

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
		console.log(data);
		mutate(data, {
			onSuccess: (data) => {
				setData({
					...formFields,
				});
				console.log(data);
				setAlert({
					type: "success",
					message: "Your work is submited successfully",
					active: true,
				});
			},
			onError(error, variables, context) {
				console.log(error);

				setAlert({
					type: "error",
					message: error.response.data.error,
					active: true,
				});
			},
		});
	};
	return (
		<DefaultLayout>
			<Breadcrumb pageName="Add Submission" />
			<div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
				<div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
					<h3 className="font-medium text-black dark:text-white">Submission Form</h3>
				</div>
				<form className="pt-3 pb-3 pl-5 pr-5">
					<div className="mb-4">
						<label className="mb-2.5 block font-medium text-black dark:text-white">
							Select Section
						</label>

						<div className="relative z-20 bg-white dark:bg-form-input">
							<select
								value={data.section}
								placeholder="Select Section"
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
										loading
									</option>
								) : (
									<>
										<option
											value=""
											disabled
											className="text-body dark:text-bodydark"
										>
											Select Section
										</option>
										{event?.data?.sections.map((section) => {
											return (
												<option
													value={section._id}
													className="text-body dark:text-bodydark"
												>
													{section.order} {section.name}
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
							Work name
						</label>
						<div className="relative">
							<input
								type="text"
								name="workName"
								value={data.workName}
								onChange={handleChange}
								placeholder="Enter your Work name"
								className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
							/>
						</div>
					</div>
					<div className="mb-4">
						<label className="mb-2.5 block font-medium text-black dark:text-white">
							Supervisor name
						</label>
						<div className="relative">
							<input
								type="text"
								name="supervisorName"
								value={data.supervisorName}
								onChange={handleChange}
								placeholder="Enter your Supervisor name"
								className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
							/>
						</div>
					</div>
					<div className="mb-4">
						<label className="mb-2.5 block font-medium text-black dark:text-white">
							Supervisor Academic Degree
						</label>
						<div className="relative">
							<input
								type="text"
								name="supervisorAcademicDegree"
								value={data.supervisorAcademicDegree}
								onChange={handleChange}
								placeholder="Enter your Supervisor Academic Degree"
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
									Co-author Full name
								</label>
								<input
									type="text"
									placeholder="Enter Full name"
									value={coauthor.fullName}
									onChange={(e) =>
										handleCoauthorChange(index, "fullName", e.target.value)
									}
									className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
								/>
							</div>
							<div className="w-full xl:w-1/3">
								<label className="mb-2.5 block text-black dark:text-white">
									Co-author University
								</label>
								<input
									type="text"
									placeholder="Enter university"
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
								Remove
							</button>
						</div>
					))}
					<button
						type="button"
						onClick={addCoauthor}
						className="mb-4 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
					>
						Add New Co-author
					</button>

					<div className="mb-4">
						<label className="mb-2.5 block font-medium text-black dark:text-white">
							Attach File
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
							<p className="mb-2.5">With Publication</p>
							{/* </label> */}
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
							value={isLoading ? "Loading" : "Submit"}
							className={`w-full  rounded-lg border border-primary  p-4 text-white transition ${
								isLoading
									? " bg-slate-500"
									: "bg-primary cursor-pointer hover:bg-opacity-90"
							}`}
						/>
					</div>

					{!alert.active ? (
						<></>
					) : alert.type == "error" ? (
						<div className="flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-7 py-4 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-4">
							<div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
								<svg
									width="13"
									height="13"
									viewBox="0 0 13 13"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
										fill="#ffffff"
										stroke="#ffffff"
									></path>
								</svg>
							</div>
							<div className="w-full">
								<div className="flex justify-between align-middle">
									<h5 className="mb-3 font-semibold text-[#B45454]">
										Login Error
									</h5>
									<MdClose
										className="text-[#CD5D5D] cursor-pointer hover:scale-110"
										size={20}
										onClick={() =>
											setAlert({
												type: "",
												message: "",
												active: false,
											})
										}
									/>
								</div>
								<ul>
									<li className="leading-relaxed text-[#CD5D5D]">
										All fields are required
									</li>
								</ul>
							</div>
						</div>
					) : (
						<div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-4 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-4">
							<div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
								<svg
									width="16"
									height="12"
									viewBox="0 0 16 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
										fill="white"
										stroke="white"
									></path>
								</svg>
							</div>
							<div className="w-full">
								<div className="flex justify-between align-middle">
									<h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
										Success
									</h5>
									<MdClose
										className="dark:text-[#34D399]  cursor-pointer hover:scale-110"
										size={20}
										onClick={() =>
											setAlert({
												type: "",
												message: "",
												active: false,
											})
										}
									/>
								</div>
								<p className="text-base leading-relaxed text-body">
									{alert.message}
								</p>
							</div>
						</div>
					)}
				</form>
			</div>
		</DefaultLayout>
	);
};

export default AddSubmissions;
