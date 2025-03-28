
import { useState, useEffect, useRef } from 'react';


interface ProjectData {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  thumbnail: string;
  projectLink: string,
  category: string;
}

const PortfolioSection = () => {
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement>>({});


  // Project data
  const projects: ProjectData[] = [
    {
      id: 'project1',
      title: 'Drum-kit-interactive',
      description: 'an interactive drum kit built with JavaScript, where each keyboard key is mapped to a unique drum instrument. Press a key or click an on-screen instrument to trigger authentic drum sounds, creating your own rhythms in real-time. Simple, fun, and perfect for music enthusiasts and casual players alike!"',
      videoSrc: 'public/videos/Drum Kit.mp4',
      thumbnail: 'public/images/Drum Kit.png',
      projectLink: 'https://themba619.github.io/drum-kit-interactive/',
      category: 'javascript',
    },
    {
      id: 'project2',
      title: 'Simon-Says-Game',
      description: 'In this game, players must watch and listen carefully as a sequence of colored buttons (1 of 4) lights up and plays a sound. The player must then click the buttons in the exact order they were shown. Each round, a new color is added to the sequence, requiring the player to recall and repeat all previous steps plus the new one. The game continues until the player makes a mistake. How long can you keep up?',
      videoSrc: 'public/videos/Simon Says.mp4',
      thumbnail: 'public/images/Simon Says.png',
      projectLink: 'https://themba619.github.io/Simon-Says-Game/ ',
      category: 'javascript',
    },
    {
      id: 'project3',
      title: 'Website Under Construction',
      description: 'Coming Soon',
      videoSrc: 'https://th.bing.com/th/id/R.616d34592c3ecd938f93748b7573ce69?rik=iHhkle3gFWspxg&pid=ImgRaw&r=0',
      thumbnail: 'public/images/Under Construction.png',
      projectLink: 'ComingSoon',
      category: 'Python and Java',
    },
    {
      id: 'project4',
      title: 'Website Under Construction',
      description: 'Coming Soon.',
      videoSrc: 'https://player.vimeo.com/external/475346667.sd.mp4?s=db70287dd906d85388b272127396be42c50fb62f&profile_id=165&oauth2_token_id=57447761',
      thumbnail: 'public/images/Under Construction.png',
      projectLink: 'comingSoon',
      category: 'Python and Java',
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('portfolio');
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

  // Register video refs
  const registerVideoRef = (id: string, element: HTMLVideoElement | null) => {
    if (element) {
      videoRefs.current[id] = element;
    }
  };

  const handleVideoPlay = (id: string) => {
    // Pause any currently playing video
    if (playingVideo && playingVideo !== id && videoRefs.current[playingVideo]) {
      videoRefs.current[playingVideo].pause();
    }
    
    // Play the selected video
    if (videoRefs.current[id]) {
      const video = videoRefs.current[id];
      if (video.paused) {
        video.play();
        setPlayingVideo(id);
      } else {
        video.pause();
        setPlayingVideo(null);
      }
    }
  };

  // Handle video hover on desktop
  const handleVideoHover = (id: string, isHovering: boolean) => {
    if (window.innerWidth < 768) return; // Skip on mobile
    
    const video = videoRefs.current[id];
    if (!video) return;
    
    if (isHovering) {
      video.muted = true;
      video.play().catch(() => {}); // Ignore autoplay errors
    } else if (playingVideo !== id) { // Don't pause if it was manually played
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section id="portfolio" className="bg-white section-padding">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-opacity duration-1000 ${animationTriggered ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-fade-in" style={{ 
            animationDelay: '0.2s',
            animationPlayState: animationTriggered ? 'running' : 'paused' 
          }}>
            Portfolio
          </h2>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{ 
            animationDelay: '0.4s',
            animationPlayState: animationTriggered ? 'running' : 'paused' 
          }}>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === 'all' 
                  ? 'bg-soft-blue text-white' 
                  : 'bg-gray-200 text-soft-dark hover:bg-gray-300'
              }`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === 'portraits' 
                  ? 'bg-soft-blue text-white' 
                  : 'bg-gray-200 text-soft-dark hover:bg-gray-300'
              }`}
              onClick={() => setActiveFilter('javascript')}
            >
              Javascript Projects
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === 'landscapes' 
                  ? 'bg-soft-blue text-white' 
                  : 'bg-gray-200 text-soft-dark hover:bg-gray-300'
              }`}
              onClick={() => setActiveFilter('Python and Java')}
            >
              Python and Java Projects
            </button>
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`transition-all duration-700 ${
                animationTriggered 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="video-card group bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                {/* Video Container */}
                <div className="relative aspect-video cursor-pointer overflow-hidden" 
                  onClick={() => handleVideoPlay(project.id)}
                  onMouseEnter={() => handleVideoHover(project.id, true)}
                  onMouseLeave={() => handleVideoHover(project.id, false)}
                >
                  {/* Video Thumbnail */}
                  <img 
                    src={project.thumbnail} 
                    alt={`${project.title} thumbnail`} 
                    className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
                      playingVideo === project.id ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  
                  {/* Video */}
                  <video 
                    ref={(el) => registerVideoRef(project.id, el)}
                    src={project.videoSrc}
                    className="w-full h-full object-cover absolute inset-0"
                    playsInline
                    loop
                    preload="metadata"
                    aria-label={`Video: ${project.title}`}
                  />
                  
                  {/* Play Button */}
                  <div className={`play-button ${playingVideo === project.id ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="play-icon"></div>
                  </div>
                  
                  {/* Accessibility Caption */}
                  <div className="sr-only">
                    Video reel of {project.title.toLowerCase()} project work
                  </div>

                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Project Info */}
                <div className="p-5 md:p-6">
                  <h3 className="text-xl font-bold mb-2 text-soft-dark">{project.title}</h3>
                  <p className="text-soft-dark/70 text-sm mb-4">{project.description}</p>
                  <a 
                    href={project.projectLink} target="_blank"
                    className="text-soft-blue text-sm font-medium inline-flex items-center transition-all duration-300 hover:text-soft-blue-hover"
                  >
                    View Full Project
                    <svg className="w-3.5 h-3.5 ml-1 transition-transform duration-300 transform group-hover:translate-x-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
