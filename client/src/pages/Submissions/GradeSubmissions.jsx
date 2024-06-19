import { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import useGradeSubmissions from "../../api/submissions/useGradeSubmissions";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GradeSubmissions = () => {
	const navigate = useNavigate()
	const { subId } = useParams();
	const { user } = useAuth();

	const [data, setData] = useState({
		grade: "1",
		status: "ожидание",
		comment: "",
		mod: user.id,
	});

	const { mutate, isLoading } = useGradeSubmissions();

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		mutate(
			{ payload: data, subId },
			{
				onSuccess: () => {
					toast.success("Статья оценена успешно");

				},
				onError: (error) => {
					console.log(error);
					toast.error("Не удалось оценить статью");
				},
			}
		);
	};

	return (
		<DefaultLayout>
			<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
				<form className="pt-3 pb-3 pl-5 pr-5">
					<div className="mb-4">
						<label className="mb-2.5 block font-medium text-black dark:text-white">
							Оценка
						</label>
						<div className="relative">
							<select
								name="grade"
								value={data.grade}
								onChange={handleChange}
								className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
							>
								{[...Array(10).keys()].map((n) => (
									<option key={n + 1} value={n + 1}>
										{n + 1}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="mb-4">
						<label className="mb-2.5 block font-medium text-black dark:text-white">
							Комментарий
						</label>
						<div className="relative">
							<textarea
								name="comment"
								value={data.comment}
								onChange={handleChange}
								placeholder="Введите ваш комментарий"
								className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
							/>
						</div>
					</div>

					<div className="mb-4">
						<label className="mb-2.5 block font-medium text-black dark:text-white">
							Выберите статус
						</label>

						<div className="relative z-20 bg-white dark:bg-form-input">
							<select
								value={data.status}
								placeholder="Выберите статус"
								name="status"
								onChange={handleChange}
								className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
									data.status ? "text-black dark:text-white" : ""
								}`}
							>
								{["ожидание", "принято", "отклонено"].map((status) => {
									return (
										<option
											defaultValue={"ожидание"}
											key={status}
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
							value={isLoading ? "Загрузка" : "Отправить"}
							className={`w-full rounded-lg border border-primary p-4 text-white transition ${
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

export default GradeSubmissions;
