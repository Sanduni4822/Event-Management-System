const eventService = require('../services/eventService');

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (err) {
    console.error('Failed to fetch events:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get single event
exports.getEventById = async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Create new event
exports.createEvent = async (req, res) => {
  const { name, description, date, location, created_by, capacity, tags } = req.body;
  if (!name || !date || !location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const eventId = await eventService.createEvent({ name, description, date, location, created_by, capacity, tags });
    res.status(201).json({ message: 'Event created', eventId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const affectedRows = await eventService.updateEvent(req.params.id, req.body);
    if (affectedRows === 0) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const affectedRows = await eventService.deleteEvent(req.params.id);
    if (affectedRows === 0) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

// Register attendee
exports.registerAttendee = async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const message = await eventService.registerAttendee(id, name, email);
    res.status(201).json({ message });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Registration failed' });
  }
};

// Get attendees
exports.getAttendeesForEvent = async (req, res) => {
  try {
    const attendees = await eventService.getAttendeesForEvent(req.params.id);
    res.json(attendees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attendees' });
  }
};

// Event analytics
exports.getEventAnalytics = async (req, res) => {
  try {
    const data = await eventService.getAnalyticsData();
    res.json(data);
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};
