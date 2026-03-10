import { Inter } from "next/font/google";
import "./globals.css";

// 1. Load Inter font from next/font/google to automatically handle optimization and avoid CSS parsing issues.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata = {
  title: "FABRICA® Studio",
  description: "A premium creative studio specialized in digital experiences and high-end design.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-[#050505] text-[#f5f5f5] font-sans antialiased selection:bg-[#c8ff00] selection:text-black min-h-screen flex flex-col">

        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center backdrop-blur-md bg-black/40 border-b border-white/5">
          <a href="#" className="font-extrabold text-2xl tracking-tighter flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            FABRICA<div className="w-2 h-2 bg-[#c8ff00] rounded-full"></div>
          </a>
          <ul className="hidden md:flex gap-12 text-[0.75rem] uppercase tracking-[0.2em] font-medium">
            <li><a href="#work" className="hover:text-[#c8ff00] transition-colors duration-300">Work</a></li>
            <li><a href="#services" className="hover:text-[#c8ff00] transition-colors duration-300">Services</a></li>
            <li><a href="#journal" className="hover:text-[#c8ff00] transition-colors duration-300">Journal</a></li>
          </ul>
          <a href="#contact" className="hidden md:inline-block px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full hover:scale-105 hover:bg-[#c8ff00] transition-all duration-300">
            Start a Project
          </a>
        </nav>

        {children}

      </body>
    </html>
  );
}
