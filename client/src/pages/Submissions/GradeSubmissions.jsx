import { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import useGradeSubmissions from "../../api/submissions/useGradeSubmissions";
import { MdClose } from "react-icons/md";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const GradeSubmissions = () => {
	const { subId } = useParams();
	const { user } = useAuth();

	const [data, setData] = useState({
		grade: "1",
		status: "rejected",
		comment: "",
		mod: user.id,
	});

	const [alert, setAlert] = useState({
		type: "",
		message: "",
		active: false,
	});

	const { mutate, isLoading } = useGradeSubmissions();

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		mutate({ payload: data, subId });
	};

	return (
		<DefaultLayout>
			<div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
				<div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
					<h3 className="font-medium text-black dark:text-white">
						Submission Grading Form
					</h3>
				</div>
				<form className="pt-3 pb-3 pl-5 pr-5">
					<div className="mb-4">
						<label className="mb-2.5 block font-medium text-black dark:text-white">
							grade
						</label>
						<div className="relative">
							<input
								type="number"
								name="grade"
								value={data.grade}
								max={10}
								min={0}
								onChange={handleChange}
								placeholder="Enter your grade"
								className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
							/>
						</div>
					</div>
					<div className="mb-4">
						<label className="mb-2.5 block font-medium text-black dark:text-white">
							comment
						</label>
						<div className="relative">
							<textarea
								name="comment"
								value={data.comment}
								onChange={handleChange}
								placeholder="Enter your comment"
								className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
							/>
						</div>
					</div>

					<div className="mb-4">
						<label className="mb-2.5 block font-medium text-black dark:text-white">
							Select Status
						</label>

						<div className="relative z-20 bg-white dark:bg-form-input">
							<select
								value={data.status}
								placeholder="Select Status"
								name="status"
								onChange={handleChange}
								className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
									data.status ? "text-black dark:text-white" : ""
								}`}
							>
								<option value="" disabled className="text-body dark:text-bodydark">
									Select Section
								</option>
								{["ожидание", "принято", "отклонено"].map((status) => {
									return (
										<option
											value={status}
											className="text-body dark:text-bodydark"
										>
											{status}
										</option>
									);
								})}
							</select>
							<span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g opacity="0.8">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
											fill="#637381"
										></path>
									</g>
								</svg>
							</span>
						</div>
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

export default GradeSubmissions;
