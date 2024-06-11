const mongoose = require("mongoose");
const Event = require("../models/eventModel");
const Section = require("../models/sectionModel");

exports.createEvent = async (req, res) => {
	const data = req.body;

	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const event = new Event({
			name: data.name,
			description: data.description,
			status: data.status || "черновик",
			createdBy: data.createdBy,
		});

		const savedEvent = await event.save({ session });

		// Array to hold the created sections
		const savedSections = [];

		// Create each section
		if (data.sections && data.sections.length > 0) {
			for (const sectionData of data.sections) {
				const section = new Section({
					name: sectionData.name,
					order: sectionData.order,
					mod: sectionData.mod,
					event: savedEvent._id,
				});

				const savedSection = await section.save({ session });
				savedSections.push(savedSection._id);
			}
		}

		// Update the event with all section references
		savedEvent.sections = savedSections;
		await savedEvent.save({ session });

		await session.commitTransaction();
		res.json({
			success: true,
			message: "Мероприятие успешно создано",
			data: savedEvent,
		});
	} catch (error) {
		await session.abortTransaction();
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при создании Мероприятия.",
			error: error.message,
		});
	} finally {
		session.endSession();
	}
};

exports.updateEventById = async (req, res) => {
	const Id = req.params.id;
	const data = req.body;

	console.log(data);

	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		// Find the event by ID
		const event = await Event.findById(Id).session(session);

		if (!event) {
			await session.abortTransaction();
			return res.status(404).json({
				success: false,
				message: "Мероприятие не найдено.",
			});
		}

		// Update event fields
		event.name = data.name || event.name;
		event.description = data.description || event.description;
		event.status = data.status || event.status;
		event.createdBy = data.createdBy || event.createdBy;

		// Array to hold the updated sections
		const updatedSections = [];

		// Update or create sections
		if (data.sections && data.sections.length > 0) {
			for (const sectionData of data.sections) {
				let section;
				if (sectionData._id) {
					// Update existing section
					section = await Section.findById(sectionData._id).session(session);
					if (section) {
						section.name = sectionData.name || section.name;
						section.order = sectionData.order || section.order;
						section.mod = sectionData.mod || section.mod;
					} else {
						// If section ID is provided but not found, abort transaction
						await session.abortTransaction();
						return res.status(404).json({
							success: false,
							message: `Раздел не найден: ${sectionData._id}`,
						});
					}
				} else {
					// Create new section
					section = new Section({
						name: sectionData.name,
						order: sectionData.order,
						mod: sectionData.mod,
						event: event._id,
					});
				}

				const savedSection = await section.save({ session });
				updatedSections.push(savedSection._id);
			}
		}

		// Update the event with all section references
		event.sections = updatedSections;
		const savedEvent = await event.save({ session });

		await session.commitTransaction();
		res.json({
			success: true,
			message: "Мероприятие успешно обновлено",
			data: savedEvent,
		});
	} catch (error) {
		await session.abortTransaction();
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при обновлении Мероприятия.",
			error: error.message,
		});
	} finally {
		session.endSession();
	}
};

exports.getAllEvents = async (req, res) => {
	try {
		const events = await Event.find()
			.populate({
				path: "sections",
				populate: { path: "mod" }, // Populate the mods within each section
			})
			.populate("createdBy") // Populate the createdBy field
			.exec();
		res.status(200).json({
			success: true,
			message: "Мероприятия успешно получены",
			data: events,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при получении Мероприятий",
			error: error.message,
		});
	}
};
exports.getPublicEvents = async (req, res) => {
	try {
		const events = await Event.find({ status: { $ne: "черновик" } })
			.populate({
				path: "sections",
				populate: { path: "mod" }, // Populate the mods within each section
			})
			.populate("createdBy") // Populate the createdBy field
			.exec();
		res.status(200).json({
			success: true,
			message: "Мероприятия успешно получены",
			data: events,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при получении Мероприятий",
			error: error.message,
		});
	}
};

exports.getEventById = async (req, res) => {
	try {
		const event = await Event.findById(req.params.id)
			.populate({
				path: "sections",
				populate: { path: "mod" },
			})
			.exec();
		if (!event) {
			return res.status(404).json({
				success: false,
				message: "Мероприятие не найдено",
			});
		}
		res.status(200).json({
			success: true,
			message: "Мероприятие успешно получено",
			data: event,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при получении Мероприятия",
			error: error.message,
		});
	}
};

exports.updateEventStatus = async (req, res) => {
	try {
		const { id, status } = req.params;

		// Validate the new status
		const allowedStatuses = ["черновик", "предстоящий", "идет", "проверка заявок", "завершен"];
		if (!allowedStatuses.includes(status)) {
			return res.status(400).json({
				success: false,
				message: "Неверное значение статуса",
			});
		}

		const event = await Event.findById(id);
		if (!event) {
			return res.status(404).json({
				success: false,
				message: "Мероприятие не найдено",
			});
		}

		event.status = status;
		await event.save();

		res.status(200).json({
			success: true,
			message: "Статус Мероприятия успешно обновлен",
			data: event,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при обновлении статуса Мероприятия",
			error: error.message,
		});
	}
};

exports.deleteEventById = async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const event = await Event.findById(req.params.id).exec();
		if (!event) {
			await session.abortTransaction();
			session.endSession();
			return res.status(404).json({
				success: false,
				message: "Мероприятие не найдено",
			});
		}

		await Section.deleteMany({ event: event._id }, { session });
		await Event.deleteOne({ _id: req.params.id }, { session });
		await session.commitTransaction();
		session.endSession();

		res.status(200).json({
			success: true,
			message: "Мероприятие и связанные разделы удалены",
		});
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при удалении Мероприятия",
			error: error.message,
		});
	}
};

