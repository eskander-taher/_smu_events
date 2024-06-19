import DefaultLayout from "../layout/DefaultLayout";
import Title from "../components/Title";
import { FiEdit } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineUpload } from "react-icons/ai";

const Settings = () => {
	return (
		<DefaultLayout>
			<div className="mx-auto max-w-270">
				<Title>Настройки</Title>

				<div className="grid grid-cols-5 gap-8">
					<div className="col-span-5 xl:col-span-3">
						<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
							<div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
								<h3 className="font-medium text-black dark:text-white">
									Персональная информация
								</h3>
							</div>
							<div className="p-7">
								<form action="#">
									<div className="mb-5.5">
										<label
											className="mb-3 block text-sm font-medium text-black dark:text-white"
											htmlFor="Username"
										>
											Био
										</label>
										<div className="relative">
											<span className="absolute left-4.5 top-4">
												<FiEdit />
											</span>

											<textarea
												className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
												name="bio"
												id="bio"
												rows={6}
												placeholder="Напишите вашу биографию здесь"
												defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet."
											></textarea>
										</div>
									</div>

									<div className="flex justify-end gap-4.5">
										<button
											className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
											type="submit"
										>
											Отмена
										</button>
										<button
											className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
											type="submit"
										>
											Сохранить
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="col-span-5 xl:col-span-2">
						<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
							<div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
								<h3 className="font-medium text-black dark:text-white">
									Ваше фото
								</h3>
							</div>
							<div className="p-7">
								<form action="#">
									<div className="mb-4 flex items-center gap-3">
										<div className="h-14 w-14 rounded-full">
											<CgProfile className="h-12 w-12" />
										</div>
										<div>
											<span className="mb-1.5 text-black dark:text-white">
												Редактировать фото
											</span>
											<span className="flex gap-2.5">
												<button className="text-sm hover:text-primary">
													Удалить
												</button>
												<button className="text-sm hover:text-primary">
													Обновить
												</button>
											</span>
										</div>
									</div>

									<div
										id="FileUpload"
										className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
									>
										<input
											type="file"
											accept="image/*"
											className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
										/>
										<div className="flex flex-col items-center justify-center space-y-3">
											<span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
												<AiOutlineUpload />
											</span>
											<p>
												<span className="text-primary">
													Кликните для загрузки
												</span>{" "}
												или перетащите файлы сюда
											</p>
											<p className="mt-1.5">SVG, PNG, JPG или GIF</p>
											<p>(макс. 800 X 800px)</p>
										</div>
									</div>

									<div className="flex justify-end gap-4.5">
										<button
											className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
											type="submit"
										>
											Отмена
										</button>
										<button
											className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
											type="submit"
										>
											Сохранить
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default Settings;
