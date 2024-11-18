/* eslint-disable @next/next/no-img-element */
import React from 'react';
import '../../app/globals.css'
interface Testimonial {
  name: string;
  position: string;
  feedback: string;
  imageUrl: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'John Doe',
    position: 'HR Manager',
    feedback: 'This HRM app has transformed the way our team manages employee data. Highly recommend!',
    imageUrl: 'https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg?t=st=1731860340~exp=1731863940~hmac=78a252270dad27d0227cad43774884968f1b448e207e596f59c18b725de60c6c&w=740',
  },
  {
    name: 'Jane Smith',
    position: 'Software Engineer',
    feedback: 'The user interface is intuitive, and the features are incredibly helpful. Great experience!',
    imageUrl: 'https://img.freepik.com/free-photo/confident-cheerful-young-businesswoman_1262-20881.jpg?t=st=1731860701~exp=1731864301~hmac=77e535ac0834d37123576b79f29a9feaca4d67e08286c427e8ee31ef912ecd2a&w=360',
  },
  {
    name: 'Emily Johnson',
    position: 'Recruiter',
    feedback: 'Managing recruitment has never been easier. This app is a lifesaver!',
    imageUrl: 'https://img.freepik.com/free-photo/content-successful-male-manager-using-tablet-looking-camera_1262-14194.jpg?t=st=1731860727~exp=1731864327~hmac=b644560510852643290b83eeb54b43e31235e24b40a669d53a12b04181f032c9&w=740',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">What Our Users Say</h2>
        <p className="mt-4 text-lg text-gray-600 text-center">
          Hear from our users how this HRM app has improved their workflows and productivity.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <img
                src={testimonial.imageUrl}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <h3 className="mt-4 text-lg font-medium text-gray-800">{testimonial.name}</h3>
              <p className="text-sm text-gray-600">{testimonial.position}</p>
              <p className="mt-4 text-sm text-gray-700 italic">"{testimonial.feedback}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
