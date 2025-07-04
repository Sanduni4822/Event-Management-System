import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input';
import Button from '../components/Button';
import { getEventById, updateEvent } from '../services/eventService';
import bgImage from '../assets/event.jpg'; 

const validationSchema = Yup.object({
  name: Yup.string().required('Required').max(100),
  description: Yup.string().max(500),
  date: Yup.date().required('Required'),
  location: Yup.string().required('Required'),
  created_by: Yup.string().required('Required'),
  capacity: Yup.number().required('Required').min(1),
  remaining_capacity: Yup.number()
    .required('Required')
    .min(0, 'Cannot be negative')
    .max(Yup.ref('capacity'), 'Cannot exceed capacity'),
  tags: Yup.string()
});

const EventUpdate = () => {
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      date: '',
      location: '',
      created_by: '',
      capacity: '',
      remaining_capacity: '',
      tags: ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateEvent(id, values);
        alert('Event updated successfully');
      } catch (err) {
        console.error('Update failed:', err);
        alert('Failed to update event');
      }
    }
  });

  useEffect(() => {
    getEventById(id)
      .then((res) => {
        const {
          name, description, date, location,
          created_by, capacity, remaining_capacity, tags
        } = res.data;

        formik.setValues({
          name,
          description,
          date: date.split('T')[0],
          location,
          created_by,
          capacity,
          remaining_capacity,
          tags
        });
      })
      .catch((err) => {
        console.error('Failed to fetch event', err);
        alert('Failed to load event');
      });
  }, [id]);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="min-h-screen bg-white bg-opacity-90 flex items-center justify-center px-4">
        <div className="p-6 max-w-xl w-full bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
            Edit Event (ID: {id})
          </h1>
          <form onSubmit={formik.handleSubmit}>
            {[
              'name', 'description', 'date', 'location',
              'created_by', 'capacity', 'remaining_capacity', 'tags'
            ].map((field) => (
              <div key={field} className="mb-4">
                <Input
                  label={field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  name={field}
                  type={field.includes('capacity') ? 'number' : field === 'date' ? 'date' : 'text'}
                  value={formik.values[field]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <p className="text-sm text-red-600 -mt-2">{formik.errors[field]}</p>
                )}
              </div>
            ))}
            <Button type="submit" className="w-full mt-2">Update Event</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventUpdate;
