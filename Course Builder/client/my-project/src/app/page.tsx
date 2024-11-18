'use client'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login'); 
  };

  const handleRegister = () => {
    router.push('/register'); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Course Builder</h1>
        <p className="text-xl">Create, manage, and publish courses effortlessly</p>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-10 max-w-lg w-full text-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome</h2>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleLogin}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
          >
            Register
          </button>
        </div>
      </div>

      <footer className="mt-12 text-center">
        <p>Start building your dream course today!</p>
      </footer>
    </div>
  );
}
