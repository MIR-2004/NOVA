import { useState, useEffect, useRef } from 'react';

const InteractiveGlassInterface = () => {
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [activeSection, setActiveSection] = useState(null);
  const [time, setTime] = useState(new Date());
  const containerRef = useRef(null);

  const sections = [
    { id: 'work', title: 'Work', subtitle: 'Projects & Tasks' },
    { id: 'personal', title: 'Personal', subtitle: 'Life & Goals' },
    { id: 'creative', title: 'Creative', subtitle: 'Ideas & Art' }
  ];

  const content = {
    work: {
      main: 'Focus Mode',
      stats: ['3 Active Projects', '12 Tasks Today', '89% Complete'],
      action: 'Start Working'
    },
    personal: {
      main: 'Life Balance',
      stats: ['5 Goals This Month', '2 Habits Tracked', '4 Days Streak'],
      action: 'Track Progress'
    },
    creative: {
      main: 'Inspiration',
      stats: ['8 New Ideas', '3 Sketches Done', '1 Project Draft'],
      action: 'Create Something'
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = (e.clientY - centerY) / 30;
    const rotateY = (centerX - e.clientX) / 30;
    
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const currentContent = activeSection ? content[activeSection] : null;

  return (
    <div 
      ref={containerRef}
      className="mt-16"
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
        <div 
          style={{ 
            transformStyle: 'preserve-3d',
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transition: 'transform 0.3s ease-out'
          }}
          className="relative mx-auto w-[90vw] max-w-4xl h-72 md:h-96 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg overflow-hidden"
        >
          {/* Animated background */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10"
            style={{
              animation: 'pulse 4s ease-in-out infinite',
              opacity: 0.6
            }}
          />
          
          <div className="absolute inset-0 grid grid-cols-3 gap-2 p-4">
            {/* Top row - Interactive sections */}
            {sections.map((section, index) => (
              <div 
                key={section.id}
                className={`rounded-lg border cursor-pointer transition-all duration-300 ${
                  activeSection === section.id 
                    ? 'bg-blue-500/20 border-white/40' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'
                }`}
                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              >
                <div className="p-3 h-full flex flex-col justify-center">
                  <div className="text-white text-sm font-medium mb-1">{section.title}</div>
                  <div className="text-white/60 text-xs">{section.subtitle}</div>
                  {activeSection === section.id && (
                    <div className="mt-2 w-1 h-1 bg-white rounded-full mx-auto animate-pulse" />
                  )}
                </div>
              </div>
            ))}

            {/* Middle section - Dynamic content */}
            <div className="col-span-2 rounded-lg bg-white/5 border border-white/10">
              <div className="p-4 h-full flex flex-col justify-center">
                {currentContent ? (
                  <div className="text-center space-y-3">
                    <h2 className="text-white text-xl font-light">{currentContent.main}</h2>
                    <div className="space-y-1">
                      {currentContent.stats.map((stat, i) => (
                        <div key={i} className="text-white/70 text-sm">{stat}</div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-white text-lg font-light mb-2">
                      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="text-white/60 text-sm">Click a section to explore</div>
                  </div>
                )}
              </div>
            </div>

            {/* Status indicator */}
            <div className="rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                activeSection ? 'bg-green-400 animate-pulse' : 'bg-white/40'
              }`} />
            </div>

            {/* Bottom section */}
            <div className="rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-white/60 text-sm">Tools</span>
            </div>

            <div className="col-span-2 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 border border-white/10 h-16 md:h-24 flex items-center justify-center">
              {currentContent ? (
                <button className="px-6 py-2 rounded-lg bg-white/20 hover:bg-white/30 border border-white/30 text-white text-sm transition-all duration-200">
                  {currentContent.action}
                </button>
              ) : (
                <span className="text-white/70 text-sm">Ready to Begin</span>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default InteractiveGlassInterface;