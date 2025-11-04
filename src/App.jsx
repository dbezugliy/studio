import React, { useState, useEffect, useRef } from 'react';

// ===== COLOR CONFIGURATION =====
const COLORS = {
  primaryHover: '#ffffffff', // Hover state for primary
  text: '#ffffffff',         // Main text color
  textLight: '#6b7280',      // Secondary text color
  background: '#000000ff',   // Page background
  cardBg: '#000000ff',       // Card background
  border: '#1a1a1aff',       // Border color
};

// ===== VIDEO COLOR CONFIGURATION =====
const VIDEO_COLORS = {
  primary: '#e7112eff',      // Red for video mode
  navActive: '#ff2d2d',      // Active navigation in video mode
  tagsBg: '#e7112e2f'        // Tags background in video mode
};

// ===== CODING MODE COLOR OVERRIDES =====
const CODING_COLORS = {
  primary: '#3510bdff',      // Blue for coding mode
  navActive: '#3510bdff',    // Active navigation in coding mode
  tagsBg: '#0062ff42'        // Tags background in coding mode
};

// ===== FONT CONFIGURATION =====
const FONTS = {
  navTitle: 'Boldstrom',
  headings: 'monospace',
  body: 'monospace',
  mono: 'monospace',
};

// ===== PROJECTS CONFIGURATION =====
const VIDEO_PROJECTS = [
  {
    id: 1,
    title: "Don't Wait Around",
    description: "High-Pace Transitional Editing",
    image: "https://img.youtube.com/vi/UHAEcINMhCk/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=UHAEcINMhCk",
    type: "youtube",
    tags: ["After Effects", "Photoshop"]
  },
  {
    id: 2,
    title: "Esports Invitational",
    description: "Sponsor Colaboration Event",
    image: "https://pbs.twimg.com/ext_tw_video_thumb/1634245203690135554/pu/img/TO5bI23jJnO9GfUU.jpg",
    link: "https://x.com/Illini_esports/status/1634247149146849280",
    type: "youtube",
    tags: ["After Effects", "Esports"]
  },
  {
    id: 3,
    title: "Look At Me",
    description: "Quick Turnaround Project",
    image: "https://img.youtube.com/vi/uJos6RXDRpM/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=uJos6RXDRpM",
    type: "youtube",
    tags: ["Premiere", "Esports"]
  },
  {
    id: 4,
    title: "I Travled for Two Months",
    description: "Personal Vlog",
    image: "https://img.youtube.com/vi/lfDsLk6HTpE/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=lfDsLk6HTpE",
    type: "youtube",
    tags: ["After Effects", "Photoshop"]
  },
  {
    id: 5,
    title: "The Ultimate Peak Achievement",
    description: "Entertainment / Gaming",
    image: "https://img.youtube.com/vi/O2txDgHe77g/maxresdefault.jpg",
    link: "https://www.youtube.com/shorts/O2txDgHe77g",
    type: "youtube",
    tags: ["After Effects", "Short"]
  },
  {
    id: 6,
    title: "This is Peak PVP",
    description: "Entertainment / Gaming",
    image: "https://img.youtube.com/vi/TKpMZxe5MVI/maxresdefault.jpg",
    link: "https://www.youtube.com/shorts/TKpMZxe5MVI",
    type: "youtube",
    tags: ["After Effects", "Short"]
  },
  {
    id: 7,
    title: "Quess My Favorite Video Game",
    description: "Quiz Format",
    image: "https://img.youtube.com/vi/5LQnUJ755D8/maxresdefault.jpg",
    link: "https://www.youtube.com/shorts/5LQnUJ755D8",
    type: "youtube",
    tags: ["After Effects", "Esports", "Short"]
  },
  {
    id: 8,
    title: "All Aim, No Brain",
    description: "KovaaK 2.0 Sponsorship",
    image: "https://img.youtube.com/vi/UVIURDfJ3eY/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=UVIURDfJ3eY",
    type: "youtube",
    tags: ["Premiere", "Esports"]
  },
  {
    id: 9,
    title: "Who Are We",
    description: "Long Form Closed-Captioning",
    image: "https://img.youtube.com/vi/625AmS7agzY/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=625AmS7agzY",
    type: "youtube",
    tags: ["Premiere", "Esports"]
  },
  {
    id: 10,
    title: "QUAD DAY 2022",
    description: "Informational Event Video",
    image: "https://img.youtube.com/vi/e_la0KhjZ8A/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=e_la0KhjZ8A",
    type: "youtube",
    tags: ["Premiere", "Esports"]
  }
];

