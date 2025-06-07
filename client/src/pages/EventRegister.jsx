
import React from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input';
import Button from '../components/Button';
import { registerAttendee } from '../services/eventService';

const validationSchema = Yup.object({
  name: Yup.string().required('Required').max(100),
  email: Yup.string().email('Invalid email').required('Required')
});

const EventRegister = () => {
  const { id } = useParams();
  const formik = useFormik({
    initialValues: { name: '', email: '' },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await registerAttendee(id, values);
        alert(res.data.message);
        resetForm();
      } catch (err) {
        alert(err.response?.data?.error || 'Registration failed');
      }
    }
  });

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Register for Event</h1>
      <form onSubmit={formik.handleSubmit}>
        {['name', 'email'].map((field) => (
          <div key={field}>
            <Input
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              type={field === 'email' ? 'email' : 'text'}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched[field] && formik.errors[field] && (
              <p className="text-sm text-red-600 -mt-2 mb-2">{formik.errors[field]}</p>
            )}
          </div>
        ))}
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default EventRegister;
