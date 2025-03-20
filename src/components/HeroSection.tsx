
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(245, 245, 240, 0.8), rgba(245, 245, 240, 0.8)), url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className={`text-center md:text-left md:w-1/2 mb-12 md:mb-0 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-soft-dark leading-tight mb-4">
              John Doe
            </h1>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-lg md:text-xl text-soft-dark/80 mb-8 max-w-lg">
              Creative Photographer | Storyteller | Nature Enthusiast
            </p>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              View My Work
            </button>
          </div>
        </div>
        
        {/* Profile Image */}
        <div className={`md:w-1/2 flex justify-center md:justify-end transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative rounded-full h-60 w-60 md:h-72 md:w-72 lg:h-80 lg:w-80 overflow-hidden border-2 border-white shadow-lg">
            <div className={`image-blur-wrapper ${isLoaded ? 'image-loaded' : 'image-blur'}`}>
              <img 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                alt="John Doe - Photographer"
                className="h-full w-full object-cover transition-transform duration-700"
                style={{ transform: isLoaded ? 'scale(1)' : 'scale(1.1)' }}
                onLoad={() => setIsLoaded(true)}
              />
            </div>
            
            {/* Image loading placeholder */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50 backdrop-blur-sm">
                <div className="w-12 h-12 border-4 border-soft-blue/30 border-t-soft-blue rounded-full animate-slow-spin"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-soft-dark/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-soft-dark/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
