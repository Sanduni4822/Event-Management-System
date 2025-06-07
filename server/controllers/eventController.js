const db = require('../config/db');

// Get all events - ordered by ID ASC
exports.getAllEvents = async (req, res) => {
  try {
    const [events] = await db.query('SELECT * FROM events ORDER BY id ASC');
    res.json(events);
  } catch (err) {
    console.error('Failed to fetch events:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get single event
exports.getEventById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Create new event
exports.createEvent = async (req, res) => {
  const { name, description, date, location, created_by, capacity, tags } = req.body;
  if (!name || !date || !location) return res.status(400).json({ error: 'Missing required fields' });

  try {
    const [result] = await db.query(
      'INSERT INTO events (name, description, date, location, created_by, capacity, tags) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, date, location, created_by, capacity, tags]
    );
    res.status(201).json({ message: 'Event created', eventId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  const { name, description, date, location, created_by, capacity, tags } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE events SET name=?, description=?, date=?, location=?, created_by=?, capacity=?, tags=? WHERE id=?',
      [name, description, date, location, created_by, capacity, tags, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Event not found' });

    res.json({ message: 'Event updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM events WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Event not found' });

    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

// Register attendee
exports.registerAttendee = async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

  try {
    const [eventRows] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    if (eventRows.length === 0) return res.status(404).json({ error: 'Event not found' });

    const event = eventRows[0];
    const [attendees] = await db.query('SELECT COUNT(*) AS count FROM attendees WHERE event_id = ?', [id]);

    if (attendees[0].count >= event.capacity) {
      return res.status(400).json({ error: 'Event is full' });
    }

    await db.query('INSERT INTO attendees (event_id, name, email) VALUES (?, ?, ?)', [id, name, email]);
    res.status(201).json({ message: 'Attendee registered' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Get attendees for an event
exports.getAttendeesForEvent = async (req, res) => {
  try {
    const [attendees] = await db.query('SELECT name, email FROM attendees WHERE event_id = ?', [req.params.id]);
    res.json(attendees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attendees' });
  }
};

// Event Analytics
exports.getEventAnalytics = async (req, res) => {
  try {
    const [events] = await db.query('SELECT id, capacity FROM events');
    const totalEvents = events.length;
    const totalCapacity = events.reduce((sum, e) => sum + e.capacity, 0);

    const [attendeeResult] = await db.query('SELECT COUNT(*) AS totalAttendees FROM attendees');
    const totalAttendees = attendeeResult[0].totalAttendees;

    res.json({
      totalEvents,
      totalAttendees,
      totalCapacity
    });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};
