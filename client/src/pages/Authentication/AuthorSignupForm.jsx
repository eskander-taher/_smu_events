import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import {
	MdOutlineMailOutline,
	MdOutlinePersonOutline,
	MdOutlinePhoneEnabled,
} from "react-icons/md";
import { IoBookOutline, IoPersonOutline } from "react-icons/io5";
import { PiPassword } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import useRegisterAuthor from "../../api/auth/useRegisterAuthor";
import { LiaCitySolid, LiaUniversitySolid } from "react-icons/lia";
import { MdClass, MdGroup } from "react-icons/md";
 
const formFields = {
	lastName: "",
	firstName: "",
	middleName: "",
	dateOfBirth: "",
	email: "",
	phoneNumber: "",
	password: "",
	authorStatus: "",
	city: "",
	region: "",
	university: "",
	faculty: "",
	department: "",
};

const StatusEnum = ["Молодой ученый", "Специалитет", "Бакалавриат", "Магистрант", "Аспирант"];

const AuthorSignupForm = () => {
	const [data, setData] = useState({ ...formFields });
	const { mutate, isLoading } = useRegisterAuthor();

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const requiredFields = [
			"lastName",
			"firstName",
			"email",
			"password",
			"university",
			"faculty",
			"department",
			"authorStatus",
		];

		const isEmpty = requiredFields.some((field) => !data[field]);
		if (isEmpty) {
			toast.error("Пожалуйста, заполните все обязательные поля.");
			return;
		}
		console.log(data);
		mutate(data, {
			onSuccess: (data) => {
				setData({ ...formFields });
				toast.success(data.data.message);
				console.log(data);
			},
			onError: (error) => {
				console.log(error);
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
					Отчество *
				</label>
				<div className="relative">
					<input
						required
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
						required
						type="email"
						name="email"
						value={data.email}
						onChange={handleChange}
						placeholder="Введите ваш email"
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
						required
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
			<div className="mb-6">
				<label className="mb-2.5 block font-medium text-black dark:text-white">
					Номер телефона *
				</label>
				<div className="relative">
					<input
						required
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
					Дата рождения *
				</label>
				<div className="relative">
					<input
						required
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
					Университет *
				</label>
				<div className="relative">
					<input
						required
						type="text"
						name="university"
						value={data.university}
						onChange={handleChange}
						placeholder="Введите ваш университет"
						className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
					/>
					<span className="absolute right-4 top-4">
						<LiaUniversitySolid />
					</span>
				</div>
			</div>
			<div className="mb-6">
				<label className="mb-2.5 block font-medium text-black dark:text-white">
					Факультет *
				</label>
				<div className="relative">
					<input
						required
						type="text"
						name="faculty"
						value={data.faculty}
						onChange={handleChange}
						placeholder="Введите ваш факультет"
						className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
					/>
					<span className="absolute right-4 top-4">
						<MdClass />
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
						<MdClass />
					</span>
				</div>
			</div>

			<div className="mb-6">
				<label className="mb-2.5 block font-medium text-black dark:text-white">
					Статус участника *
				</label>
				<div className="relative">
					<select
						required
						name="authorStatus"
						value={data.authorStatus}
						onChange={handleChange}
						className="w-full appearance-none rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
					>
						<option value="">Выберите статус</option>
						{StatusEnum.map((status) => (
							<option key={status} value={status}>
								{status}
							</option>
						))}
					</select>
					<span className="absolute right-4 top-4">
						<MdOutlinePersonOutline />
					</span>
				</div>
			</div>
			<div className="mb-6">
				<label className="mb-2.5 block font-medium text-black dark:text-white">
					Регион *
				</label>
				<div className="relative">
					<input
						required
						type="text"
						name="region"
						value={data.region}
						onChange={handleChange}
						placeholder="Введите ваш регион"
						className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
					/>
					<span className="absolute right-4 top-4">
						<LiaCitySolid />
					</span>
				</div>
			</div>
			<div className="mb-6">
				<label className="mb-2.5 block font-medium text-black dark:text-white">
					Город *
				</label>
				<div className="relative">
					<input
						required
						type="text"
						name="city"
						value={data.city}
						onChange={handleChange}
						placeholder="Введите ваш город"
						className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
					/>
					<span className="absolute right-4 top-4">
						<LiaCitySolid />
					</span>
				</div>
			</div>

			<button
				className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-gray"
				onClick={handleSubmit}
			>
				{isLoading ? "Загрузка..." : "Регистрация"}
			</button>
			<div className="mt-6 text-center">
				<p>
					Уже есть аккаунт?{" "}
					<Link to="/author/login" className="text-primary">
						Войти
					</Link>
				</p>
			</div>
			<ToastContainer position="top-center" autoClose={false} draggable />
		</form>
	);
};

export default AuthorSignupForm;
