/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Image from 'next/image';

const Carousel = () => {
  const images = [
    'https://media.istockphoto.com/id/1758688771/photo/successful-partnership.jpg?s=1024x1024&w=is&k=20&c=DBdthjFqLX2GoneRkSK1rPf5qgzzj_WC2IKWS9iCYFI=',
    'https://images.unsplash.com/photo-1506784926709-22f1ec395907?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlY3J1aXRtZW50fGVufDB8fDB8fHww',
    'https://media.istockphoto.com/id/1663279091/photo/two-young-colleagues-working-together-at-modern-office.jpg?s=1024x1024&w=is&k=20&c=AvJvm3UpIMNtcQCHvoGbaxO-WPm6EI-hFnC-NxJbE_I=',
    'https://plus.unsplash.com/premium_photo-1683749805319-2c481ae54bc1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29hbHMlMjAlMkIlMjBkcmVhbXN8ZW58MHx8MHx8fDA%3D',
    'https://media.istockphoto.com/id/1499714091/photo/digital-business-global-leadership-to-strategy-planning-and-development-financial-and-banking.jpg?s=1024x1024&w=is&k=20&c=7pzfBAMKX10f4HzIdrCstbiT_4-a1_0NAnxFiOcBKuo='
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full" id="animation-carousel">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-linear ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={src}
              alt={`Carousel item ${index + 1}`}
              className="block w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 focus:ring-4 focus:ring-white">
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1L1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 focus:ring-4 focus:ring-white">
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 9l4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
