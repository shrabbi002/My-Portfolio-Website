'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/shared/Logo';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Skills', href: '/skills' },
    { name: 'Projects', href: '/projects' },
    { name: 'Research', href: '/research' },
    { name: 'Experience', href: '/experience' },
    { name: 'Blog', href: '/blog' },
    { name: 'Certifications', href: '/certifications' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (pathname?.startsWith('/admin')) return null;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-900/90 backdrop-blur-xl shadow-lg border-b border-white/5' : 'bg-transparent'
            }`}>
            <div className="section-container">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <Logo size={40} />
                        <span className="font-heading font-bold text-lg text-white hidden sm:block">MD SAKHAWAT HOSSAIN RABBI</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${pathname === link.href
                                        ? 'text-primary-400 bg-primary-500/10'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}>
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile toggle */}
                    <button onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white/80 hover:text-white">
                        <div className="flex flex-col gap-1.5">
                            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] pb-4' : 'max-h-0'}`}>
                    <div className="glass-card p-4 space-y-1">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${pathname === link.href
                                        ? 'text-primary-400 bg-primary-500/10'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}>
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
