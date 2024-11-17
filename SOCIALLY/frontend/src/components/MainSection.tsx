import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const MainSection = () => {
  const [mounted, setMounted] = useState(false);

  // useEffect ensures this runs only on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent rendering on the server side
  }

  return (
    <>
      {/* Main Section */}
      <motion.div
        className="flex flex-col bg-gray-900 min-h-[calc(100vh-100px)] text-white items-center justify-center gap-2 p-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl font-extrabold"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Connect, Share, and Grow
        </motion.h2>

        <motion.p
          className="text-lg text-gray-400 mb-8 max-w-md"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.7 }}
        >
          Welcome to <span className="text-blue-500 font-semibold">Socially</span> — a
          platform where connections meet possibilities. Share your thoughts, connect
          with like-minded individuals, and grow your personal or professional
          network.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg">
              Explore Now
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MainSection;
