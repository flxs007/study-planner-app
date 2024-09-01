
const CalendarEvent = require('../models/CalendarEvent'); 

exports.getAllEvents = async (req, res) => {
  try {
    const events = await CalendarEvent.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving events' });
  }
};

exports.createEvent = async (req, res) => {
    const newEvent = new CalendarEvent(req.body);
    try {
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      res.status(400).json({ message: 'Error creating event', error: error.message }); 
    }
  };

exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await CalendarEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    res.status(404).json({ message: 'Event not found' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await CalendarEvent.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: 'Event not found' });
  }
};