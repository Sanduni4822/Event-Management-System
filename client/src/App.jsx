import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import EventCreate from './pages/EventCreate';
import EventUpdate from './pages/EventUpdate';
import EventRegister from './pages/EventRegister';
import EventAnalytics from './pages/EventAnalytics';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<EventList />} />
      <Route path="/event/:id" element={<EventDetail />} />
      <Route path="/event/create" element={<EventCreate />} />
      <Route path="/event/edit/:id" element={<EventUpdate />} />
      <Route path="/event/register/:id" element={<EventRegister />} />
      <Route path="/event/analytics" element={<EventAnalytics />} />
    </Routes>
  </BrowserRouter>
);

export default App; 
