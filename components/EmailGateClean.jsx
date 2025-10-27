"use client"
import React, { useEffect, useState } from 'react'

// Employee data from the champions list
const ALLOWED_EMPLOYEES = [
  {name: "PHILLIP DE SOUSA", email: "pdsousa@united.co.sz", position: "EXECUTIVE CHAIRMAN" },
  { name: "LUNGILE NGWENYA", email: "csrmanager@united.co.sz", position: "CORPORATE SALES & RETENTION MANAGER" },
  { name: "LOVEMORE GUNDANI", email: "ugimanager@united.co.sz", position: "UGI OPERATIONS MANAGER" },
  { name: "SEBENELE ZWANE", email: "upmanager@united.co.sz", position: "UP OPERATIONS MANAGER" },
  { name: "SIHLE DLAMINI", email: "ulamanager@united.co.sz", position: "ULA OPERATIONS MANAGER" },
  { name: "WINILE SIBANDZE", email: "co.secandlegal@united.co.sz", position: "GROUP COMPANY SECRETARY & LEGAL" },
  { name: "SIMEON SIMELANE", email: "lamanager@united.co.sz", position: "GROUP INTERNAL AUDIT MANAGER" },
  { name: "NOZWELETHU NXUMALO", email: "rsetailsalesmanager@united.co.sz", position: "RETAIL SALES MANAGER" },
  { name: "PETER MASEKO", email: "fm@united.co.sz", position: "FINANCE MANAGER" },
  { name: "JUSTICE DLAMINI", email: "itmanager@united.co.sz", position: "ICT MANAGER" },
  { name: "MHLONIPHENI MASIELLA", email: "gr.asistantMM@united.co.sz", position: "ACTING MARKETING MANAGER" },
  { name: "NCAMILE MKHATSHWA", email: "legalandadminofficer@united.co.sz", position: "ACTING GROUP RISK & COMPLIANCE MANAGER" },
  { name: "COLANI NGWENYA", email: "assistantgroupHRM@united.co.sz", position: "ACTING GROUP HUMAN RESOURCES MANAGER" },
  { name: "THABANI DLAMINI", email: "financeofficer1@united.co.sz", position: "FINANCE OFFICER" },
  { name: "PHILLIE MPILA", email: "collectionsofficer6@united.co.sz", position: "COLLECTIONS OFFICER" },
  { name: "NOZIPHO VILANE", email: "collectionsofficer7@united.co.sz", position: "COLLECTIONS OFFICER" },
  { name: "NOMFUNDO ZWANE", email: "hrofficer.admin@united.co.sz", position: "HUMAN RESOURCES OFFICER" },
  { name: "BANDILE ZWANE", email: "systems@united.co.sz", position: "IT SYSTEMS ANALYST" },
  { name: "PROMISE NKUMALO", email: "internalauditorofficer2@united.co.sz", position: "INTERNAL AUDIT OFFICER" },
  { name: "GCINILE MOTSA", email: "marketingcommofficer@united.co.sz", position: "MARKERTING AND COMMS OFFICER" },
  { name: "ZANDILE MATSENJWA", email: "administstant3@united.co.sz", position: "ADMINISTRATIVE ASSISTANT" },
  { name: "THANDAZILE MAHLALELA", email: "administstant2@united.co.sz", position: "ADMINISTRATIVE ASSISTANT" },
  { name: "DANIEL NKALANGA", email: "branchcontroller9@united.co.sz", position: "BRANCH CONTROLLER" },
  { name: "NOKUBONGA SHABANGU", email: "salesofficer21@united.co.sz", position: "CUSTOMER SALES OFFICER" },
  { name: "BHEKITHEMBA MTSEFTWA", email: "extsalessupervisor@united.co.sz", position: "EXTERNAL SALES SUPERVISOR" },
  { name: "TEMALANGENI DIAMINI", email: "uglunderwriter1@united.co.sz", position: "UGI UNDERWRITING OFFICER" },
  { name: "SIMANGELE DLAMINI", email: "uglundersupervisor@united.co.sz", position: "UNDERWRITING SUPERVISOR" },
  { name: "MFANAFUTHI SIMELANE", email: "ulaunderwriter1@united.co.sz", position: "ULA UNDERWRITING OFFICER" },
  { name: "LUNGILE MNGOMETULU", email: "ulaclamsofticer3@united.co.sz", position: "CLAIMS OFFICER" },
  { name: "CYNTHIA GUMEDZE", email: "loansofficer@united.co.sz", position: "MICRO LOANS OFFICER" },
  { name: "NOMPENDULO QWABE", email: "creditcontrolofficer@united.co.sz", position: "CREDIT CONTROLLER" },
  { name: "JOSE REGO", email: "rego@ummo.xyz", position: "PROJECT MANAGER" },
  { name: "THEMBINKOSI MKHONTA", email: "dev@ummo.xyz", position: "DEVELOPER" },
]
const STORAGE_KEYS = {
  AUTH: 'uh_beta_auth_v1',
  ONBOARDING: 'uh_onboarding_completed_v1',
  SESSION: 'uh_session'
}

