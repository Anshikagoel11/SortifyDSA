import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Headers() {
  const nodes = useRef([]);
  const edges = useRef([]);
  const leftElements = useRef([]);
  const buttonRef = useRef(null);

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

    // Continuous animations for left side
    animateLeftSide();
    animateButton();

  }, []);

  const animateGraph = () => {
    // Continuous pulsing of graph nodes
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

  const animateLeftSide = () => {
    // Floating animation for text elements
    gsap.to(leftElements.current, {
      y: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });

    // Continuous color pulse for the heading
    gsap.to(".animated-heading", {
      backgroundPosition: "100% 50%",
      duration: 8,
      repeat: -1,
      ease: "none"
    });
  };

  const animateButton = () => {
    // Button hover state animation
    gsap.to(buttonRef.current, {
      scale: 1.02,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Glow effect
    gsap.to(".button-glow", {
      opacity: 0.3,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  };

  return (
    <header className="bg-[#1E293B] text-[#E2E8F0]  flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left side - Text content */}
        <div className="space-y-8">
          <h1 
            ref={el => leftElements.current[0] = el}
            className="text-7xl md:text-6xl font-bold animated-heading"
            style={{
              background: "linear-gradient(90deg, #E2E8F0, #7DD3FC, #A78BFA, #E2E8F0)",
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text", //gardient bs text me show hoga
              color: "transparent" //taki ab text me bg color show ho
            }}
          >
            Visualize <span className="text-sky-400">Algorithms</span> in Action
          </h1>
          
          <p 
            ref={el => leftElements.current[1] = el}
            className="text-xl text-slate-300 italic p-3"
          >
            Step-by-step animations that bring data structures to life
          </p>
          
          <div className="relative inline-block">
            <button
              ref={buttonRef}
              className="px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Start Exploring
                <svg 
                  className="ml-2 h-5 w-5 transition-transform" 
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
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* Edges */}
            <line 
              ref={el => edges.current[0] = el}
              x1="100" y1="100" x2="200" y2="50" 
              stroke="#7DD3FC" 
              strokeWidth="2"
              strokeDasharray="100"
            />
            <line 
              ref={el => edges.current[1] = el} // edges array me index1 pe iss element ka reference assign kr rhe h
              x1="100" y1="100" x2="200" y2="150" 
              stroke="#7DD3FC" 
              strokeWidth="2"
              strokeDasharray="100"
            />
            <line 
              ref={el => edges.current[2] = el} // it draws A horizontal line from point (200, 50) ➝ (300, 50)
              x1="200" y1="50" x2="300" y2="50" 
              stroke="#A78BFA"  //line color
              strokeWidth="2"
              strokeDasharray="100"
            />
            
            {/* Nodes */}
            <g ref={el => nodes.current[0] = el}>
              <circle cx="100" cy="100" r="20" fill="#1E40AF" />
              <text x="100" y="105" textAnchor="middle" fill="white" className="font-mono">A</text>
            </g>
            <g ref={el => nodes.current[1] = el}>
              <circle cx="200" cy="50" r="20" fill="#1E40AF" />
              <text x="200" y="55" textAnchor="middle" fill="white" className="font-mono">B</text>
            </g>
            <g ref={el => nodes.current[2] = el}>
              <circle cx="200" cy="150" r="20" fill="#1E40AF" />
              <text x="200" y="155" textAnchor="middle" fill="white" className="font-mono">C</text>
            </g>
            <g ref={el => nodes.current[3] = el}>
              <circle cx="300" cy="50" r="20" fill="#1E40AF" />
              <text x="300" y="55" textAnchor="middle" fill="white" className="font-mono">D</text>
            </g>
          </svg>
        </div>
      </div>
    </header>
  );
}