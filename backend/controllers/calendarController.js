const CalendarEvent = require('../models/CalendarEvent');
const mongoose = require('mongoose');

// Middleware to handle async errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

exports.getAllEvents = asyncHandler(async (req, res) => {
  const events = await CalendarEvent.find();
  res.json(events);
});

exports.createEvent = asyncHandler(async (req, res) => {
  const { title, start, end } = req.body;

  if (!title || !start || !end) {
    return res.status(400).json({ message: 'Title, start date, and end date are required.' });
  }

  const parseDate = (dateString) => {
    const dateParts = dateString.split('T'); 
    const dateOnly = dateParts[0]; // Get the date part
    const timeOnly = dateParts[1] ? dateParts[1] : ''; // Get the time part or empty string if not provided

   
    if (timeOnly === '') {
      return new Date(`${dateOnly}T00:00:00Z`); // Midnight of the provided date
    } else {
      return new Date(`${dateOnly}T${timeOnly}`); // Full date with time
    }
  };

  const startDate = parseDate(start);
  const endDate = parseDate(end);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).json({ message: 'Invalid date format for start or end.' });
  }

  if (endDate <= startDate) {
    return res.status(400).json({ message: 'End date must be after start date.' });
  }

  const newEvent = new CalendarEvent({ title, start: startDate, end: endDate });

  const savedEvent = await newEvent.save();
  res.status(201).json(savedEvent);
});

exports.updateEvent = asyncHandler(async (req, res) => {
  const { title, start, end } = req.body;
  const updatedData = {};

  if (title) updatedData.title = title;
  if (start) {
    const startDate = new Date(start);
    if (isNaN(startDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format for start.' });
    }
    updatedData.start = startDate;
  }
  if (end) {
    const endDate = new Date(end);
    if (isNaN(endDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format for end.' });
    }
    updatedData.end = endDate;
  }

  const updatedEvent = await CalendarEvent.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  
  if (!updatedEvent) {
    return res.status(404).json({ message: 'Event not found' });
  }

  res.json(updatedEvent);
});

exports.deleteEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.id;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(400).json({ message: 'Invalid event ID format.' });
  }

  const deletedEvent = await CalendarEvent.findByIdAndDelete(eventId);
  if (!deletedEvent) {
    return res.status(404).json({ message: 'Event not found' });
  }

  res.status(204).send();
});
