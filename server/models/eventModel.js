const db = require('../config/db');

// Get all events
exports.getAllEvents = async () => {
  const [events] = await db.query('SELECT * FROM events ORDER BY created_at DESC');
  return events;
};

// Get event by ID
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
exports.updateEvent = async (id, { name, description, date, location, created_by, capacity, tags }) => {
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

// Get total attendees for an event
exports.getAttendeeCount = async (eventId) => {
  const [rows] = await db.query('SELECT COUNT(*) AS count FROM attendees WHERE event_id = ?', [eventId]);
  return rows[0].count;
};

// Register attendee
exports.registerAttendee = async (eventId, name, email) => {
  const [result] = await db.query(
    'INSERT INTO attendees (event_id, name, email) VALUES (?, ?, ?)',
    [eventId, name, email]
  );
  return result.insertId;
};

// Get attendees by event ID
exports.getAttendeesForEvent = async (eventId) => {
  const [rows] = await db.query('SELECT name, email FROM attendees WHERE event_id = ?', [eventId]);
  return rows;
};

// Analytics data
exports.getAnalyticsData = async () => {
  const [events] = await db.query('SELECT id, capacity FROM events');
  const [attendeeResult] = await db.query('SELECT COUNT(*) AS totalAttendees FROM attendees');
  return {
    totalEvents: events.length,
    totalCapacity: events.reduce((sum, e) => sum + e.capacity, 0),
    totalAttendees: attendeeResult[0].totalAttendees
  };
};
