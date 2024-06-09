import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import RichEditor from "../../components/RichEditor";
import useCreateEvent from "../../api/events/useCreateEvent";
import useAuth from "../../hooks/useAuth";
import useListModerators from "../../api/moderators/useListModerators";

const AddEvent = () => {
	const { user } = useAuth();
	const [eventData, setEventData] = useState({
		name: "",
		description: "",
		sections: [{ order: "", name: "", mod: "" }],
	});

	const { mutate, isLoading } = useCreateEvent();
	const { data: mods, isLoading: isModsLoading } = useListModerators();

	const handleEventChange = (field, value) => {
		setEventData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSectionChange = (index, field, value) => {
		const newSections = eventData.sections.map((section, i) =>
			i === index ? { ...section, [field]: value } : section
		);
		setEventData((prev) => ({ ...prev, sections: newSections }));
	};

	const addSection = () => {
		setEventData((prev) => ({
			...prev,
			sections: [...prev.sections, { order: "", name: "", mod: "" }],
		}));
	};

	const removeSection = (index) => {
		setEventData((prev) => ({
			...prev,
			sections: prev.sections.filter((_, i) => i !== index),
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const payload = {
			name: eventData.name,
			description: eventData.description,
			createdBy: user.id,
			sections: eventData.sections.map((section) => ({
				order: parseFloat(section.order),
				name: section.name,
				mod: section.mod,
			})),
		};

		mutate(payload, {
			onSuccess: () => {
				setEventData({
					name: "",
					description: "",
					sections: [{ order: "", name: "", mod: "" }],
				});
			},
		});
	};

	return (
		<DefaultLayout>
			<Breadcrumb pageName="Add Event" />
			<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
				<div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
					<h3 className="font-medium text-black dark:text-white">Event Form</h3>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="p-6.5">
						<div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
							<div className="w-full">
								<label className="mb-2.5 block text-black dark:text-white">
									Event name
								</label>
								<input
									type="text"
									placeholder="Enter event name"
									value={eventData.name}
									onChange={(e) => handleEventChange("name", e.target.value)}
									className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
								/>
							</div>
						</div>

						{eventData.sections.map((section, index) => (
							<div
								key={index}
								className="mb-4.5 flex flex-col gap-6 xl:flex-row align-middle justify-center"
							>
								<div className="w-full xl:w-1/6">
									<label className="mb-2.5 block text-black dark:text-white">
										Section Number
									</label>
									<input
										type="text"
										placeholder="Enter section number"
										value={section.order}
										onChange={(e) =>
											handleSectionChange(index, "order", e.target.value)
										}
										className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
									/>
								</div>
								<div className="w-full xl:w-1/3">
									<label className="mb-2.5 block text-black dark:text-white">
										Section name
									</label>
									<input
										type="text"
										placeholder="Enter section name"
										value={section.name}
										onChange={(e) =>
											handleSectionChange(index, "name", e.target.value)
										}
										className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
									/>
								</div>
								<div className="w-full xl:w-1/3">
									<label className="mb-2.5 block text-black dark:text-white">
										Moderator name
									</label>
									<div className="relative z-20 bg-white dark:bg-form-input">
										<select
											value={section.mod}
											name="participantStatus"
											onChange={(e) =>
												handleSectionChange(index, "mod", e.target.value)
											}
											className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
												section.mod ? "text-black dark:text-white" : ""
											}`}
										>
											<option
												value=""
												disabled
												className="text-body dark:text-bodydark"
											>
												Select Status
											</option>
											{isModsLoading ? (
												<></>
											) : (
												mods.data.data.map((mod) => (
													<option
														key={mod._id}
														value={mod._id}
														className="text-body dark:text-bodydark"
													>
														{mod.firstName}
													</option>
												))
											)}
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
														fill="#17191a"
													></path>
												</g>
											</svg>
										</span>
									</div>
								</div>
								<button
									type="button"
									onClick={() => removeSection(index)}
									className="py-2 px-3 mt-7 flex h-10 w-full items-center justify-center rounded bg-red-500 text-white hover:bg-red-600 xl:w-auto"
								>
									Remove
								</button>
							</div>
						))}

						<button
							type="button"
							onClick={addSection}
							className="mb-4 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
						>
							Add Section
						</button>

						<div className="mb-6">
							<label className="mb-2.5 block text-black dark:text-white">
								Description
							</label>
							<RichEditor
								description={eventData.description}
								setDescription={(value) => handleEventChange("description", value)}
							/>
						</div>

						<div className="mb-5">
							<input
								type="submit"
								onClick={handleSubmit}
								disabled={isLoading}
								value={isLoading ? "Loading" : "Save and Submit"}
								className={`w-full  rounded-lg border border-primary  p-4 text-white transition ${
									isLoading
										? " bg-slate-500"
										: "bg-primary cursor-pointer hover:bg-opacity-90"
								}`}
							/>
						</div>
					</div>
				</form>
			</div>
		</DefaultLayout>
	);
};

export default AddEvent;
