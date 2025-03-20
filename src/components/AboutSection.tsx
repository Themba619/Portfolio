
import { useState, useEffect } from 'react';
import { Camera, Edit, BookOpen, Plane, Leaf, Paintbrush } from 'lucide-react';

const AboutSection = () => {
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState([false, false, false]);
  
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('about');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setAnimationTriggered(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const skillsData = [
    { icon: <Camera className="w-5 h-5 text-soft-blue" />, text: "Portrait Photography" },
    { icon: <Edit className="w-5 h-5 text-soft-blue" />, text: "Photo Editing" },
    { icon: <BookOpen className="w-5 h-5 text-soft-blue" />, text: "Storytelling" },
  ];

  const interestsData = [
    { icon: <Plane className="w-5 h-5 text-soft-blue" />, text: "Travel" },
    { icon: <Leaf className="w-5 h-5 text-soft-blue" />, text: "Nature" },
    { icon: <Paintbrush className="w-5 h-5 text-soft-blue" />, text: "Art" },
  ];

  const imageUrls = [
    "https://images.unsplash.com/photo-1554941829-202a0b2403b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1621784563330-caee0b138a00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  ];

  return (
    <section 
      id="about" 
      className="bg-soft-beige section-padding"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          {/* Text Content */}
          <div className={`md:w-1/2 transition-opacity duration-1000 ${animationTriggered ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in-left" style={{ animationPlayState: animationTriggered ? 'running' : 'paused' }}>
              About Me
            </h2>
            
            <div className="animate-fade-in-left" style={{ 
              animationDelay: '0.2s',
              animationPlayState: animationTriggered ? 'running' : 'paused'
            }}>
              <p className="text-soft-dark/90 mb-8">
                I'm a passionate photographer with over 5 years of experience capturing the beauty of nature and human emotions. Based in Seattle, I specialize in portrait and landscape photography, aiming to tell stories through every frame. When I'm not behind the camera, you'll find me hiking or exploring new creative projects.
              </p>
            </div>
            
            {/* Skills */}
            <div className="mb-8 animate-fade-in-left" style={{ 
              animationDelay: '0.4s',
              animationPlayState: animationTriggered ? 'running' : 'paused'
            }}>
              <h3 className="text-xl font-semibold mb-4">Skills</h3>
              <div className="space-y-3">
                {skillsData.map((skill, index) => (
                  <div key={`skill-${index}`} className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-md shadow-sm">
                      {skill.icon}
                    </div>
                    <span className="text-sm md:text-base">{skill.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Interests */}
            <div className="animate-fade-in-left" style={{ 
              animationDelay: '0.6s',
              animationPlayState: animationTriggered ? 'running' : 'paused'
            }}>
              <h3 className="text-xl font-semibold mb-4">Interests</h3>
              <div className="space-y-3">
                {interestsData.map((interest, index) => (
                  <div key={`interest-${index}`} className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-md shadow-sm">
                      {interest.icon}
                    </div>
                    <span className="text-sm md:text-base">{interest.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Images */}
          <div className={`md:w-1/2 flex flex-col gap-4 sm:gap-6 transition-opacity duration-1000 ${animationTriggered ? 'opacity-100' : 'opacity-0'}`}>
            {imageUrls.map((url, index) => (
              <div 
                key={`about-image-${index}`}
                className={`image-container overflow-hidden rounded-lg shadow-md border border-white/80 transition-transform duration-500 hover:scale-[1.02] ${animationTriggered ? 'animate-fade-in-right' : ''}`}
                style={{ 
                  animationDelay: `${0.3 + index * 0.2}s`,
                  animationPlayState: animationTriggered ? 'running' : 'paused',
                  aspectRatio: '16/9',
                }}
              >
                <img 
                  src={url}
                  alt={`John Doe - Photography sample ${index + 1}`}
                  className={`w-full h-full object-cover transition-all duration-700 ${imagesLoaded[index] ? 'image-loaded' : 'image-blur'}`}
                  onLoad={() => handleImageLoad(index)}
                />
                
                {/* Loading indicator */}
                {!imagesLoaded[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200/30 backdrop-blur-sm">
                    <div className="w-8 h-8 border-3 border-soft-blue/30 border-t-soft-blue rounded-full animate-slow-spin"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
