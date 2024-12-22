'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from './authContext';

export default function Hero() {

  const {user, isloggedin} = useAuth();

  return (
    <main id="home" className="main">
      <div className="hero">
        <h1>Welcome to ICELL NITRR Form Builder</h1>
        <p>Effortlessly design, manage, and analyze forms with ease. Our tool is tailored for academic and event-related workflows, making data collection smarter and faster than ever before.</p>
        {isloggedin && user? (
          <div className='btn-container'>
          <Link href="/formbuilder/page" className="btn btn-explore bg-green-500">
          Create Form
        </Link>
        </div>
        ): (
          <div className="btn-container">
          <Link href="/signin/signin" className="btn btn-explore">
            Get Started
          </Link>
          <Link href="/signup/signup" className="btn btn-explore">
            Sign Up
          </Link>
        </div>
        )}
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
