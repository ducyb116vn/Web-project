import React, { useState } from 'react';
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = () => setIsMobileMenuOpen(prev => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);
  const navItems = [
    { href: "#", label: "Content1" },
    { href: "#", label: "Content2" },
    { href: "#", label: "Content3" }
  ]
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">DevLife.</h1>
        <ul className="md:flex hidden space-x-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="hover:underline">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button id="hamburger" onClick={toggleMenu} className="md:hidden bg-blue flex flex-col gap-1.5 z-50">
          <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        <ul className={`${isMobileMenuOpen ? 'flex' : 'hidden'} flex-col absolute top-[60px] left-0 w-full  backdrop-blur-xl border-b border-white/10 p-5 md:hidden shadow-2xl`}>
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} onClick={closeMenu} className="block py-4 px-5 text-black border-l-4 border-transparent font-medium">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

    </nav>

  )
}

export default Navbar
