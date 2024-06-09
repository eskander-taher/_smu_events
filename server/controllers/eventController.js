const mongoose = require("mongoose");
const Event = require("../models/eventModel");
const Section = require("../models/sectionModel");
const { z } = require("zod");

const eventSchema = z.object({
	name: z.string().min(1),
	description: z.string().optional(),
	status: z.enum(["draft", "upcoming", "ongoing", "finished"]).optional(),
	createdBy: z.string(),
});

exports.createEvent = async (req, res) => {
	const data = req.body;

	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const event = new Event({
			name: data.name,
			description: data.description,
			status: data.status || "draft",
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
		res.json(savedEvent);
	} catch (error) {
		await session.abortTransaction();
		res.status(500).json({
			error: "An error occurred while creating the event.",
			details: error.message,
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
			return res.status(404).json({ error: "Event not found." });
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
						return res
							.status(404)
							.json({ error: `Section not found: ${sectionData._id}` });
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
		res.json(savedEvent);
	} catch (error) {
		await session.abortTransaction();
		res.status(500).json({
			error: "An error occurred while updating the event.",
			details: error.message,
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
		res.status(200).json(events);
	} catch (error) {
		res.status(500).json({ error: error.message });
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
			return res.status(404).json({ error: "Event not found" });
		}
		res.status(200).json(event);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateEventStatus = async (req, res) => {
	try {
	  const { id, status } = req.params;
  
	  // Validate the new status
	  const allowedStatuses = ["draft", "upcoming", "ongoing", "finished"];
	  if (!allowedStatuses.includes(status)) {
		return res.status(400).json({ error: "Invalid status value" });
	  }
  
	  const event = await Event.findById(id);
	  if (!event) {
		return res.status(404).json({ error: "Event not found" });
	  }
  
	  event.status = status;
	  await event.save();
  
	  res.status(200).json({ message: "Event status updated successfully", event });
	} catch (error) {
	  res.status(500).json({ error: error.message });
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
			return res.status(404).json({ error: "Event not found" });
		}

		await Section.deleteMany({ event: event._id }, { session });
		await event.remove({ session });

		await session.commitTransaction();
		session.endSession();

		res.status(200).json({ message: "Event and associated sections deleted" });
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		res.status(500).json({ error: error.message });
	}
};
