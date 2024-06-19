import React, { useState } from "react";
import { MdOutlineMailOutline, MdOutlinePhoneEnabled } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { IoBookOutline, IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useRegisterModerator from "../../api/auth/useRegisterModerator";
import { RiLockPasswordLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
 
const formFields = {
	lastName: "",
	firstName: "",
	middleName: "",
	email: "",
	password: "",
	phoneNumber: "",
	dateOfBirth: "",
	faculty: "",
	department: "",
	jobTitle: "",
};

const JobTitleEnum = [
	"Ассистент",
	"Старший преподаватель",
	"Доцент",
	"Профессор",
	"Заведующий кафедрой",
];

const ModeratorSignupForm = () => {
	const [data, setData] = useState({ ...formFields });
	const { mutate, isLoading } = useRegisterModerator();

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Check if any required field is empty
		const requiredFields = [
			"lastName",
			"firstName",
			"email",
			"password",
			"faculty",
			"department",
			"jobTitle",
		];

		const isEmpty = requiredFields.some((field) => !data[field]);
		if (isEmpty) {
			toast.error("Пожалуйста, заполните все обязательные поля.");
			return;
		}

		mutate(data, {
			onSuccess: (data) => {
				toast.success(data.data.message);
				setData({
					...formFields,
				});
			},
			onError(error) {
				toast.error(error.response.data.message);
			},
		});
	};

	return (
		<form>
			<div className="mb-4">
				<label className="mb-2.5 block font-medium text-black dark:text-white">
					Фамилия *
				</label>
				<div className="relative">
					<input
						required
						type="text"
						name="lastName"
						value={data.lastName}
						onChange={handleChange}
						placeholder="Введите вашу фамилию"
						className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
					/>
					<span className="absolute right-4 top-4">
						<IoPersonOutline />
					</span>
				</div>
			</div>
			<div className="mb-4">
				<label className="mb-2.5 block font-medium text-black dark:text-white">Имя *</label>
				<div className="relative">
					<input
						required
						type="text"
						name="firstName"
						value={data.firstName}
						onChange={handleChange}
						placeholder="Введите ваше имя"
						className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
					/>
					<span className="absolute right-4 top-4">
						<IoPersonOutline />
					</span>
				</div>
			</div>
			<div className="mb-4">
				<label className="mb-2.5 block font-medium text-black dark:text-white">
					Отчество
				</label>
				<div className="relative">
					<input
						type="text"
						name="middleName"
						value={data.middleName}
						onChange={handleChange}
						placeholder="Введите ваше отчество"
						className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
					/>
					<span className="absolute right-4 top-4">
						<IoPersonOutline />
					</span>
				</div>
			</div>

			<div className="mb-4">
				<label className="mb-2.5 block font-medium text-black dark:text-white">
					Электронная почта *
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

			<div className="mb-4">
				<label className="mb-2.5 block font-medium text-black dark:text-white">
					Пароль *
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
						<RiLockPasswordLine />
					</span>
				</div>
			</div>
			<div className="mb-6">
				<label className="mb-2.5 block font-medium text-black dark:text-white">
					Номер телефона
				</label>
				<div className="relative">
					<input
						type="text"
						name="phoneNumber"
						value={data.phoneNumber}
						onChange={handleChange}
						placeholder="Введите ваш номер телефона"
						className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
					/>
					<span className="absolute right-4 top-4">
						<MdOutlinePhoneEnabled />
					</span>
				</div>
			</div>

			<div className="mb-6">
				<label className="mb-2.5 block font-medium text-black dark:text-white">
					Дата рождения
				</label>
				<div className="relative">
					<input
						type="text"
						name="dateOfBirth"
						value={data.dateOfBirth}
						onChange={handleChange}
						placeholder="Введите дата рождения (дд.мм.гггг)"
						className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
					/>
					<span className="absolute right-4 top-4">
						<CiCalendarDate />
					</span>
				</div>
			</div>

			<div className="mb-6">
				<label className="mb-2.5 block font-medium text-black dark:text-white">
					Факультет/Институт *
				</label>
				<div className="relative">
					<input
						type="text"
						name="faculty"
						value={data.faculty}
						onChange={handleChange}
						placeholder="Введите ваш факультет"
						className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
					/>
					<span className="absolute right-4 top-4">
						<IoBookOutline />
					</span>
				</div>
			</div>
			<div className="mb-6">
				<label className="mb-2.5 block font-medium text-black dark:text-white">
					Кафедра *
				</label>
				<div className="relative">
					<input
						type="text"
						name="department"
						value={data.department}
						onChange={handleChange}
						placeholder="Введите вашу кафедру"
						className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
					/>
					<span className="absolute right-4 top-4">
						<IoBookOutline />
					</span>
				</div>
			</div>

			<div>
				<label className="mb-3 block text-black dark:text-white">
					Выберите должность *
				</label>

				<div className="relative z-20 bg-white dark:bg-form-input">
					<select
						value={data.jobTitle}
						name="jobTitle"
						onChange={handleChange}
						className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
							data.jobTitle ? "text-black dark:text-white" : ""
						}`}
					>
						<option value="" disabled className="text-body dark:text-bodydark">
							Выберите должность
						</option>
						{JobTitleEnum.map((status) => {
							return (
								<option
									key={status}
									value={status}
									className="text-body dark:text-bodydark"
								>
									{status}
								</option>
							);
						})}
					</select>
				</div>
			</div>

			<div className="my-5">
				<input
					type="submit"
					onClick={handleSubmit}
					disabled={isLoading}
					value={isLoading ? "Загрузка..." : "Создать аккаунт"}
					className={`w-full  rounded-lg border border-primary  p-4 text-white transition ${
						isLoading
							? " bg-slate-500"
							: "bg-primary cursor-pointer hover:bg-opacity-90"
					}`}
				/>
				<ToastContainer position="top-center" autoClose={false} draggable />
			</div>
			<div className="mt-6 text-center">
				<p>
					Уже есть аккаунт?{" "}
					<Link to="/auth/login" className="text-primary">
						Войти
					</Link>
				</p>
			</div>
		</form>
	);
};

export default ModeratorSignupForm;
