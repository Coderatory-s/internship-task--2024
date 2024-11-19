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
    imageUrl: 'https://media.istockphoto.com/id/1587604256/photo/portrait-lawyer-and-black-woman-with-tablet-smile-and-happy-in-office-workplace-african.jpg?s=612x612&w=0&k=20&c=n9yulMNKdIYIQC-Qns8agFj6GBDbiKyPRruaUTh4MKs=',
  },
  {
    name: 'Jane Smith',
    position: 'Software Engineer',
    feedback: 'The user interface is intuitive, and the features are incredibly helpful. Great experience!',
    imageUrl: 'https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg?semt=ais_hybrid',
  },
  {
    name: 'Emily Johnson',
    position: 'Recruiter',
    feedback: 'Managing recruitment has never been easier. This app is a lifesaver!',
    imageUrl: 'https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=',
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
