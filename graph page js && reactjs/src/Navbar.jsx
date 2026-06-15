import React, { useState } from 'react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { href: "#home", label: "Home" },
        { href: "#dashboard", label: "Dashboard" },
        { href: "#analytics", label: "Analytics" },
        { href: "#reports", label: "Reports" },
        { href: "#contact", label: "Contact" },
    ];

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav id="navbar" className="fixed top-0 w-full px-6 py-4 lg:px-12 bg-dark/95 z-50 transition-all duration-300 border-b border-white/10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <a href="#home" className="flex items-center gap-4 group" onClick={closeMenu}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-neon-cyan to-neon-blue shadow-[0_0_20px_rgba(0,255,204,0.3)] relative overflow-hidden">
                        <i className="fa-solid fa-chart-simple text-dark text-lg"></i>
                    </div>
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-neon-cyan group-hover:opacity-80 transition-opacity">
                        Graph Page
                    </span>
                </a>

                <ul className="hidden md:flex gap-10">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <a href={item.href} className="text-white hover:text-neon-orange transition-colors font-medium">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>


                <div className="flex items-center gap-4">
                    <a href="https://www.google.com/search" target="_blank" rel="noreferrer" className="text-white hover:scale-110 transition-transform">
                        <i className="fa-solid fa-magnifying-glass text-xl"></i>
                    </a>
                    
                    <button id="hamburger" onClick={toggleMenu} className="md:hidden bg-[#0a0e27] flex flex-col gap-1.5 z-50">
                        <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>
            </div>

            <ul className={`${isMobileMenuOpen ? 'flex' : 'hidden'} flex-col absolute top-[72px] left-0 w-full bg-dark/98 backdrop-blur-xl border-b border-white/10 p-5 md:hidden shadow-2xl`}>
                {navItems.map((item) => (
                    <li key={item.label}>
                        <a href={item.href} onClick={closeMenu} className="block py-4 px-5 text-white border-l-4 border-transparent hover:border-neon-pink hover:bg-neon-pink/10 hover:text-neon-orange transition-all font-medium">
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;

