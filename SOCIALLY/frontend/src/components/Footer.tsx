"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const [isClient, setIsClient] = useState(false);

  // Only set `isClient` to true on the client-side, not during SSR
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // During SSR, do not render the footer to avoid hydration mismatch
    return null;
  }

  return (
    <motion.footer
      className="bg-blue-900 flex flex-col justify-center items-center gap-10 text-white py-8"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-[1000px] grid grid-cols-1 justify-evenly md:grid-cols-3 gap-10">
        <div className="flex flex-col space-y-2">
          <h4 className="font-semibold text-lg">Company</h4>
          <Link href="/" className="text-gray-400 hover:text-white">
            About Us
          </Link>
          <Link href="/" className="text-gray-400 hover:text-white">
            Careers
          </Link>
          <Link href="/" className="text-gray-400 hover:text-white">
            Blog
          </Link>
        </div>

        <div className="flex flex-col space-y-2">
          <h4 className="font-semibold text-lg">Support</h4>
          <Link href="/" className="text-gray-400 hover:text-white">
            Help Center
          </Link>
          <Link href="/" className="text-gray-400 hover:text-white">
            Terms of Service
          </Link>
          <Link href="/" className="text-gray-400 hover:text-white">
            Privacy Policy
          </Link>
        </div>

        <div className="flex flex-col space-y-2">
          <h4 className="font-semibold text-lg">Get In Touch</h4>
          <Link href="/" className="text-gray-400 hover:text-white">
            Contact Us
          </Link>
          <Link href="/" className="text-gray-400 hover:text-white">
            Give Feedback
          </Link>
        </div>
      </div>
<hr  className="h-[0.1px] w-full bg-white"/>
      <div className="flex items-center justify-center mt-4 py-4">
        <p className="text-gray-200 text-sm">
          &copy; 2024{" "}
          <Link className="text-green-500" href={"/"}>
            Socially.
          </Link>{" "}
          All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
