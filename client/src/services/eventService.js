import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';

export const getEvents = () => axios.get(API_URL);
export const getEventById = (id) => axios.get(`${API_URL}/${id}`);
export const createEvent = (data) => axios.post(API_URL, data);
export const updateEvent = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteEvent = (id) => axios.delete(`${API_URL}/${id}`);
export const registerAttendee = (id, data) => axios.post(`${API_URL}/${id}/register`, data);
export const getAttendeesForEvent = (id) => axios.get(`${API_URL}/${id}/attendees`); 
