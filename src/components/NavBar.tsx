
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling for anchor links
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 transition-all duration-300",
        isScrolled 
          ? "glass-nav shadow-sm border-b border-gray-200/50" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-soft-dark font-montserrat font-bold text-2xl transition-opacity hover:opacity-80">
          John<span className="text-soft-blue">Doe</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
          <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
          <button onClick={() => scrollToSection('portfolio')} className="nav-link">Portfolio</button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col space-y-1.5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={cn(
            "block w-6 h-0.5 bg-soft-dark transition-transform duration-300",
            mobileMenuOpen && "transform rotate-45 translate-y-2"
          )}></span>
          <span className={cn(
            "block w-6 h-0.5 bg-soft-dark transition-opacity duration-300",
            mobileMenuOpen && "opacity-0"
          )}></span>
          <span className={cn(
            "block w-6 h-0.5 bg-soft-dark transition-transform duration-300",
            mobileMenuOpen && "transform -rotate-45 -translate-y-2"
          )}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden fixed inset-x-0 bg-white/95 backdrop-blur-lg transition-all duration-300 border-b border-gray-200/50 overflow-hidden",
        mobileMenuOpen ? "max-h-60 py-4 shadow-md" : "max-h-0"
      )}>
        <div className="flex flex-col items-center space-y-4 px-6 py-2">
          <button onClick={() => scrollToSection('home')} className="nav-link text-lg w-full text-center py-2">Home</button>
          <button onClick={() => scrollToSection('about')} className="nav-link text-lg w-full text-center py-2">About</button>
          <button onClick={() => scrollToSection('portfolio')} className="nav-link text-lg w-full text-center py-2">Portfolio</button>
          <button onClick={() => scrollToSection('contact')} className="nav-link text-lg w-full text-center py-2">Contact</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
