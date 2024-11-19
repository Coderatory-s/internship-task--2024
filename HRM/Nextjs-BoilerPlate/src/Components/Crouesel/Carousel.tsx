/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

const Carousel = () => {
  const images = [
    'https://img.freepik.com/premium-photo/young-employees-sitting-office-table-using-laptop-team-work-brainstorming-meeting-concept_146671-20713.jpg?w=740',
    'https://img.freepik.com/free-photo/business-entrepreneur-man-presenting-company-statistics-using-tablet-financial-presentation_482257-4608.jpg?ga=GA1.1.2141339339.1729485896&semt=ais_hybrid',
    'https://img.freepik.com/premium-photo/business-associates-shaking-hands-office_484651-10327.jpg?ga=GA1.1.2141339339.1729485896&semt=ais_hybrid',
    'https://img.freepik.com/free-photo/close-up-businessman-with-digital-tablet_1098-549.jpg?ga=GA1.1.2141339339.1729485896&semt=ais_hybrid',
    'https://img.freepik.com/free-photo/business-success-report-graph-concept_53876-121032.jpg?ga=GA1.1.2141339339.1729485896&semt=ais_hybrid'
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
