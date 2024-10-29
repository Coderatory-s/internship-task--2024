"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cover bg-center text-white p-10" style={{ backgroundImage: "url('/background.jpg')" }}>
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 bg-white/10 backdrop-blur-md text-white rounded-xl shadow-lg p-10 max-w-lg w-full text-center">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
          Welcome to <span className="text-yellow-400">CRM</span>
        </h1>
        <p className="mb-6 text-lg text-gray-300">
          Streamline your customer relationships and maximize your business potential.
        </p>
        
        <Link className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-full text-lg shadow-md hover:bg-yellow-500 transition duration-300 ease-in-out" href="/leads">
            Go to Leads Page
         
        </Link>
      </div>
    </main>
  );
}
