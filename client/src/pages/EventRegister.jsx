import React from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input';
import Button from '../components/Button';
import { registerAttendee } from '../services/eventService';
import bgImage from '../assets/event.jpg'; // ✅ Add your background image

// Validation Schema
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
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="min-h-screen bg-white bg-opacity-90 flex items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Register for Event
          </h1>

          <form onSubmit={formik.handleSubmit}>
            {['name', 'email'].map((field) => (
              <div key={field} className="mb-4">
                <Input
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  type={field === 'email' ? 'email' : 'text'}
                  value={formik.values[field]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <p className="text-sm text-red-600 -mt-2 mb-2">
                    {formik.errors[field]}
                  </p>
                )}
              </div>
            ))}
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventRegister;
