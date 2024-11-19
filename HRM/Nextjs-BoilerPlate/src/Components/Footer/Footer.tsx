import React from 'react';
import '../../app/globals.css';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-800 p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <nav>
          <h6 className="text-lg font-semibold mb-2">Services</h6>
          <ul className="space-y-1">
            <li><a className="text-gray-600 hover:text-gray-900" href="#">Branding</a></li>
            <li><a className="text-gray-600 hover:text-gray-900" href="#">Design</a></li>
            <li><a className="text-gray-600 hover:text-gray-900" href="#">Marketing</a></li>
            <li><a className="text-gray-600 hover:text-gray-900" href="#">Advertisement</a></li>
          </ul>
        </nav>

        <nav>
          <h6 className="text-lg font-semibold mb-2">Company</h6>
          <ul className="space-y-1">
            <li><a className="text-gray-600 hover:text-gray-900" href="#">About us</a></li>
            <li><a className="text-gray-600 hover:text-gray-900" href="#">Contact</a></li>
            <li><a className="text-gray-600 hover:text-gray-900" href="#">Jobs</a></li>
            <li><a className="text-gray-600 hover:text-gray-900" href="#">Press kit</a></li>
          </ul>
        </nav>

        <nav>
          <h6 className="text-lg font-semibold mb-2">Legal</h6>
          <ul className="space-y-1">
            <li><a className="text-gray-600 hover:text-gray-900" href="#">Terms of use</a></li>
            <li><a className="text-gray-600 hover:text-gray-900" href="#">Privacy policy</a></li>
            <li><a className="text-gray-600 hover:text-gray-900" href="#">Cookie policy</a></li>
          </ul>
        </nav>

        <form className="flex flex-col">
          <h6 className="text-lg font-semibold mb-2">Newsletter</h6>
          <label className="text-gray-600 mb-1" htmlFor="email">Enter your email address</label>
          <div className="flex">
            <input
              type="email"
              id="email"
              placeholder="username@site.com"
              className="border border-gray-300 rounded-l-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white rounded-r-md px-4 py-2 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
