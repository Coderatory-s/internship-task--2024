import { motion } from "framer-motion";
import Carousel from "@/Components/Carousel/Carousel";
import Footer from "@/Components/Footer/Footer";
import HeroSection from "@/Components/Herosection/HeroSection";
import Navbar from "@/Components/Navbar/Navbar";
import Testimonials from "@/Components/testimonial/Testimonial";

export default function Services() {
  return (
    <>
      <Navbar />
      <HeroSection />

      {/* Motion for Services Section */}
      <motion.div
        className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2>

        <motion.p
          className="mt-4 text-lg text-gray-600 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We offer a comprehensive suite of HR solutions designed to streamline your HR processes.
        </motion.p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service Cards */}
          {["Employee Management", "Recruitment", "Payroll"].map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
            >
              <motion.h3
                className="text-xl font-semibold text-gray-800"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {service}
              </motion.h3>
              <motion.p
                className="mt-4 text-sm text-gray-600"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                Efficient {service} with easy access to records, performance, and payroll.
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Carousel />
      <Testimonials />
      <Footer />
    </>
  );
}
