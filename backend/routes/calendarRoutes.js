
const express = require('express');
const router = express.Router();
const CalendarController = require('../controllers/calendarController');

// Get all calendar events
router.get('/', CalendarController.getAllEvents);  // Retrieve all events

// Create a new calendar event
router.post('/', CalendarController.createEvent);   // Create a new event

// Update an existing calendar event
router.put('/:id', CalendarController.updateEvent);  // Update event by ID

// Delete a calendar event
router.delete('/:id', CalendarController.deleteEvent); // Delete event by ID

module.exports = router;