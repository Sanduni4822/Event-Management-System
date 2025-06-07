import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../components/Table';
import { getEventById, getAttendeesForEvent } from '../services/eventService';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventRes = await getEventById(id);
        const attendeeRes = await getAttendeesForEvent(id);
        setEvent(eventRes.data);
        setAttendees(attendeeRes.data);
      } catch (err) {
        console.error('Failed to fetch details', err);
      }
    };
    fetchData();
  }, [id]);

  if (!event) return <p className="p-6">Loading event details...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{event.name}</h1>
      <p className="mb-1">Location: {event.location}</p>
      <p className="mb-1">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="mb-1">Created by: {event.created_by}</p>
      <p className="mb-1">Capacity: {event.capacity} | Remaining: {event.remaining_capacity}</p>
      <p className="mb-4">Tags: {event.tags}</p>

      <h2 className="text-xl font-semibold mb-2 mt-6">Attendees</h2>
      {attendees.length > 0 ? (
        <Table
          columns={['Name', 'Email']}
          data={attendees.map((a) => ({ Name: a.name, Email: a.email }))}
        />
      ) : (
        <p>No attendees registered yet.</p>
      )}
    </div>
  );
};

export default EventDetail;
