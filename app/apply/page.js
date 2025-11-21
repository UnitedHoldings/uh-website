'use client';
import FormBuilder from "@/components/Apply/FormBuilder";
import Applications from "@/components/Apply/Applications";
import { useState } from "react";


export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function Apply() {
  const [activeView, setActiveView] = useState("form");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* United Holdings Styled Header */}
      <header className="bg-white shadow-lg border-b-2 border-[#9b1c20]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            {/* United Holdings Logo */}
            <div className="mb-4">
              <div className="w-20 h-20 mx-auto bg-[#9b1c20] rounded-full flex items-center justify-center mb-3 shadow-lg">
                <span className="text-white text-2xl font-bold font-oswald">UH</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-3 font-oswald">
              United Holdings Application Portal
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {activeView === "form" 
                ? "Begin your journey with Eswatini's leading financial services group" 
                : "Manage and review all submitted applications"}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button
              onClick={() => setActiveView("form")}
              className={`
                px-6 sm:px-8 py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 
                border-2 min-w-[160px] sm:min-w-[180px] transform hover:scale-105 hover:shadow-lg
                flex items-center justify-center gap-2
                ${activeView === "form"
                  ? "bg-gradient-to-r from-[#9b1c20] to-[#7a1619] text-white shadow-lg border-transparent"
                  : "bg-white text-gray-700 border-gray-300 hover:border-[#9b1c20] hover:text-[#9b1c20]"
                }
              `}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              New Application
            </button>
            
            <button
              onClick={() => setActiveView("applications")}
              className={`
                px-6 sm:px-8 py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 
                border-2 min-w-[160px] sm:min-w-[180px] transform hover:scale-105 hover:shadow-lg
                flex items-center justify-center gap-2
                ${activeView === "applications"
                  ? "bg-gradient-to-r from-[#9b1c20] to-[#7a1619] text-white shadow-lg border-transparent"
                  : "bg-white text-gray-700 border-gray-300 hover:border-[#9b1c20] hover:text-[#9b1c20]"
                }
              `}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              View Applications
            </button>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-3 gap-3 max-w-2xl mx-auto">
            <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-xl sm:text-2xl font-bold text-[#9b1c20]">3</div>
              <div className="text-xs sm:text-sm text-gray-600">Companies</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-xl sm:text-2xl font-bold text-[#9b1c20]">50+</div>
              <div className="text-xs sm:text-sm text-gray-600">Team Members</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-xl sm:text-2xl font-bold text-[#9b1c20]">80+</div>
              <div className="text-xs sm:text-sm text-gray-600">Years Legacy</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeView === "form" ? <FormBuilder /> : <Applications />}
      </main>

    
    </div>
  );
}

export default Apply;