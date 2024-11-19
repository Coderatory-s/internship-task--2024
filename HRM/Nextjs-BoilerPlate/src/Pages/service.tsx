
import Carousel from "../Components/Crouesel/Carousel";
import Footer from "@/Components/Footer/Footer";

import Navbar from "@/Components/Navbar/Navbar";
import Testimonials from "../Components/Testimonials/Testimonial";

export default function Services() {
  return (
    <>
    
      <Navbar />
      <Carousel/>
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Our Services</h2>
        <p className="mt-4 text-lg text-gray-600 text-center">
          We offer a comprehensive suite of HR solutions designed to streamline your HR processes.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-800">Employee Management</h3>
            <p className="mt-4 text-sm text-gray-600">
              Efficient employee data management with easy access to records, performance, and payroll.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-800">Recruitment</h3>
            <p className="mt-4 text-sm text-gray-600">
              Streamlined recruitment processes with automated tracking and easy candidate evaluation.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-800">Payroll</h3>
            <p className="mt-4 text-sm text-gray-600">
              Simplified payroll management with accurate calculations, deductions, and tax compliance.
            </p>
          </div>
        </div>
      </div>
      <Carousel />
      <Testimonials />
      <Footer />
    </>
  );
}
