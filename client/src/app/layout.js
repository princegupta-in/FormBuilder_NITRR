import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "ICELL NITRR Form Builder",
    description: "Effortlessly design, manage, and analyze forms tailored for academic and event-related workflows at NIT Raipur.",
    keywords: "ICELL, NITRR, form builder, NIT Raipur, academic forms, event forms, form management",
    author: "ICELL NITRR"


  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
