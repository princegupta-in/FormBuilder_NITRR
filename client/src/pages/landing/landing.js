import Navbar from "./UI/Navbar";
import Hero from "./UI/Hero";
import Features from "./UI/Feature";
import Footer from "./UI/Footer";
import './UI/style.css'

export default function Landing() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
