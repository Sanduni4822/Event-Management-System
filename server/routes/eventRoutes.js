const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Event routes
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

// Attendees
router.post('/:id/register', eventController.registerAttendee);
router.get('/:id/attendees', eventController.getAttendeesForEvent);

// NEW: Event Analytics
router.get('/analytics', eventController.getEventAnalytics);

module.exports = router;
