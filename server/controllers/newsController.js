const News = require("../models/newsModel");

// Helper function for validation
const validateNewsData = (data) => {
  const errors = [];
  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push({ message: "Title is required" });
  }
  if (!data.content || typeof data.content !== 'string' || data.content.trim().length === 0) {
    errors.push({ message: "Content is required" });
  }
  return errors;
};

// Create a news item
const createNews = async (req, res) => {
  console.log(req.body);
  try {
    const errors = validateNewsData(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Ошибка валидации данных",
        error: errors
      });
    }
    const news = new News(req.body);
    await news.save();
    res.status(201).json({
      success: true,
      message: "Новость успешно создана",
      data: news
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    res.status(500).json({
      success: false,
      message: "Внутренняя ошибка сервера",
      error: error.message
    });
  }
};

// Get all news items
const getNews = async (req, res) => {
  try {
    const news = await News.find().populate("createdBy", "name");
    res.status(200).json({
      success: true,
      message: "Новости успешно получены",
      data: news
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    res.status(500).json({
      success: false,
      message: "Внутренняя ошибка сервера",
      error: error.message
    });
  }
};

// Get a single news item by ID
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate("createdBy", "name");
    if (!news) {
      return res.status(404).json({
        success: false,
        message: "Новость не найдена"
      });
    }
    res.status(200).json({
      success: true,
      message: "Новость успешно получена",
      data: news
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    res.status(500).json({
      success: false,
      message: "Внутренняя ошибка сервера",
      error: error.message
    });
  }
};

// Update a news item
const updateNews = async (req, res) => {
  try {
    const errors = validateNewsData(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Ошибка валидации данных",
        error: errors
      });
    }

    const news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "Новость не найдена"
      });
    }

    res.status(200).json({
      success: true,
      message: "Новость успешно обновлена",
      data: news
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    res.status(500).json({
      success: false,
      message: "Внутренняя ошибка сервера",
      error: error.message
    });
  }
};

// Delete a news item
const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: "Новость не найдена"
      });
    }
    res.status(200).json({
      success: true,
      message: "Новость успешно удалена"
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    res.status(500).json({
      success: false,
      message: "Внутренняя ошибка сервера",
      error: error.message
    });
  }
};

module.exports = {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
};
