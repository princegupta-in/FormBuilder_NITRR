import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
      <img src="/assets/icell_dark.png" alt="logo" className="h-20 w-auto top-0 left-0 absolute" />
      </div>
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
