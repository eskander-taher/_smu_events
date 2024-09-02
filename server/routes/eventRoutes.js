const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware  = require("../middleware/authMiddleware")

// Create a new event
router.post('/events', eventController.createEvent);

// Update an event by id
router.put('/events/:id', eventController.updateEventById);

// Get all events
router.get('/events', eventController.getAllEvents);

// Get all events
router.get('/public-events', eventController.getPublicEvents);

// Get a single event by id
router.get('/events/:id', eventController.getEventById);

// Update a single event status by id
router.put('/events/:id/:status', authMiddleware("админ"), eventController.updateEventStatus);

// Delete an event by id
router.delete('/events/:id', eventController.deleteEventById);

module.exports = router;
