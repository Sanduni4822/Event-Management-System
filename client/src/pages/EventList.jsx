import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';
import { getEvents, deleteEvent } from '../services/eventService';
import bgImage from '../assets/event.jpg';

const EventList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const pageSize = 5;

  useEffect(() => {
    getEvents()
      .then((res) => {
        setData(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error('Failed to fetch events:', err));
  }, []);

  useEffect(() => {
    let temp = [...data];

    if (search) {
      temp = temp.filter(event =>
        event.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (locationFilter) {
      temp = temp.filter(event => event.location === locationFilter);
    }

    if (tagFilter) {
      temp = temp.filter(event =>
        event.tags?.toLowerCase().includes(tagFilter.toLowerCase())
      );
    }

    if (dateFilter) {
      temp = temp.filter(event => {
        const localDate = new Date(event.date);
        const formatted = localDate.toLocaleDateString('sv-SE'); // yyyy-mm-dd
        return formatted === dateFilter;
      });
    }

    setFiltered(temp);
    setPage(1);
  }, [search, locationFilter, tagFilter, dateFilter, data]);

  const confirmDelete = (id) => {
    setEventToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteEvent(eventToDelete);
      setData(data.filter((event) => event.id !== eventToDelete));
      setShowModal(false);
      setEventToDelete(null);
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
      setShowModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setEventToDelete(null);
  };

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);
  const locations = [...new Set(data.map(e => e.location))];

  const columns = [
    'ID',
    'Name',
    'Description',
    'Date',
    'Location',
    'Created By',
    'Capacity',
    'Remaining',
    'Tags',
    'Created At',
    'Actions'
  ];

  const rows = paginated.map(event => ({
    ID: event.id,
    Name: event.name,
    Description: event.description,
    Date: new Date(event.date).toLocaleDateString(),
    Location: event.location,
    'Created By': event.created_by,
    Capacity: event.capacity,
    Remaining: event.remaining === 0
      ? <span className="text-red-500 font-bold">Full</span>
      : event.remaining,
    Tags: event.tags,
    'Created At': new Date(event.created_at).toLocaleString(),
    Actions: (
      <div className="flex gap-2">
        <Button size="sm" variant="primary" onClick={() => navigate(`/event/edit/${event.id}`)}>Edit</Button>
        <Button size="sm" variant="danger" onClick={() => confirmDelete(event.id)}>Delete</Button>
        <Button
          size="sm"
          variant="success"
          onClick={() => navigate(`/event/register/${event.id}`)}
          disabled={event.remaining === 0}
        >
          Register
        </Button>
      </div>
    )
  }));

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="p-6 bg-white bg-opacity-60 backdrop-blur-sm min-h-screen">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Event List</h1>

        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <Button onClick={() => navigate('/event/create')} variant="primary">+ Add Event</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border p-2 rounded w-full"
            />

            <select
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">All Locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Filter by tag"
              value={tagFilter}
              onChange={e => setTagFilter(e.target.value)}
              className="border p-2 rounded w-full"
            />

            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="bg-white shadow rounded-lg p-4">
            <Table columns={columns} data={rows} />
          </div>
        ) : (
          <div className="text-center text-gray-500 bg-white shadow p-6 rounded-lg">
            No events found.
          </div>
        )}

        {filtered.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Page {page} of {totalPages} | Showing {paginated.length} of {filtered.length}
            </p>
            <div className="flex gap-2">
              <Button disabled={page === 1} onClick={() => setPage(p => p - 1)} variant="secondary">Previous</Button>
              <Button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} variant="secondary">Next</Button>
            </div>
          </div>
        )}

        {showModal && (
          <Modal
            title="Confirm Deletion"
            message="Are you sure you want to delete this event?"
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
          />
        )}
      </div>
    </div>
  );
};

export default EventList;
