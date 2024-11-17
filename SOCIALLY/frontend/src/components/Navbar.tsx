import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div>
        <motion.nav
className="bg-blue-600  shadow-md p-4 fixed w-full top-0 z-10"
initial={{ y: -100 }}
animate={{ y: 0 }}
transition={{ duration: 0.5 }}
>
<div className="max-w-[1200px] mx-auto flex justify-between items-center">
  <motion.h1
    className="text-2xl font-bold text-white select-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >

    <Link href={"/"}>Socially.</Link>
  </motion.h1>

  <div className="flex items-center space-x-4">
  <Link href="/login">
  <Button className="bg-blue-500 active:scale-110 transition-all ease-in-out hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Login
  </Button>
</Link>
<Link href="/signup">
  <Button className="bg-green-500 active:scale-110 transition-all ease-in-out hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
    Sign Up for Free
  </Button>
</Link>
  </div>
</div>
</motion.nav>
    </div>
  )
}

export default Navbar