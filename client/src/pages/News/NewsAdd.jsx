import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Title from "../../components/Title";
import RichEditor from "../../components/RichEditor";
import useCreateNews from "../../api/news/useCreateNews";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";

const NewsAdd = () => {
	const { user } = useAuth();
	const [data, setData] = useState({
		title: "",
		content: "",
		createdBy: user?.id,
	});

	const { mutate, error, isLoading } = useCreateNews();

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		mutate(data, {
			onSuccess: () => {
				setData({
					title: "",
					content: "",
					createdBy: user?.id,
				});
				toast.success("Новости успешно созданы");
			},
			onError: (error) => {
				console.log(error);
				toast.error("Не удалось создать новость");
			},
		});
	};

	return (
		<DefaultLayout>
			<Title>Добавить новость</Title>
			<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
				<div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
					<h3 className="font-medium text-black dark:text-white">Форма новости</h3>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="p-6.5">
						<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
							<div className="w-full">
								<label className="mb-2.5 block text-black dark:text-white">
									Заголовок
								</label>
								<input
									type="text"
									placeholder="Введите заголовок"
									name="title"
									value={data.title}
									onChange={handleChange}
									className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
								/>
							</div>
						</div>

						<div className="mb-6">
							<label className="mb-2.5 block text-black dark:text-white">
								Содержание
							</label>
							<RichEditor
								description={data.content}
								setDescription={(content) => setData({ ...data, content })}
							/>
						</div>
						<button
							type="submit"
							className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
						>
							Сохранить и отправить
						</button>
					</div>
				</form>
			</div>
			<ToastContainer position="top-center" autoClose={false} draggable />
		</DefaultLayout>
	);
};

export default NewsAdd;
