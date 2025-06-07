const db = require('../config/db');

// Get all events
exports.getAllEvents = async () => {
  const [events] = await db.query('SELECT * FROM events ORDER BY id ASC');
  return events;
};

// Get single event
exports.getEventById = async (id) => {
  const [rows] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
  return rows[0];
};

// Create event
exports.createEvent = async ({ name, description, date, location, created_by, capacity, tags }) => {
  const [result] = await db.query(
    'INSERT INTO events (name, description, date, location, created_by, capacity, tags) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, description, date, location, created_by, capacity, tags]
  );
  return result.insertId;
};

// Update event
exports.updateEvent = async (id, data) => {
  const { name, description, date, location, created_by, capacity, tags } = data;
  const [result] = await db.query(
    'UPDATE events SET name=?, description=?, date=?, location=?, created_by=?, capacity=?, tags=? WHERE id=?',
    [name, description, date, location, created_by, capacity, tags, id]
  );
  return result.affectedRows;
};

// Delete event
exports.deleteEvent = async (id) => {
  const [result] = await db.query('DELETE FROM events WHERE id = ?', [id]);
  return result.affectedRows;
};

// Register attendee
exports.registerAttendee = async (eventId, name, email) => {
  const [eventRows] = await db.query('SELECT * FROM events WHERE id = ?', [eventId]);
  if (eventRows.length === 0) throw new Error('Event not found');

  const event = eventRows[0];
  const [attendees] = await db.query('SELECT COUNT(*) AS count FROM attendees WHERE event_id = ?', [eventId]);

  if (attendees[0].count >= event.capacity) {
    throw new Error('Event is full');
  }

  await db.query('INSERT INTO attendees (event_id, name, email) VALUES (?, ?, ?)', [eventId, name, email]);
  return 'Attendee registered';
};

// Get attendees
exports.getAttendeesForEvent = async (eventId) => {
  const [attendees] = await db.query('SELECT name, email FROM attendees WHERE event_id = ?', [eventId]);
  return attendees;
};

// Analytics
exports.getAnalyticsData = async () => {
  const [events] = await db.query('SELECT id, capacity FROM events');
  const [attendeeResult] = await db.query('SELECT COUNT(*) AS totalAttendees FROM attendees');

  return {
    totalEvents: events.length,
    totalCapacity: events.reduce((sum, e) => sum + e.capacity, 0),
    totalAttendees: attendeeResult[0].totalAttendees
  };
};
