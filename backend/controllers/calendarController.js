const CalendarEvent = require('../models/CalendarEvent');
const asyncHandler = require('../utils/asyncHandler');

// Get all events
exports.getAllEvents = asyncHandler(async (req, res) => {
  const events = await CalendarEvent.find();
  res.json(events);
});

// Create a new event
exports.createEvent = asyncHandler(async (req, res) => {
  const { title, start, end } = req.body;

  if (!title || !start || !end) {
    return res.status(400).json({ message: 'Title, start date, and end date are required.' });
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

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

// Update an event
exports.updateEvent = asyncHandler(async (req, res) => {
  const { title, start, end } = req.body;
  const updatedData = {};

  if (title) updatedData.title = title;
  if (start) updatedData.start = new Date(start);
  if (end) updatedData.end = new Date(end);

  const updatedEvent = await CalendarEvent.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  
  if (!updatedEvent) {
    return res.status(404).json({ message: 'Event not found' });
  }

  res.json(updatedEvent);
});

// Delete an event
exports.deleteEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(400).json({ message: 'Invalid event ID format.' });
  }

  const deletedEvent = await CalendarEvent.findByIdAndDelete(eventId);
  if (!deletedEvent) {
    return res.status(404).json({ message: 'Event not found' });
  }

  res.status(204).send();
});
