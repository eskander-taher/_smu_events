const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Define routes
router.post('/news', newsController.createNews);
router.get('/news', newsController.getNews);
router.get('/news/:id', newsController.getNewsById);
router.put('/news/:id', newsController.updateNews);
router.delete('/news/:id', newsController.deleteNews);

module.exports = router;
