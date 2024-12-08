import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">ICELL NITRR</div>
      <ul className="nav-links">
        <li className="nav-btn-container">
          <Link href="#home" className="btn">Home</Link>
        </li>
        <li className="nav-btn-container">
          <Link href="#features" className="btn">Features</Link>
        </li>
        <li className="nav-btn-container">
          <Link href="#contact" className="btn">Contact</Link>
        </li>
        <li className="btn-container">
          <Link href="/signin/signin" className="btn btn-explore">Signin</Link>
        </li>
        <li className="btn-container">
          <Link href="/signup/signup" className="btn btn-explore">Signup</Link>
        </li>
      </ul>
    </nav>
  );
}
