import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Headers() {
  const nodes = useRef([]);
  const edges = useRef([]);
  const leftElements = useRef([]);
  const buttonRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // Graph animation (right side)
    gsap.from(nodes.current, {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out",
      onComplete: animateGraph
    });

    gsap.from(edges.current, {
      strokeDashoffset: 100,
      duration: 1,
      stagger: 0.1,
      delay: 0.5
    });

    // Left side animations
    gsap.from(leftElements.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      delay: 0.3
    });

    // Particle animation
    animateParticles();

    // Continuous animations
    animateLeftSide();
    animateButton();
  }, []);

  const animateGraph = () => {
    nodes.current.forEach((node, i) => {
      gsap.to(node, {
        scale: 1.1,
        duration: 0.8,
        delay: i * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  };

  const animateParticles = () => {
    const particles = particlesRef.current.children;
    gsap.fromTo(particles, 
      { opacity: 0, y: 20 },
      {
        opacity: 0.6,
        y: 0,
        duration: 1.5,
        stagger: 0.1,
        delay: 0.5,
        ease: "sine.out"
      }
    );
  };

  const animateLeftSide = () => {
    gsap.to(leftElements.current, {
      y: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });

    gsap.to(".animated-heading", {
      backgroundPosition: "100% 50%",
      duration: 8,
      repeat: -1,
      ease: "none"
    });
  };

  const animateButton = () => {
    gsap.to(buttonRef.current, {
      scale: 1.02,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".button-glow", {
      opacity: 0.3,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  };

  return (
    <header className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-[#E2E8F0] flex items-center overflow-hidden relative">
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-sky-400/20"
            style={{
              width: `${Math.random() * 6 + 2}px`, 
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 py-24">
        {/* Left side - Text content */}
        <div className="space-y-8">
          <h1 
            ref={el => leftElements.current[0] = el}
            className="text-6xl md:text-7xl font-bold animated-heading leading-tight"
            style={{
              background: "linear-gradient(90deg, #E2E8F0, #7DD3FC, #A78BFA, #E2E8F0)",
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent"
            }}
          >
            <span className="block">Algorithm</span>
            <span className="text-sky-400">Visualizer</span>
          </h1>
          
          <p 
            ref={el => leftElements.current[1] = el}
            className="text-xl text-slate-300 max-w-lg"
          >
            Experience computer science concepts through interactive animations and step-by-step visualizations
          </p>
          
          <div className="relative inline-block">
            <button
              ref={buttonRef}
              className="px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                Start Exploring
                <svg 
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="button-glow absolute inset-0 bg-white/10 opacity-0"></div>
            </button>
          </div>
        </div>

        {/* Right side - Graph Visualization */}
       <div className="relative w-full h-96">
  <div className="absolute inset-0 bg-sky-900/10 rounded-2xl backdrop-blur-sm border border-sky-800/30"></div>
  <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
    {/* Edges */}
    <line 
      ref={el => edges.current[0] = el}
      x1="80" y1="180" x2="200" y2="90" 
      stroke="#7DD3FC" 
      strokeWidth="3"
      strokeDasharray="150"
    />
    <line 
      ref={el => edges.current[1] = el}
      x1="100" y1="160" x2="200" y2="250" 
      stroke="#7DD3FC" 
      strokeWidth="3"
      strokeDasharray="150"
    />
    <line 
      ref={el => edges.current[2] = el}
      x1="200" y1="90" x2="300" y2="90" 
      stroke="#A78BFA"
      strokeWidth="3"
      strokeDasharray="100"
    />
    
    {/* Nodes */}
    <g ref={el => nodes.current[0] = el}>
      <circle cx="100" cy="160" r="27" fill="#0EA5E9" />
      <text x="100" y="165" textAnchor="middle" fill="white" className="font-mono text-sm" fontSize="12">Start</text>
    </g>
    <g ref={el => nodes.current[1] = el}>
      <circle cx="200" cy="80" r="27" fill="#0EA5E9" />
      <text x="200" y="85" textAnchor="middle" fill="white" className="font-mono text-sm" fontSize="12">Node</text>
    </g>
    <g ref={el => nodes.current[2] = el}>
      <circle cx="200" cy="250" r="27" fill="#0EA5E9" />
      <text x="200" y="255" textAnchor="middle" fill="white" className="font-mono text-sm" fontSize="12">Edge</text>
    </g>
    <g ref={el => nodes.current[3] = el}>
      <circle cx="300" cy="80" r="27" fill="#0EA5E9" />
      <text x="300" y="85" textAnchor="middle" fill="white" className="font-mono text-sm" fontSize="12">End</text>
    </g>
  </svg>
</div>
      </div>
    </header>
  );
}