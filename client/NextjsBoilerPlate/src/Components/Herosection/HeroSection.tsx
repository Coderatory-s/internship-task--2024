import React from "react"
import '../../app/globals.css';




const HeroSection: React.FC = () => (
  <div
    style={{
      backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1661347859297-859b8ae1d7c5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzaW5lc3MlMjBtZWV0aW5nfGVufDB8fDB8fHww")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    }}
    className="flex items-center justify-center p-4 md:p-8 lg:p-16 text-center md:text-left"
  >
    <div className="text-white max-w-3xl">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight mb-4">
        We are your Partners<br />
        <span className="text-center">
           in
          </span>
          <br />
        <span className="font-bold">Human Resource</span>
      </h1>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-lg mx-auto md:mx-0">
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
        there live the blind texts.
      </p>
    </div>
  </div>
);

export default HeroSection;

