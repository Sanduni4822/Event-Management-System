import React, { useEffect, useState } from 'react';
import { getEvents, getAttendeesForEvent } from '../services/eventService';
import Button from '../components/Button';

const EventAnalytics = () => {
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [totalCapacity, setTotalCapacity] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const eventsRes = await getEvents();
        const events = eventsRes.data;

        setTotalEvents(events.length);

        let attendeeCount = 0;
        let capacitySum = 0;

        for (const event of events) {
          const attendeesRes = await getAttendeesForEvent(event.id);
          attendeeCount += attendeesRes.data.length;
          capacitySum += event.capacity;
        }

        setTotalAttendees(attendeeCount);
        setTotalCapacity(capacitySum);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      }
    };

    fetchAnalytics();
  }, []);

  const utilization =
    totalCapacity > 0 ? ((totalAttendees / totalCapacity) * 100).toFixed(2) : '0.00';

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6"> Event Analytics</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-6">
          <div className="bg-blue-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Events</h2>
            <p className="text-2xl">{totalEvents}</p>
          </div>

          <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Attendees</h2>
            <p className="text-2xl">{totalAttendees}</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Capacity Utilization</h2>
            <p className="text-2xl">{utilization}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventAnalytics;
