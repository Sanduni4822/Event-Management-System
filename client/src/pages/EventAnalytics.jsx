import React, { useEffect, useState } from 'react';
import { getEvents, getAttendeesForEvent } from '../services/eventService';
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

  const cards = [
    {
      title: 'Total Events',
      value: totalEvents,
      icon: <FaCalendarAlt className="text-5xl text-blue-600" />,
      color: 'blue',
    },
    {
      title: 'Total Attendees',
      value: totalAttendees,
      icon: <FaUsers className="text-5xl text-green-600" />,
      color: 'green',
    },
    {
      title: 'Capacity Utilization',
      value: `${utilization}%`,
      icon: <FaChartPie className="text-5xl text-yellow-600" />,
      color: 'yellow',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          📊 Event Analytics Dashboard
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading analytics...</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className={`bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-5 border-t-4 border-${card.color}-500`}
              >
                {card.icon}
                <div>
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  <p className={`text-3xl font-bold text-${card.color}-700`}>
                    {card.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventAnalytics;
