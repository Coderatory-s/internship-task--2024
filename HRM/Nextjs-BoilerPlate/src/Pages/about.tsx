
import Carousel from "../Components/Crouesel/Carousel";
import Footer from "@/Components/Footer/Footer";

import Navbar from "@/Components/Navbar/Navbar";
import Testimonials from "../Components/Testimonials/Testimonial";

export default function About() {
  return (
    <>
      <Navbar />
      <Carousel/>
   
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">About Us</h2>
          <p className="mt-4 text-lg text-gray-600 text-center">
            We are dedicated to providing innovative HR solutions that enhance the employee experience and optimize business operations.
          </p>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
            <p className="mt-4 text-lg text-gray-600">
              Our mission is to transform HR management with a user-friendly platform that streamlines operations, enhances communication, and drives employee engagement.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-800">Our Values</h3>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Innovation: We embrace new technologies to improve the HR experience.</li>
              <li>Integrity: We maintain transparency and honesty in all our operations.</li>
              <li>Collaboration: We value teamwork and communication within the organization.</li>
            </ul>
          </div>
        </div>
      </div>
   
      <Testimonials />
      <Footer />
    </>
  );
}
