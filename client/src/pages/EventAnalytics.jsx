import React, { useEffect, useState } from 'react';
import { getEvents, getAttendeesForEvent } from '../services/eventService';
import Button from '../components/Button';
import { FaUsers, FaCalendarAlt, FaChartPie } from 'react-icons/fa';

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
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const utilization =
    totalCapacity > 0 ? ((totalAttendees / totalCapacity) * 100).toFixed(2) : '0.00';

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Event Analytics Dashboard</h1>
      {loading ? (
        <p className="text-gray-600 text-center">Loading data...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-5 rounded-xl shadow-md flex items-center space-x-4">
            <FaCalendarAlt className="text-blue-600 text-3xl" />
            <div>
              <p className="text-sm text-gray-600">Total Events</p>
              <p className="text-2xl font-semibold text-blue-800">{totalEvents}</p>
            </div>
          </div>

          <div className="bg-green-50 p-5 rounded-xl shadow-md flex items-center space-x-4">
            <FaUsers className="text-green-600 text-3xl" />
            <div>
              <p className="text-sm text-gray-600">Total Attendees</p>
              <p className="text-2xl font-semibold text-green-800">{totalAttendees}</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-5 rounded-xl shadow-md flex items-center space-x-4">
            <FaChartPie className="text-yellow-600 text-3xl" />
            <div>
              <p className="text-sm text-gray-600">Capacity Utilization</p>
              <p className="text-2xl font-semibold text-yellow-800">{utilization}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventAnalytics;
