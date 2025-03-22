
import { useState, useEffect } from 'react';

const Footer = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Handle scroll for progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / scrollHeight) * 100;
      
      setScrollProgress(progress);
      setShowScrollTop(scrollTop > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-soft-dark py-8 px-6 relative">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed bottom-0 left-0 h-1 bg-soft-blue z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      ></div>
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-white text-soft-dark p-3 rounded-full shadow-lg z-50 transition-all duration-300 
          ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center text-white/90">
          <p className="text-sm mb-4">© {currentYear} Themba Biyela. All rights reserved.</p>
          
          <div className="flex justify-center space-x-6 text-sm text-white/70">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <span className="select-none">•</span>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
