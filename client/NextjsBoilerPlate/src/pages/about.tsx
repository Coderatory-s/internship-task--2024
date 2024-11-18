import { motion } from "framer-motion";
import Banner from "@/Components/Cards/Banner";
import Carousel from "@/Components/Carousel/Carousel";
import Footer from "@/Components/Footer/Footer";
import HeroSection from "@/Components/Herosection/HeroSection";
import Navbar from "@/Components/Navbar/Navbar";
import Testimonials from "@/Components/testimonial/Testimonial";

export default function About() {
  return (
    <>
      <Navbar />
      <HeroSection />

      <motion.div
        className="bg-white py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-extrabold text-gray-900 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            About Us
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-gray-600 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We are dedicated to providing innovative HR solutions that enhance the employee experience and optimize business operations.
          </motion.p>

          <div className="mt-10">
            <motion.h3
              className="text-2xl font-semibold text-gray-800"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Our Mission
            </motion.h3>
            <motion.p
              className="mt-4 text-lg text-gray-600"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Our mission is to transform HR management with a user-friendly platform that streamlines operations, enhances communication, and drives employee engagement.
            </motion.p>
          </div>

          <div className="mt-10">
            <motion.h3
              className="text-2xl font-semibold text-gray-800"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Our Values
            </motion.h3>
            <motion.ul
              className="mt-4 text-lg text-gray-600 list-disc pl-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <li>Innovation: We embrace new technologies to improve the HR experience.</li>
              <li>Integrity: We maintain transparency and honesty in all our operations.</li>
              <li>Collaboration: We value teamwork and communication within the organization.</li>
            </motion.ul>
          </div>
        </div>
      </motion.div>

      <Carousel />
      <Testimonials />
      <Footer />
    </>
  );
}
