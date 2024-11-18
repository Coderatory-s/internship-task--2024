import Banner from "@/Components/Cards/Banner";
import Carousel from "@/Components/Carousel/Carousel";
import Footer from "@/Components/Footer/Footer";
import HeroSection from "@/Components/Herosection/HeroSection";
import Navbar from "@/Components/Navbar/Navbar";
import Testimonials from "@/Components/testimonial/Testimonial";

  export default function Home(){
    return(
        <>
        <Navbar/>
        <HeroSection/>
      <Banner/>
      <Carousel/>
      <Testimonials/>
      <Footer/>
        </>
    )
  }