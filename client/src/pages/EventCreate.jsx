// EventCreate.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input';
import Button from '../components/Button';
import { createEvent } from '../services/eventService';

const validationSchema = Yup.object({
  name: Yup.string().required('Required').max(100),
  description: Yup.string().max(500),
  date: Yup.date().required('Required'),
  location: Yup.string().required('Required'),
  created_by: Yup.string().required('Required'),
  capacity: Yup.number().required('Required').min(1),
  tags: Yup.string()
});

const EventCreate = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      date: '',
      location: '',
      created_by: '',
      capacity: '',
      tags: ''
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = {
        ...values,
        remaining_capacity: values.capacity,
      };
      try {
        await createEvent(formData);
        alert('Event created successfully!');
        resetForm();
      } catch (err) {
        console.error('Error:', err);
        alert('Failed to create event');
      }
    }
  });

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Event</h1>
      <form onSubmit={formik.handleSubmit}>
        {['name', 'description', 'date', 'location', 'created_by', 'capacity', 'tags'].map((field) => (
          <div key={field}>
            <Input
              label={field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              name={field}
              type={field === 'capacity' ? 'number' : field === 'date' ? 'date' : 'text'}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched[field] && formik.errors[field] && (
              <p className="text-sm text-red-600 -mt-2 mb-2">{formik.errors[field]}</p>
            )}
          </div>
        ))}
        <Button type="submit">Create Event</Button>
      </form>
    </div>
  );
};

export default EventCreate;
