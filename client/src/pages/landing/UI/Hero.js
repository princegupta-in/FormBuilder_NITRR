import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <main id="home" className="main">
      <div className="hero">
        <h1>Welcome to ICELL NITRR Form Builder</h1>
        <p>Effortlessly design, manage, and analyze forms with ease. Our tool is tailored for academic and event-related workflows, making data collection smarter and faster than ever before.</p>
        <div className="btn-container">
          <Link href="/signin/signin" className="btn btn-explore">
            Get Started
          </Link>
          <Link href="/signup/signup" className="btn btn-explore">
            Sign Up
          </Link>
        </div>
      </div>
      <div className="hero-img">
        <Image
          src="/assets/forms.jpg"
          alt="Illustration of a developer working"
          width={500}
          height={300}
        />
      </div>
    </main>
  );
}
