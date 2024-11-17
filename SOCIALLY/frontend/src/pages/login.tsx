import AuthForm from '@/components/AuthForm'; // Adjust the path based on your file structure
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const LoginPage = () => {
  return <div className="bg-gray-900">
    <Navbar/>
    <AuthForm />
    <Footer/>
  </div>
};

export default LoginPage;
