import Navbar from "./UI/Navbar";
import Hero from "./UI/Hero";
import Features from "./UI/Feature";
import Footer from "./UI/Footer";
import { AuthProvider } from './UI/authContext';
import './UI/style.css'

export default function Landing() {
  return (
    <AuthProvider>
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
    </AuthProvider>
  );
}
