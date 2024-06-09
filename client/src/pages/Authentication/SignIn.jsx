import { useState } from "react";
import { Link } from "react-router-dom";

import AuthIllestration from "./AuthIllestration";

import useLogin from "../../api/auth/useLogin";
import useAuth from "../../hooks/useAuth";
import { MdOutlineMailOutline } from "react-icons/md";
import { PiPassword } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import DefaultLayout from "../../layout/DefaultLayout";

const SignIn = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const { mutate, isLoading, data: response } = useLogin();
	const { loginUser } = useAuth();

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!data.email || !data.password) {
			toast.error("Все поля должны быть заполнены");
			return;
		}

		mutate(data, {
			onSuccess: (data) => {
				loginUser({
					token: data.data.token,
				});
				toast.success(response.data.message);
			},
			onError: (error) => {
				toast.error(error.response.data.error);
			},
		});
	};

	return (
		<DefaultLayout>
			<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
				<div className="flex flex-wrap items-center">
					<div className="hidden w-full xl:block xl:w-1/2">
						<div className="py-17.5 px-26 text-center">
							<Link className="mb-5.5 inline-block" to="/">
								<h1 className="text-2xl font-bold">Совет молодых ученых</h1>
							</Link>
							<p className="2xl:px-20">Начните свое исследовательское путешествие.</p>

							<span className="mt-15 inline-block">
								<AuthIllestration width="350" height="350" />
							</span>
						</div>
					</div>

					<div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
						<div className="w-full p-4 sm:p-12.5 xl:p-17.5">
							<h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
								Войти в систему СМУ
							</h2>

							<form>
								<div className="mb-4">
									<label className="mb-2.5 block font-medium text-black dark:text-white">
										Электронная почта
									</label>
									<div className="relative">
										<input
											type="email"
											name="email"
											value={data.email}
											onChange={handleChange}
											placeholder="Введите вашу электронную почту"
											className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
										/>

										<span className="absolute right-4 top-4">
											<MdOutlineMailOutline />
										</span>
									</div>
								</div>

								<div className="mb-6">
									<label className="mb-2.5 block font-medium text-black dark:text-white">
										Пароль
									</label>
									<div className="relative">
										<input
											type="password"
											name="password"
											value={data.password}
											onChange={handleChange}
											placeholder="Введите ваш пароль"
											className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
										/>

										<span className="absolute right-4 top-4">
											<PiPassword />
										</span>
									</div>
								</div>

								<div className="mb-5">
									<input
										type="submit"
										value={isLoading ? "Загрузка" : "Войти"}
										onClick={handleSubmit}
										className={`w-full  rounded-lg border border-primary  p-4 text-white transition ${
											isLoading
												? " bg-slate-500"
												: "bg-primary cursor-pointer hover:bg-opacity-90"
										}`}
									/>
									<ToastContainer position="top-center" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default SignIn;
