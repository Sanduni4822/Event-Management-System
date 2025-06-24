import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../components/Table';
import { getEventById, getAttendeesForEvent } from '../services/eventService';
import bgImage from '../assets/event.jpg'; // import background image

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

  if (!event) {
    return (
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center text-white text-xl"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-black bg-opacity-60 p-6 rounded-lg">
          Loading event details...
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-90 min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{event.name}</h1>
        <p className="mb-2 text-gray-700">
          <strong>Location:</strong> {event.location}
        </p>
        <p className="mb-2 text-gray-700">
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="mb-2 text-gray-700">
          <strong>Created by:</strong> {event.created_by}
        </p>
        <p className="mb-2 text-gray-700">
          <strong>Capacity:</strong> {event.capacity} &nbsp;|&nbsp;
          <strong>Remaining:</strong> {event.remaining_capacity}
        </p>
        <p className="mb-6 text-gray-700">
          <strong>Tags:</strong> {event.tags}
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-gray-800">Attendees</h2>
        {attendees.length > 0 ? (
          <Table
            columns={['Name', 'Email']}
            data={attendees.map((a) => ({ Name: a.name, Email: a.email }))}
          />
        ) : (
          <p className="text-gray-600">No attendees registered yet.</p>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
