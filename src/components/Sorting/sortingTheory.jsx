import { useParams } from "react-router-dom";
import { useState } from "react";
import sortingAlgorithms from "../../utils/data/sortingData";

export default function SortingTheory() {
  const { type } = useParams();
  const algo = sortingAlgorithms[type];
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);

  if (!algo) {
    return (
      <div className="text-red-500 p-4 md:p-6 bg-red-50/10 rounded-lg border border-red-900/50 text-sm md:text-base">
        Algorithm not found!
      </div>
    );
  }

  const currentCode = algo.code.find((c) => c.language === selectedLanguage);

  // Gradient text styles with larger text sizes
  const headingStyle = "text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text mb-3 md:mb-4";
  const subHeadingStyle = "text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-400 to-blue-300 text-transparent bg-clip-text mb-2 md:mb-3";

  return (
      <div className=" mt-6 md:mt-10 from-slate-800 to-slate-900 p-2 sm:p-6 md:p-8 rounded-xl shadow-2xl border border-slate-700/50 backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="space-y-4 md:space-y-6">
            <div className="bg-slate-800/50 p-4 md:p-5 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all">
              <h3 className={subHeadingStyle}>Definition</h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                {algo.definition}
              </p>
            </div>

            <div className="bg-slate-800/50 p-4 md:p-5 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all">
              <h3 className={subHeadingStyle}>How it works</h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                {algo.detailTheory}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 md:space-y-6">
            <div className="bg-slate-800/50 p-4 md:p-5 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all">
              <h3 className={subHeadingStyle}>Performance</h3>
              <div className="space-y-2 md:space-y-3">
                <div>
                  <h4 className="font-medium text-slate-400 mb-1 text-sm md:text-base">
                    Time Complexity
                  </h4>
                  <ul className="space-y-1 text-sm md:text-base text-slate-300">
                    <li className="flex justify-between">
                      <span>Best Case:</span>
                      <span className="font-mono bg-slate-900/50 px-2 py-1 rounded text-xs md:text-sm">
                        {algo.timeComplexity.best}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Average Case:</span>
                      <span className="font-mono bg-slate-900/50 px-2 py-1 rounded text-xs md:text-sm">
                        {algo.timeComplexity.average}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Worst Case:</span>
                      <span className="font-mono bg-slate-900/50 px-2 py-1 rounded text-xs md:text-sm">
                        {algo.timeComplexity.worst}
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-slate-400 mb-1 text-sm md:text-base">
                    Space Complexity
                  </h4>
                  <div className="font-mono bg-slate-900/50 px-2 py-1 rounded inline-block text-xs md:text-sm text-white">
                    {algo.spaceComplexity}
                  </div>
                </div>
              </div>
            </div>

            {algo.extra && (
              <div className="bg-blue-900/20 p-3 md:p-4 rounded-lg border border-blue-800/50">
                <div className="flex items-start">
                  <div className="text-blue-400 mr-2 mt-0.5">💡</div>
                  <div>
                    <h4 className="font-medium text-blue-300 mb-1 text-sm md:text-base">
                      Important Note
                    </h4>
                    <p className="text-blue-200/90 text-xs md:text-sm">
                      {algo.extra}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Code Section */}
        <div className="mt-6 md:mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 md:mb-4 gap-2 md:gap-3">
            <h3 className={headingStyle}>Implementation</h3>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex items-center">
                <label className="mr-2 text-slate-400 text-xs md:text-sm">
                  Language:
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-slate-800 text-white border border-slate-700 rounded-md px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {algo.code.map((c, i) => (
                    <option key={i} value={c.language}>
                      {c.language}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setIsCodeExpanded(!isCodeExpanded)}
                className="text-xs bg-slate-800 hover:bg-slate-700 px-2 md:px-3 py-1 md:py-1.5 rounded-md border border-slate-700 transition-colors"
              >
                {isCodeExpanded ? "Collapse" : "Expand"}
              </button>
            </div>
          </div>

          <div className={`bg-slate-900 overflow-x-auto rounded-lg border border-slate-700 overflow-hidden transition-all ${isCodeExpanded ? '' : 'max-h-96 overflow-y-auto'}`}>
  <pre className={`text-xs md:text-sm text-slate-200 p-3 md:p-5 whitespace-pre overflow-x-auto`}>
    <code>{currentCode?.code.trim()}</code>
  </pre>

  {!isCodeExpanded && (
    <div className="sticky bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-900 to-transparent flex items-end justify-center pb-2">
      <button 
        onClick={() => setIsCodeExpanded(true)}
        className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-md border border-slate-700 transition-colors"
      >
        Show More
      </button>
    </div>
  )}
</div>

        </div>
      </div>
  );
}