const CODING_PROJECTS = [
  {
    id: 11,
    title: "Caterpillar Intern",
    description: "Notification Service Engine",
    image: "./img/cat.jpg",
    link: "https://digital.cat.com/",
    type: "github",
    tags: ["Java", "Scala", "AWS", "Swagger"]
  },
  {
    id: 12,
    title: "Various Game Projects",
    description: "VR, Gamejams, and More",
    image: "./img/game.jpg",
    link: "https://github.com/dbezugliy/various-game-projects",
    type: "github",
    tags: ["C++", "Q/A", "Unreal"]
  },
  {
    id: 13,
    title: "Homemade Laser Tag",
    description: "Client-Server Architecture",
    image: "./img/laser_gun.PNG",
    link: "https://github.com/dbezugliy/Laser-Tag-System",
    type: "github",
    tags: ["Python", "IoT", "Multithreading"]
  },
  {
    id: 15,
    title: "Extended WhisperX Tool",
    description: "AI Transcription for After Effects",
    image: "./img/whisper.PNG",
    link: "https://github.com/dbezugliy/Extended-WhisperX-AfterEffects",
    type: "github",
    tags: ["Python", "JavaScript", "PyTorch"]
  },
  {
    id: 14,
    title: "This Portfolio",
    description: "Woah, you found it!",
    image: "./img/portfolio.PNG",
    link: "https://github.com/dbezugliy/studio",
    type: "github",
    tags: ["React", "Tailwind CSS", "Vite"]
  },
  {
    id: 15,
    title: "MBTI Tweet Analysis",
    description: "Machine Learning Classification",
    image: "./img/tweet_results.png",
    link: "https://github.com/dbezugliy/mbti-tweet-analysis",
    type: "github",
    tags: ["Python", "TF-IDF", "Word2Vec"]
  }
];

// ===== EXPERIMENTAL PROJECTS CONFIGURATION =====
const VIDEO_EXPERIMENTAL_PROJECTS = [
  {
    id: 16,
    media: "./img/experiment/video_1.mp4",
    type: "video",
    text: "GeoLayers in After Effects"
  },
  {
    id: 17,
    media: "./img/experiment/video_2.mp4",
    type: "video",
    text: "Gaussian Splatting in After Effects"
  }
];

const CODING_EXPERIMENTAL_PROJECTS = [
  {
    id: 18,
    img: "./img/experiment/touch.jpg",
    type: "image", // Added type field
    text: "Customizable Pressure Keys via Arduino"
  },
  {
    id: 19,
    media: "./img/experiment/coding_1.mp4",
    type: "video",
    text: "OBS Global Hotkey Tracker"
  },
];

// ===== ABOUT ME CONFIGURATION =====
const ABOUT_ME = {
  title: "My Portfolio!",
  tags: ["Video Editor", "Software Engineer", "Ukrainian"],
  description: {
    bold: "Ukrainian VFX / Software Developer based in Chicago",
    normal: "\n \nVisual storytelling and expression has always been a passion of mine, whether through video editing or crafting code to build innovative software solutions."
  },
  image: "./img/me.jpg"
};

