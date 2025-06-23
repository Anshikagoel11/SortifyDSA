import { useState } from "react"

function Sorting_navBar({heading}) {
  return (
    <div className="mb-8">
      <div>
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-3xl font-bold mb-2 animate-pulse">
       {heading}
      </h1>
      <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
      </div>
      <div className="flex ">
       
      </div>
    </div>
  )
}


export default function Sorting() {
    const [heading , setHeading] = useState('')

  return (
    <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex min-h-screen">
      {/* Left sidebar with glass morphism effect */}
      <div className="w-[20%] bg-[#1E293B]/30 p-6 border-r border-gray-700/50 backdrop-blur-lg">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 text-xl font-bold mb-6 flex items-center">
          <span className="mr-2">📊</span> Sorting
        </h2>
        <div className="space-y-3">
          {['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'].map((item) => (
            <button 
            onClick={()=>{setHeading(item)}}
              key={item}
              className="text-white/90 group relative w-full text-left px-4 py-3 rounded-lg transition-all 
                        bg-gradient-to-r from-blue-400/10 to-blue-402 hover:shadow-lg shadow-blue-500/10
                        hover:-translate-y-0.5 duration-300 overflow-hidden"
            >
              <span className="relative z-10">{item}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 scale-x-0 
                              group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Main content area */}
      {/* right side */}
      <div className="w-[80%] p-8">
        <Sorting_navBar heading={heading}/>
        
        {/* Example content with animation */}
        <div className="bg-white/5 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Algorithm Visualizer</h2>
          </div>
          
          <div className="h-64 bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-lg flex items-end 
                          justify-center space-x-1 p-4 border border-gray-700/50">
            {[30, 80, 45, 90, 20, 60, 75, 40].map((height, index) => (
              <div 
                key={index}
                className="bg-gradient-to-t from-blue-400 to-cyan-300 w-8 rounded-t-md transition-all duration-500 hover:bg-cyan-400"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}