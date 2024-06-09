const News = require("../models/newsModel"); // Assuming the model file is named newsModel.js
const { z } = require("zod");

// Define the schema for validation using Zod
const newsSchema = z.object({
	title: z.string().trim().min(1, "Title is required"),
	content: z.string().trim().min(1, "content is required"),
	createdBy: z.string(),
});

// Create a news item
const createNews = async (req, res) => {
	console.log(req.body);
	try {
		const validatedData = newsSchema.parse(req.body);
		const news = new News(validatedData);
		await news.save();
		res.status(201).json(news);
	} catch (error) {
		if (error instanceof z.ZodError) {
			res.status(400).json({ errors: error.errors });
		} else {
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
};

// Get all news items
const getNews = async (req, res) => {
	try {
		const news = await News.find().populate("createdBy", "name");
		res.status(200).json(news);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Get a single news item by ID
const getNewsById = async (req, res) => {
	try {
		const news = await News.findById(req.params.id).populate("createdBy", "name");
		if (!news) {
			return res.status(404).json({ error: "News item not found" });
		}
		res.status(200).json(news);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Update a news item
const updateNews = async (req, res) => {
	try {
		const validatedData = newsSchema.parse(req.body);
		const news = await News.findByIdAndUpdate(req.params.id, validatedData, {
			new: true,
			runValidators: true,
		});
		if (!news) {
			return res.status(404).json({ error: "News item not found" });
		}
		res.status(200).json(news);
	} catch (error) {
		if (error instanceof z.ZodError) {
			res.status(400).json({ errors: error.errors });
		} else {
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
};

// Delete a news item
const deleteNews = async (req, res) => {
	try {
		const news = await News.findByIdAndDelete(req.params.id);
		if (!news) {
			return res.status(404).json({ error: "News item not found" });
		}
		res.status(200).json({ message: "News item deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	createNews,
	getNews,
	getNewsById,
	updateNews,
	deleteNews,
};