// ===== COMPONENT: PROJECT CARD =====
const ProjectCard = ({ project, colors }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a 
      href={project.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block rounded-1g overflow-hidden"
      style={{ 
        borderColor: colors.border,
        backgroundColor: colors.cardBg
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full" style={{ paddingBottom: '56.25%', position: 'relative' }}>
        <img 
          src={project.image} 
          alt={project.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{
            border: isHovered ? `2px dashed ${colors.text}` : `2px solid ${colors.border}`
          }}
        />
      </div>
      <div className="p-2">
        <h3 
          className="text-lg font-bold mb-0.5 inline-block px-2 py-1 -ml-2 -mr-2"
          style={{ 
            color: isHovered ? '#000000' : colors.text,
            fontFamily: FONTS.headings,
            backgroundColor: isHovered ? colors.primaryHover : 'transparent'
          }}
        >
          {project.title}
        </h3>
        <p className="text-sm mb-3" style={{ 
          color: colors.textLight,
          fontFamily: FONTS.body
        }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tags.map(tag => (
            <span 
              key={tag}
              className="text-xs px-2 py-1 rounded"
              style={{ 
                backgroundColor: colors.tagsBg,
                color: colors.text 
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

// ===== COMPONENT: EXPERIMENTAL SLIDESHOW =====
const ExperimentalSlideshow = ({ projects, colors }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + projects.length) % projects.length);
  };

  // Create a ref to store the timer
  const timerRef = useRef(null);

  // Auto-rotate every 10 seconds with reset capability
  useEffect(() => {
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Set new timer
    timerRef.current = setInterval(nextSlide, 10000);
    
    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [projects.length]);

  const handleNextSlide = () => {
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Go to next slide
    nextSlide();
    
    // Reset timer
    timerRef.current = setInterval(nextSlide, 10000);
  };

  const handlePrevSlide = () => {
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Go to previous slide
    prevSlide();
    
    // Reset timer
    timerRef.current = setInterval(nextSlide, 10000);
  };

  return (
    <div 
      className="relative w-full min-h-[400px] lg:col-start-3 lg:row-start-1 lg:row-span-2 flex flex-col"
      style={{ border: `2px dashed ${colors.primary}` }}
    >
      <div className="p-4 border-b-2" style={{ borderColor: colors.primary }}>
        <h3 className="text-lg font-bold" style={{ color: colors.text, fontFamily: FONTS.headings }}>
          DAILY EXPERIMENTALS
        </h3>
      </div>
      <div className="relative flex-1 overflow-hidden">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="absolute top-0 left-0 w-full h-full"
            style={{ opacity: index === currentSlide ? 1 : 0 }}
          >
            {project.type === "video" ? (
              <video
                src={project.media}
                className="w-full h-full object-cover"
                muted
                autoPlay
                loop
                playsInline
              />
            ) : (
              <img
                src={project.img || project.media}
                alt={project.text}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}

        <div className="absolute bottom-4 left-4 right-4 z-10">
          <span 
            className="text-white text-sm font-bold p-2"
            style={{ backgroundColor: colors.primary }}
          >
            {projects[currentSlide].text}
          </span>
        </div>

        {/* Prev Button */}
        <button
          onClick={handlePrevSlide}
          className="absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors cursor-pointer"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={handleNextSlide}
          className="absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors cursor-pointer"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// ===== COMPONENT: HORIZONTAL SWITCH =====
const HorizontalSwitch = ({ leftLabel, rightLabel, value, onChange, colors, labelStyle }) => {
  const getButtonStyle = (side) => ({
    backgroundColor: value === side ? colors.primary : 'transparent',
    color: value === side ? '#ffffff' : colors.text,
    fontFamily: labelStyle?.fontFamily || 'inherit',
    borderBottom: value === side ? 'none' : `2px solid transparent`,
    cursor: 'pointer',
  });

  const handleHover = (e, side, isEntering) => {
    if (value !== side) {
      e.target.style.borderBottom = isEntering
        ? `2px solid ${colors.primary}`
        : '2px solid transparent';
    }
  };

  return (
    <div className="inline-flex overflow-hidden">
      <button
        onClick={() => onChange('left')}
        className="px-4 py-2 text-sm font-bold"
        style={getButtonStyle('left')}
        onMouseEnter={(e) => handleHover(e, 'left', true)}
        onMouseLeave={(e) => handleHover(e, 'left', false)}
      >
        {leftLabel}
      </button>
      <button
        onClick={() => onChange('right')}
        className="px-4 py-2 text-sm font-bold"
        style={getButtonStyle('right')}
        onMouseEnter={(e) => handleHover(e, 'right', true)}
        onMouseLeave={(e) => handleHover(e, 'right', false)}
      >
        {rightLabel}
      </button>
    </div>
  );
};




// ===== MAIN COMPONENT =====
const Portfolio = () => {
  // Check URL for initial mode
  const getInitialMode = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('mode') === 'coding' ? 'coding' : 'video';
    }
    return 'video';
  };

  const [activePage, setActivePage] = useState('Home');
  const [isAboutMeHovered, setIsAboutMeHovered] = useState(false);
  const [portfolioMode, setPortfolioMode] = useState(getInitialMode);
  
  const [videoFilter, setVideoFilter] = useState('left'); // 'left' = standard, 'right' = short form

  // Update URL when mode changes
  const handleModeChange = (newMode) => {
    setPortfolioMode(newMode);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      url.searchParams.set('mode', newMode);
      window.history.pushState({}, '', url);
    }
  };

  // Get current colors based on mode
  const currentColors = portfolioMode === 'coding' 
    ? { ...COLORS, ...CODING_COLORS }
    : { ...COLORS, ...VIDEO_COLORS };

  // Get current projects based on mode
  const currentProjects = portfolioMode === 'coding' ? CODING_PROJECTS : VIDEO_PROJECTS;

  // Get current experimental projects based on mode
  const currentExperimentalProjects = portfolioMode === 'coding' 
    ? CODING_EXPERIMENTAL_PROJECTS 
    : VIDEO_EXPERIMENTAL_PROJECTS;

  // Filter projects for the 'Projects' page
  const filteredProjects = currentProjects.filter(project => {
    if (activePage !== 'Projects' || portfolioMode !== 'video') {
      return true; // Show all projects on 'Home' or in 'coding' mode
    }

    const isShort = project.tags.includes('Short');
    if (videoFilter === 'left') {
      return !isShort; // Show only standard (non-short)
    } else {
      return isShort; // Show only short form
    }
  });

  return (
    <div style={{ backgroundColor: currentColors.background }} className="min-h-screen">
      {/* Font Face Declarations */}
      <style>{`
        @font-face {
          font-family: 'Boldstrom';
          src: url('./fonts/Boldstrom.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }
          @font-face {
          font-family: 'Helvetica';
          src: url('./fonts/HelveticaNeueMedium.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }
      `}</style>

      {/* Navigation */}
      <nav className="border-b-2" style={{ borderColor: currentColors.border }}>
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-12 md:pb-8">
          {/* Mobile Layout */}
          <div className="flex flex-col gap-4 md:hidden">
            {/* Title on top for mobile */}
            <h1 
              className="text-4xl font-bold text-center cursor-pointer hover:opacity-70 transition-opacity"
              style={{ 
                color: currentColors.primary,
                fontFamily: FONTS.navTitle
              }}
              onClick={() => handleModeChange(portfolioMode === 'video' ? 'coding' : 'video')}
            >
              DANIEL BEZUGLIY
            </h1>
            
            {/* Navigation and icons below */}
            <div className="flex items-center justify-between">
              {/* Left - Navigation Links */}
              <div className="flex gap-3">
                {['Home', 'Projects', 'Contact'].map(page => (
                  <button
                    key={page}
                    onClick={() => setActivePage(page)}
                    className="text-xs font-medium pb-1 transition-colors cursor-pointer"
                    style={{
                      color: activePage === page ? currentColors.navActive : currentColors.text,
                      borderBottom: activePage === page ? `2px solid ${currentColors.navActive}` : 'none'
                    }}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              {/* Right - Social Icons */}
              <div className="flex gap-2 items-center">
                <a 
                  href="https://www.youtube.com/@Phasmik" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-50"
                >
                  <svg className="w-4 h-4" style={{ fill: currentColors.text }} viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a 
                  href="https://github.com/dbezugliy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-50"
                >
                  <svg className="w-4 h-4" style={{ fill: currentColors.text }} viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            {/* Left - Navigation Links */}
            <div className="flex gap-8">
              {['Home', 'Projects', 'Contact'].map(page => (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  className="text-sm font-medium pb-1 cursor-pointer"
                  style={{
                    color: activePage === page ? currentColors.navActive : currentColors.text,
                    borderBottom: activePage === page ? `2px solid ${currentColors.navActive}` : '2px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (activePage !== page) e.target.style.borderBottom = '2px solid white';
                  }}
                  onMouseLeave={(e) => {
                    if (activePage !== page) e.target.style.borderBottom = '2px solid transparent';
                  }}
                >
                  {page}
                </button>
              ))}
            </div>
            
            {/* Center - Title */}
            <h1 
              className="text-4xl lg:text-6xl font-bold absolute left-1/2 transform -translate-x-1/2 cursor-pointer hover:opacity-70 transition-opacity whitespace-nowrap"
              style={{ 
                color: currentColors.primary,
                fontFamily: FONTS.navTitle
              }}
              onClick={() => handleModeChange(portfolioMode === 'video' ? 'coding' : 'video')}
            >
              DANIEL BEZUGLIY
            </h1>
            
            {/* Right - Social Icons */}
            <div className="flex gap-4 items-center">
              <a 
                href="https://www.youtube.com/@Phasmik" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-50"
              >
                <svg className="w-6 h-6" style={{ fill: currentColors.text }} viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/dbezugliy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-50"
              >
                <svg className="w-6 h-6" style={{ fill: currentColors.text }} viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pt-8 py-12">
        {activePage === 'Home' && (
          <>
            {/* Desktop Layout */}
            <div 
              className="hidden lg:grid grid-cols-[1fr_auto_2fr_auto_1fr] gap-6 items-stretch"
              style={{ gridTemplateAreas: '"left divider-left center divider-right right"' }}
            >
              {/* Left Column - 2 Projects */}
              <div style={{ gridArea: 'left' }} className="space-y-6">
                <ProjectCard project={currentProjects[0]} colors={currentColors} />
                <ProjectCard project={currentProjects[1]} colors={currentColors} />
              </div>

              {/* Left Divider */}
              <div 
                style={{ 
                  gridArea: 'divider-left',
                  backgroundColor: currentColors.border,
                  width: '2px'
                }}
              />

              {/* Center Column - About Me */}
              <div style={{ gridArea: 'center' }}>
                <div 
                  className="shadow-sm h-full"
                  style={{ backgroundColor: currentColors.cardBg}}
                >
                  <div
                    onClick={() => handleModeChange(portfolioMode === 'video' ? 'coding' : 'video')}
                    className="block cursor-pointer overflow-visible"
                    onMouseEnter={() => setIsAboutMeHovered(true)}
                    onMouseLeave={() => setIsAboutMeHovered(false)}
                  >
                    <div className="relative">
                      <img 
                        src={ABOUT_ME.image}
                        alt="About Me"
                        className="w-full h-105 object-cover object-[center_77%] scale-100"
                        style={{ 
                          border: isAboutMeHovered ? `2px dashed ${currentColors.text}` : `2px solid ${currentColors.border}`
                        }}
                      />
                    </div>
                  </div>
                  <div className="p-8 text-center">
                    <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3" style={{ 
                      color: currentColors.text,
                      fontFamily: FONTS.headings
                    }}>
                      <span>My</span>
                      
                      {/* Horizontal Slider */}
                      <div 
                        className="inline-flex cursor-pointer"
                        onClick={() => handleModeChange(portfolioMode === 'video' ? 'coding' : 'video')}
                      >
                        <div 
                          className="px-1 py-1 transition-all duration-200"
                          style={{
                            backgroundColor: portfolioMode === 'video' ? currentColors.primary : 'transparent',
                            color: portfolioMode === 'video' ? '#ffffff' : currentColors.textLight,
                            opacity: portfolioMode === 'video' ? 1 : 0.5
                          }}
                        >
                          Video
                        </div>
                        <div 
                          className="py-1"
                          style={{ color: currentColors.textLight }}
                        >
                          /
                        </div>
                        <div 
                          className="px-1 py-1 transition-all duration-200"
                          style={{
                            backgroundColor: portfolioMode === 'coding' ? currentColors.primary : 'transparent',
                            color: portfolioMode === 'coding' ? '#ffffff' : currentColors.textLight,
                            opacity: portfolioMode === 'coding' ? 1 : 0.5
                          }}
                        >
                          Coding
                        </div>
                      </div>
                      
                      <span>Portfolio!</span>
                    </h2>
                    
                    <p className="text-base leading-relaxed whitespace-pre-line" style={{ 
                      color: currentColors.textLight,
                      fontFamily: FONTS.body
                    }}>
                      <span className="font-bold">{ABOUT_ME.description.bold}</span>
                      {ABOUT_ME.description.normal}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Divider */}
              <div 
                style={{ 
                  gridArea: 'divider-right',
                  backgroundColor: currentColors.border,
                  width: '2px'
                }}
              />

              {/* Right Column - 2 Projects */}
              <div style={{ gridArea: 'right' }} className="space-y-6">
                <ProjectCard project={currentProjects[2]} colors={currentColors} />
                <ProjectCard project={currentProjects[3]} colors={currentColors} />
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-6">
              {/* About Me Section */}
              <div 
                className="shadow-sm"
                style={{ backgroundColor: currentColors.cardBg}}
              >
                <div
                  onClick={() => handleModeChange(portfolioMode === 'video' ? 'coding' : 'video')}
                  className="block cursor-pointer overflow-visible"
                  onMouseEnter={() => setIsAboutMeHovered(true)}
                  onMouseLeave={() => setIsAboutMeHovered(false)}
                >
                  <div className="relative">
                    <img 
                      src={ABOUT_ME.image}
                      alt="About Me"
                      className="w-full h-64 md:h-96 object-cover object-[center_77%]"
                      style={{ 
                        border: isAboutMeHovered ? `2px dashed ${currentColors.text}` : `2px solid ${currentColors.border}`
                      }}
                    />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center gap-2 md:gap-3 flex-wrap" style={{ 
                    color: currentColors.text,
                    fontFamily: FONTS.headings
                  }}>
                    <span>My</span>
                    
                    {/* Horizontal Slider */}
                    <div 
                      className="inline-flex cursor-pointer text-xl md:text-3xl"
                      onClick={() => handleModeChange(portfolioMode === 'video' ? 'coding' : 'video')}
                    >
                      <div 
                        className="px-2 md:px-3 py-1 transition-all duration-300"
                        style={{
                          backgroundColor: portfolioMode === 'video' ? currentColors.primary : 'transparent',
                          color: portfolioMode === 'video' ? '#ffffff' : currentColors.textLight,
                          opacity: portfolioMode === 'video' ? 1 : 0.5
                        }}
                      >
                        Video
                      </div>
                      <div 
                        className="px-1 md:px-2 py-1"
                        style={{ color: currentColors.textLight }}
                      >
                        /
                      </div>
                      <div 
                        className="px-2 md:px-3 py-1 transition-all duration-300"
                        style={{
                          backgroundColor: portfolioMode === 'coding' ? currentColors.primary : 'transparent',
                          color: portfolioMode === 'coding' ? '#ffffff' : currentColors.textLight,
                          opacity: portfolioMode === 'coding' ? 1 : 0.5
                        }}
                      >
                        Coding
                      </div>
                    </div>
                    
                    <span>Portfolio!</span>
                  </h2>
                  
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-line" style={{ 
                    color: currentColors.textLight,
                    fontFamily: FONTS.body
                  }}>
                    <span className="font-bold">{ABOUT_ME.description.bold}</span>
                    {ABOUT_ME.description.normal}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div 
                style={{ 
                  backgroundColor: currentColors.border,
                  height: '2px',
                  width: '100%'
                }}
              />

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentProjects.map(project => (
                  <ProjectCard key={project.id} project={project} colors={currentColors} />
                ))}
              </div>
            </div>
          </>
        )}

        {activePage === 'Projects' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
              <h2 className="text-3xl font-bold" style={{ color: currentColors.text, fontFamily: FONTS.headings}}>
                PROJECTS
              </h2>
              {portfolioMode === 'video' && (
                <HorizontalSwitch
                  leftLabel="Standard"
                  rightLabel="Short Form"
                  value={videoFilter}
                  onChange={setVideoFilter}
                  colors={currentColors}
                  labelStyle={{ fontFamily: FONTS.headings }}
                />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} colors={currentColors} />
              ))}
              {/* Experimental Slideshow, forced into col 3, row 1, spanning 2 rows on large screens */}
              <ExperimentalSlideshow projects={currentExperimentalProjects} colors={currentColors} />
            </div>
          </div>
        )}

        {activePage === 'Contact' && (
          <div className="max-w-2xl mx-auto text-center ">
            <div 
              className="rounded-lg p-8 shadow-sm border"
              style={{ 
                borderColor: currentColors.border,
                backgroundColor: currentColors.cardBg
              }}
            >
              <h2 className="text-3xl font-bold mb-6" style={{ color: currentColors.text }}>
                Get In Touch
              </h2>
              <p className="text-lg mb-6" style={{ color: currentColors.textLight }}>
                I promise I don't bite, so feel free to reach out!
              </p>
              <div className="space-y-4">
                <a 
                  href="mailto:danny.bezugliy@gmail.com"
                  className="block px-6 py-3 rounded-lg text-white text-center font-medium transition-colors"
                  style={{ 
                    backgroundColor: currentColors.primary,
                  }}
                  onMouseEnter={e => e.target.style.backgroundColor = currentColors.primaryHover}
                  onMouseLeave={e => e.target.style.backgroundColor = currentColors.primary}
                >
                  Email Me
                </a>
                <div className="flex gap-4 justify-center pt-4">
                  <a href="https://github.com/dbezugliy/" target="_blank" rel="noopener noreferrer" 
                     className="text-2xl" style={{ color: currentColors.text }}>GitHub</a>
                  <a href="https://www.youtube.com/@Phasmik" target="_blank" rel="noopener noreferrer" 
                     className="text-2xl" style={{ color: currentColors.text }}>YouTube</a>
                  <a href="https://www.linkedin.com/in/daniel-bezugliy-6263a8192/" target="_blank" rel="noopener noreferrer" 
                     className="text-2xl" style={{ color: currentColors.text }}>LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;