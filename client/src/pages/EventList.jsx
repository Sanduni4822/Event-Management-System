import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal'; 
import { useNavigate } from 'react-router-dom';
import { getEvents, deleteEvent } from '../services/eventService';

const EventList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);          //  modal state
  const [eventToDelete, setEventToDelete] = useState(null);   // event id to delete
  const pageSize = 5;

  useEffect(() => {
    getEvents()
      .then((res) => {
        setData(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error('Failed to fetch events:', err));
  }, []);

  // Filtering logic
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
      temp = temp.filter(event =>
        event.date.startsWith(dateFilter)
      );
    }

    setFiltered(temp);
    setPage(1);
  }, [search, locationFilter, tagFilter, dateFilter, data]);

  // Delete logic with modal
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
    Remaining: event.remaining_capacity,
    Tags: event.tags,
    'Created At': new Date(event.created_at).toLocaleString(),
    Actions: (
      <>
        <Button className="mr-2" onClick={() => navigate(`/event/edit/${event.id}`)}>Edit</Button>
        <Button className="mr-2 bg-red-600" onClick={() => confirmDelete(event.id)}>Delete</Button>
        <Button onClick={() => navigate(`/event/register/${event.id}`)}>Register</Button>
      </>
    )
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Event List</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <Button onClick={() => navigate('/event/create')}>Add Event</Button>

        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded"
        />

        <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="border p-2 rounded">
          <option value="">All Locations</option>
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>

        <input
          type="text"
          placeholder="Filter by tag"
          value={tagFilter}
          onChange={e => setTagFilter(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Event Table */}
      <Table columns={columns} data={rows} />

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <p>Page {page} of {totalPages}</p>
        <div className="flex gap-2">
          <Button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
          <Button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <Modal
          title="Confirm Deletion"
          message="Are you sure you want to delete this event?"
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default EventList;
