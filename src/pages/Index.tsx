
import { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth appear animation for page content
    const content = document.getElementById('page-content');
    if (content) {
      content.style.opacity = '1';
    }
    
    
    document.title = 'Themba Biyela | Software developer & Problem solver';
  }, []);

  return (
    <div 
      id="page-content" 
      className="min-h-screen w-full overflow-x-hidden transition-opacity duration-700"
      style={{ opacity: 0 }}
    >
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