export default function BetaAuthGate() {
  const [showLogin, setShowLogin] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(1)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = () => {
    try {
      const authData = localStorage.getItem(STORAGE_KEYS.AUTH)
      const onboardingCompleted = localStorage.getItem(STORAGE_KEYS.ONBOARDING)
      
      if (authData) {
        const userData = JSON.parse(authData)
        setUser(userData)
        
        // Show onboarding if not completed
        if (!onboardingCompleted) {
          setShowOnboarding(true)
        } else {
          setShowLogin(false)
          setShowOnboarding(false)
        }
      } else {
        setShowLogin(true)
      }
    } catch (err) {
      setShowLogin(true)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const cleanEmail = email.trim().toLowerCase()
    const employee = ALLOWED_EMPLOYEES.find(emp => 
      emp.email.toLowerCase() === cleanEmail
    )

    if (employee) {
      // Simulate login process
      setTimeout(() => {
        const userData = {
          name: employee.name,
          email: employee.email,
          position: employee.position,
          loginTime: Date.now()
        }
        
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(userData))
        localStorage.setItem(STORAGE_KEYS.SESSION, 'active')
        setUser(userData)
        setShowLogin(false)
        setShowOnboarding(true)
        setLoading(false)
      }, 1000)
    } else {
      setError('Access restricted to United Holdings beta testers. Please use your company email.')
      setLoading(false)
    }
  }

  const completeOnboarding = () => {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING, 'true')
    setShowOnboarding(false)
  }

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH)
    localStorage.removeItem(STORAGE_KEYS.ONBOARDING)
    localStorage.removeItem(STORAGE_KEYS.SESSION)
    setUser(null)
    setShowLogin(true)
    setShowOnboarding(false)
  }

  // Login Modal
  if (showLogin) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-[#9b1c20] to-gray-800 p-4">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#9b1c20] to-[#7a1619] p-8 text-white text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">United Holdings</h1>
            <p className="text-white/80 text-lg">Website Beta Program</p>
            <div className="mt-4 bg-white/10 rounded-lg p-3">
              <p className="text-sm font-semibold">Exclusive Beta Tester Access</p>
              <p className="text-xs text-white/70 mt-1">October 25, 2025</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your United Holdings email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent transition-all"
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                Access is restricted to approved beta testers from the champions list
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#9b1c20] to-[#7a1619] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying Access...
                </span>
              ) : (
                'Access Beta Website'
              )}
            </button>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Having trouble? Contact ICT Manager at{' '}
                <a href="mailto:limanager@united.co.sz" className="text-[#9b1c20] hover:underline">
                  itmanager@united.co.sz
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Onboarding Flow
  if (showOnboarding) {
    return <OnboardingFlow 
      user={user}
      currentStep={currentOnboardingStep}
      onStepChange={setCurrentOnboardingStep}
      onComplete={completeOnboarding}
      onLogout={handleLogout}
    />
  }

  // Main application with user info
  return (
    <div className=" bg-gradient-to-br from-gray-50 to-gray-100">
      {/* User Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1820px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#9b1c20] to-[#7a1619] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.name?.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Welcome, {user?.name?.split(' ')[0]}</h1>
                <p className="text-sm text-gray-500">{user?.position}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                ✓ Beta Tester
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
   
    </div>
  )
}

// Onboarding Flow Component
function OnboardingFlow({ user, currentStep, onStepChange, onComplete, onLogout }) {
  const nextStep = () => onStepChange(currentStep + 1)
  const prevStep = () => onStepChange(currentStep - 1)

  const ProgressBar = () => (
    <div className="flex items-center justify-between mb-12">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-semibold transition-all duration-300 ${
              step === currentStep 
                ? 'bg-[#9b1c20] border-[#9b1c20] text-white' 
                : step < currentStep 
                ? 'bg-green-500 border-green-500 text-white' 
                : 'border-gray-300 text-gray-400'
            }`}>
              {step < currentStep ? '✓' : step}
            </div>
            <span className="text-sm mt-2 text-gray-600 font-medium">
              {['Welcome', 'Objectives', 'Testing'][step - 1]}
            </span>
          </div>
          {step < 3 && (
            <div className={`flex-1 h-1 mx-4 transition-all duration-300 ${
              step < currentStep ? 'bg-green-500' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#9b1c20] to-[#7a1619] rounded-full"></div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">United Holdings Beta Program</h1>
                <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Onboarding Content */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <ProgressBar />

        {/* Step 1: Welcome */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-[#9b1c20] to-[#7a1619] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to the UH Website Beta Program
              </h2>
              <p className="text-xl text-gray-600 mb-2">
                Exclusive Onboarding • October 27, 2025
              </p>
              <div className="bg-gradient-to-r from-[#9b1c20] to-[#7a1619] inline-block px-4 py-1 rounded-full">
                <p className="text-white font-semibold text-sm">Live With Purpose</p>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Thank you for joining as a beta tester!</h3>
                <p className="text-blue-800">
                  Your expertise and feedback are crucial in helping us build a better digital experience for our clients and team.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Verify Performance</h4>
                  <p className="text-gray-600 text-sm">
                    Achieve faster load times, better mobile experience, and improved reliability.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Improve Engagement</h4>
                  <p className="text-gray-600 text-sm">
                    Get more visitors to complete quotes and sign up for our products and services.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Gather Feedback</h4>
                  <p className="text-gray-600 text-sm">
                    Collect role-specific insights on how the site fits your business needs and objectives.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={nextStep}
                className="bg-gradient-to-r from-[#9b1c20] to-[#7a1619] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                Continue to Objectives →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Objectives */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Key Objectives and Your Pre-Launch Role
              </h2>
              <p className="text-xl text-gray-600">
                Help us achieve our digital transformation goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Acquisition</h3>
                <p className="text-blue-800 text-sm">
                  Attract prospects with a better web experience to grow UH business by +30% and reduce Cost of Client Acquisition by 10-25%.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Activation</h3>
                <p className="text-green-800 text-sm">
                  Engage users with fast, personalized journeys to increase quote completions +30-40%.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Revenue</h3>
                <p className="text-purple-800 text-sm">
                  Drive conversions via easier CTAs for all UH products across insurance, loans, and payments.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-3">Retention</h3>
                <p className="text-orange-800 text-sm">
                  Foster loyalty with self-service tools and multi-channel integration to boost returning visitors to 25-30%.
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="text-gray-600 hover:text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all"
              >
                ← Back
              </button>
              <button
                onClick={nextStep}
                className="bg-gradient-to-r from-[#9b1c20] to-[#7a1619] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                View Testing Activities →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Testing Activities */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Website Test Activities
              </h2>
              <p className="text-xl text-gray-600">
                Your mission as a beta tester
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Simulate Client Journeys</h3>
                <p className="text-gray-600 mb-4">
                  Browse through the website as if you were a client. Get quotes for Micro Loans, inquire about claims, start sign-up processes, and note any friction points.
                </p>
                <div className="bg-white rounded-lg p-4 border">
                  <p className="text-sm text-gray-500">
                    <strong>Example paths:</strong> Motor Insurance quote → Claims inquiry → Loan application
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Provide Role-Specific Feedback</h3>
                <p className="text-gray-600">
                  Complete feedback forms focusing on how the website redesign fits your specific role and KPIs. Consider how it supports lead generation, customer service, or operational efficiency.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Report Technical Issues</h3>
                <p className="text-gray-600">
                  Use the in-form fields to report any bugs, performance issues, or usability problems you encounter during testing.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#9b1c20] to-[#7a1619] rounded-xl p-6 text-white text-center mb-8">
              <h3 className="text-xl font-bold mb-2">Ready to Make an Impact?</h3>
              <p className="text-white/90">
                Your feedback will directly influence the future of United Holdings' digital presence.
              </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="text-gray-600 hover:text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all"
              >
                ← Back
              </button>
              <button
                onClick={onComplete}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                Start Testing Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}