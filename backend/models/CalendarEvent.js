const mongoose = require('mongoose');

const CalendarEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

const CalendarEvent = mongoose.model('CalendarEvent', CalendarEventSchema);

module.exports = CalendarEvent;
