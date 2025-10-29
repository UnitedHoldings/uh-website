"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

// Employee data from the champions list
const ALLOWED_EMPLOYEES = [
  { name: "PHILIP DE SOUSA", email: "pdesousa@united.co.sz", position: "EXECUTIVE CHAIRMAN" },
  { name: "NELISIWE DE SOUSA", email: "ndesousa@united.co.sz", position: "GROUP CEO" },
  { name: "KYLE DE SOUSA", email: "kdesousa@united.co.sz", position: "GM IN THE ED'S OFFICE" },
  { name: "COMPANY SECRETARY", email: "compsecretary@united.co.sz", position: "COMPANY SECRETARY" },
  { name: "WINILE SIBANDZE", email: "assistantCo.Sec&legal@united.co.sz", position: "ASSISTANT COMPANY SECRETARY" },
  { name: "ROISON PAVE", email: "gmcompaffairs@united.co.sz", position: "GM CORPORATE AFFAIRS" },
  { name: "MLAMULI MAGAGULA", email: "mlamuli.magagula@united.co.sz", position: "GM FINANCE" },
  { name: "WITNESS MSIBI", email: "gm-operations@united.co.sz", position: "GM OPERATIONS" },
  { name: "ZOMBODZE MAGAGULA", email: "techadvisor@united.co.sz", position: "TECHNICAL ADVISOR" },
  { name: "SIMEONE SIMELANE", email: "IAmanager@united.co.sz", position: "INTERNAL AUDIT MANAGER" },
  { name: "PETER MASEKO", email: "fm@united.co.sz", position: "FINANCE MANAGER" },
  { name: "GROUP HR MANAGER", email: "groupHRM@united.co.sz", position: "GROUP HR MANAGER" },
  { name: "RISK & COMPLIANCE MANAGER", email: "rcmanager@united.co.sz", position: "RISK & COMPLIANCE MANAGER" },
  { name: "LUNGILE NGWENYA", email: "csrmanager@united.co.sz", position: "GROUPS & CORPORATE SALES MANAGER" },
  { name: "NOZWELETHU NXUMALO", email: "retailsalesmanager@united.co.sz", position: "RETAIL SALES MANAGER" },
  { name: "LOVEMORE GUNDANI", email: "ugimanager@united.co.sz", position: "UGI OPERATIONS MANAGER" },
  { name: "LOVEMORE GUNDANI", email: "ulamanager@united.co.sz", position: "ULA OPERATIONS MANAGER" },
  { name: "SEBENELE ZWANE", email: "upmanager@united.co.sz", position: "UP OPERATIONS MANAGER" },
  { name: "MCOLISI DLAMINI", email: "admindriver@united.co.sz", position: "ADMIN DRIVER" },
  { name: "NIKEZIWE DLAMINI", email: "adminassistant1@united.co.sz", position: "ADMINISTRATIVE ASSISTANT" },
  { name: "THANDAZILE MAHLALELA", email: "adminassistant2@united.co.sz", position: "ADMINISTRATIVE ASSISTANT" },
  { name: "ZANDILE MATSENJWA", email: "adminassistant3@united.co.sz", position: "ADMINISTRATIVE ASSISTANT" },
  { name: "ROCHELLE SONS", email: "adminassistant4@united.co.sz", position: "ADMINISTRATIVE ASSISTANT" },
  { name: "MAGGIE PHUNGWAYO", email: "pa.gceo@united.co.sz", position: "EXECUTIVE ASSISTANT TO THE GCEO" },
  { name: "THABANI DLAMINI", email: "financeofficer1@united.co.sz", position: "FINANCE OFFICER" },
  { name: "BUYILE KHUMALO", email: "financeofficer2@united.co.sz", position: "FINANCE OFFICER" },
  { name: "SIFISO KUNENE", email: "collectionsofficer1@united.co.sz", position: "COLLECTIONS OFFICER" },
  { name: "HLONIPHILE MAGAGULA", email: "collectionsofficer2@united.co.sz", position: "COLLECTIONS OFFICER" },
  { name: "NKOSINGIVILE MAGAGULA", email: "collectionsofficer3@united.co.sz", position: "COLLECTIONS OFFICER" },
  { name: "NCAMISO MAGONGO", email: "collectionsofficer4@united.co.sz", position: "COLLECTIONS OFFICER" },
  { name: "MFISWA MDLULI", email: "collectionsofficer5@united.co.sz", position: "COLLECTIONS OFFICER" },
  { name: "KAYISE MNGOMEZULU", email: "financeofficer3@united.co.sz", position: "FINANCE OFFICER" },
  { name: "PHILILE MPILA", email: "collectionsofficer6@united.co.sz", position: "COLLECTIONS OFFICER" },
  { name: "GUGU NTSHALINTSHALI", email: "cashier1@united.co.sz", position: "CASHIER" },
  { name: "NOZIPHO VILANE", email: "collectionsofficer7@united.co.sz", position: "COLLECTIONS OFFICER" },
  { name: "FINANCE OFFICER", email: "financeofficer4@united.co.sz", position: "FINANCE OFFICER" },
  { name: "BRENDA DLAMINI", email: "cashiersupervisor@united.co.sz", position: "CASHIER SUPERVISOR" },
  { name: "FELICIA LUKHELE", email: "financialaccountant@united.co.sz", position: "FINANCIAL ACCOUNTANT" },
  { name: "NOSIMILO NKABINDE", email: "collectionssupervisor@united.co.sz", position: "COLLECTIONS SUPERVISOR" },
  { name: "NOKUTHULA NHLENGETFWA", email: "hrofficer.gen@united.co.sz", position: "HUMAN RESOURCES OFFICER" },
  { name: "NOMFUNDO ZWANE", email: "hrofficer.admin@united.co.sz", position: "HUMAN RESOURCES OFFICER" },
  { name: "COLANI NGWENYA", email: "assistantHRM@united.co.sz", position: "ASSISTANT HR MANAGER" },
  { name: "BANDILE ZWANE", email: "systems@united.co.sz", position: "IT SYSTEMS ANALYST" },
  { name: "ANDILE SUKATI", email: "ittechnician@united.co.sz", position: "IT TECHNICIAN" },
  { name: "JUSTICE DLAMINI", email: "seniortech@united.co.sz", position: "TECHNICAL SUPPORT ANALYST" },
  { name: "NKOSIYABONGWA DLAMINI", email: "internalauditorofficer1@united.co.sz", position: "INTERNAL AUDIT OFFICER" },
  { name: "PROMISE NXUMALO", email: "internalauditorofficer2@united.co.sz", position: "INTERNAL AUDIT OFFICER" },
  { name: "NCAMILE MKHATSHWA", email: "complianceofficer1@united.co.sz", position: "LEGAL OFFICER" },
  { name: "MHLONIPHENI MASILELA", email: "gr.assistantMM@united.co.sz", position: "GROUP ASSISTANT MARKETING MANAGER" },
  { name: "GCINILE MOTSA", email: "marketingcommofficer@united.co.sz", position: "MARKETING OFFICER" },
  { name: "MARKETING OFFICER", email: "marketingofficer1@united.co.sz", position: "MARKETING OFFICER" },
  { name: "BANELE DLAMINI", email: "extsalesofficer1@united.co.sz", position: "EXTERNAL SALES OFFICER" },
  { name: "BUSISIWE DLAMINI", email: "salesofficer1@united.co.sz", position: "CUSTOMER SALES OFFICER" },
  { name: "GCEBILE DLAMINI", email: "salesofficer2@united.co.sz", position: "CUSTOMER SALES OFFICER" },
  { name: "MVUMENI DLAMINI", email: "salesofficer3@united.co.sz", position: "CUSTOMER SALES OFFICER" },
  { name: "NHLANHLA DLAMINI", email: "callcentreofficer6@united.co.sz", position: "CALL CENTRE" },
  { name: "SANDILE DLAMINI", email: "camperdriver@united.co.sz", position: "CAMPER DRIVER" },
  { name: "THABO DLAMINI", email: "salesofficer5@united.co.sz", position: "CUSTOMER SALES OFFICER" },
  { name: "GUGULETHU HLATSHWAKO", email: "callcentreofficer1@united.co.sz", position: "CALL CENTRE OFFICER" },
  { name: "LINDELWA MAMBA", email: "callcentreofficer2@united.co.sz", position: "CALL CENTRE OFFICER" },
  { name: "VACANT SALES", email: "salesofficer6@united.co.sz", position: "CUSTOMER SALES OFFICER" },
  { name: "SIPHIWOSAMI MATSEBULA", email: "callcentreofficer3@united.co.sz", position: "CALL CENTRE SUPERVISOR" },
  { name: "EASTER MAYISELA", email: "salesofficer7@united.co.sz", position: "CUSTOMER SALES OFFICER" },
  { name: "SIPHELELE MHLANGA", email: "callcentreofficer4@united.co.sz", position: "CALL CENTRE OFFICER" },
  { name: "LINAH MHLONGO", email: "salesofficer8@united.co.sz", position: "CUSTOMER SALES OFFICER" },
  { name: "VACANT SALES 2", email: "salesofficer9@united.co.sz", position: "CUSTOMER SALES OFFICER" },
  { name: "KUSHOKA NDALLAHWA", email: "salesofficer10@united.co.sz", position: "CUSTOMER SALES OFFICER" },
  { name: "NOMBULELO NDZINISA", email: "callcentreofficer5@united.co.sz", position: "CALL CENTRE OFFICER" },
  { name: "MUZI NKAMBULE", email: "salesofficer11@united.co.sz", position: "CUSTOMER SALES OFFICER" },
  { name: "SIHLE PATEGUANA", email: "salesofficer12@united.co.sz", position: "CUSTOMER SALES OFFICER" },
  { name: "THANDAZILE SHONGWE", email: "salesofficer13@united.co.sz", position: "CUSTOMER SALES OFFICER" },
  { name: "BONGINKHOSI SIMELANE", email: "salesofficer14@united.co.sz", position: "CUSTOMER SALES OFFICER" },
  { name: "THANDOKUHLE SIMELANE", email: "salesofficer16@united.co.sz", position: "CALL CENTRE OFFICER" },
  { name: "WANDILE NKONYANE", email: "salesofficer15@united.co.sz", position: "CUSTOMER SALES OFFICER" },
  { name: "CHAWE NGWENYA", email: "branchcontroller8@united.co.sz", position: "BRANCH CONTROLLER" },
  { name: "DANIEL NKALANGA", email: "branchcontroller9@united.co.sz", position: "BRANCH CONTROLLER" },
  { name: "MAKHOSAZANE SHIBA", email: "branchcontroller10@united.co.sz", position: "BRANCH CONTROLLER" },
  { name: "SANELISIWE SHONGWE", email: "branchcontroller11@united.co.sz", position: "BRANCH CONTROLLER" },
  { name: "TENANILE THWALA", email: "branchcontroller12@united.co.sz", position: "BRANCH CONTROLLER" },
  { name: "VACANT BRANCH", email: "branchcontroller13@united.co.sz", position: "BRANCH CONTROLLER" },
  { name: "BHEKITHEMBA MTSETFWA", email: "extsalessupervisor@united.co.sz", position: "EXTERNAL SALES SUPERVISOR" },
  { name: "SISTER DLAMINI", email: "branchcontroller1@united.co.sz", position: "BRANCH CONTROLLER" },
  { name: "FUTHI GAMEDZE", email: "branchcontroller2@united.co.sz", position: "BRANCH CONTROLLER" },
  { name: "SINDISIWE MABUZA", email: "branchessupervisor@united.co.sz", position: "BRANCH SUPERVISOR" },
  { name: "XOLI MALINGA", email: "callcentresuppervisor@united.co.sz", position: "CALL CENTRE SUPERVISOR" },
  { name: "YALIWE MSIBI", email: "branchcontroller5@united.co.sz", position: "BRANCH CONTROLLER" },
  { name: "MENZI MTHEMBU", email: "branchcontroller6@united.co.sz", position: "BRANCH CONTROLLER" },
  { name: "AYANDA MASILELA", email: "corpsalesofficer1@united.co.sz", position: "CORPORATE SALES" },
  { name: "MANDISA SOBO", email: "corpsalesofficer2@united.co.sz", position: "CORPORATE SALES" },
  { name: "VUYELWA SHONGWE", email: "corpsalesofficer3@united.co.sz", position: "CORPORATE SALES" },
  { name: "JESSICA DLAMINI", email: "corpsalesofficer4@united.co.sz", position: "CORPORATE SALES" },
  { name: "UGI OFFICER", email: "ugiofficer1@united.co.sz", position: "UGI INSURANCE OFFICER" },
  { name: "ZOLISWA SIMELANE", email: "ugiclaimsofficer1@united.co.sz", position: "UGI UNDERWRITING OFFICER" },
  { name: "NOMPUMELELO MAGAGULA", email: "ugiofficer2@united.co.sz", position: "UGI INSURANCE OFFICER" },
  { name: "ZOLA TSABEDZE", email: "ugiunderwriter2@united.co.sz", position: "UGI UNDERWRITING OFFICER" },
  { name: "SIMANGELE DLAMINI", email: "ugiundersupervisor@united.co.sz", position: "UGI UNDERWRITING SUPERVISOR" },
  { name: "TEMALANGENI DLAMINI", email: "ugiunderwriter1@united.co.sz", position: "UGI UNDERWRITING OFFICER" },
  { name: "YVONNE GAMA", email: "ugiclaimssupervisor@united.co.sz", position: "UGI CLAIMS SUPERVISOR" },
  { name: "TAKHONA DLAMINI", email: "ulaclaimsofficer1@united.co.sz", position: "ULA CLAIMS OFFICER" },
  { name: "GUGU FAKUDZE", email: "ulaclaimsofficer2@united.co.sz", position: "ULA CLAIMS OFFICER" },
  { name: "LUNGILE MNGOMETULU", email: "ulaclaimsofficer3@united.co.sz", position: "ULA CLAIMS OFFICER" },
  { name: "GCINILE NXUMALO", email: "ulaunderwriter1@unted.co.sz", position: "ULA UNDERWRITING OFFICER" },
  { name: "VACANT ULA", email: "ulacustserviceofficer1@united.co.sz", position: "ULA CUSTOMER SERVICE OFFICER" },
  { name: "MFANAFUTHI SIMELANE", email: "ulacustserviceofficer2@united.co.sz", position: "ULA CUSTOMER SERVICE OFFICER" },
  { name: "VACANT ULA 2", email: "ulaunderwriter2@united.co.sz", position: "ULA UNDERWRITING OFFICER" },
  { name: "ZINHLE NXUMALO", email: "ulaclaimssupervisor@united.co.sz", position: "ULA CLAIMS SUPERVISOR" },
  { name: "CYNTHIA GUMEDZE", email: "loansofficer@united.co.sz", position: "MICRO LOANS OFFICER" },
  { name: "KHETSIWE MASANGANE", email: "assist.loansofficer@united.co.sz", position: "ASSISTANT MICRO LOANS OFFICER" },
  { name: "JOSE REGO", email: "rego@ummo.xyz", position: "PROJECT MANAGER" },
  { name: "THEMBINKOSI MKHONTA", email: "dev@ummo.xyz", position: "DEVELOPER" }
];

// United domain configuration - now open to any @united.co.sz email
const UNITED_DOMAIN = '@united.co.sz';

const STORAGE_KEYS = {
  AUTH: 'uh_beta_auth_v1',
  ONBOARDING: 'uh_onboarding_completed_v1',
  SESSION: 'uh_session'
}

export default function BetaAuthGate() {
  const [showLogin, setShowLogin] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
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

  // Check if email is from United domain
  const isUnitedEmail = (email) => email.toLowerCase().endsWith(UNITED_DOMAIN)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const cleanEmail = email.trim().toLowerCase()
    
    // Check if email is from United domain OR in the allowed employees list
    const isAuthorized = isUnitedEmail(cleanEmail) || 
                        ALLOWED_EMPLOYEES.some(emp => emp.email.toLowerCase() === cleanEmail)

    if (isAuthorized) {
      // Find employee data or create generic for United emails
      let employee = ALLOWED_EMPLOYEES.find(emp => emp.email.toLowerCase() === cleanEmail)
      
      // If it's a United email but not in the list, create generic employee data
      if (!employee && isUnitedEmail(cleanEmail)) {
        const emailUsername = cleanEmail.split('@')[0]
        const formattedName = emailUsername.split('.')
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ')
        
        employee = {
          name: formattedName,
          email: cleanEmail,
          position: 'United Holdings Employee'
        }
      }

      if (employee) {
        // Simulate login process
        setTimeout(() => {
          const currentDate = new Date();
          const userData = {
            name: employee.name,
            email: employee.email,
            position: employee.position,
            loginTime: currentDate.toISOString(),
            isUnitedEmployee: isUnitedEmail(cleanEmail)
          }
          
          localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(userData))
          localStorage.setItem(STORAGE_KEYS.SESSION, 'active')
          setUser(userData)
          setShowLogin(false)
          setShowOnboarding(true)
          setLoading(false)
        }, 1000)
      } else {
        setError('Unable to process your access request. Please try again.')
        setLoading(false)
      }
    } else {
      setError('Access restricted to United Holdings employees and authorized beta testers. Please use your company email.')
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
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center">
              <Image src={'/icon.png'} alt="United Holdings Logo" width={1200} height={120} />
            </div>
            <h1 className="text-3xl font-bold mb-2">United Holdings</h1>
            <p className="text-white/80 text-lg">Website Beta Program</p>
            <div className="mt-4 bg-white/10 rounded-lg p-3">
              <p className="text-sm font-semibold">Open Beta Access</p>
              <p className="text-xs text-white/70 mt-1">Available to all United Holdings employees</p>
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
                Now open to all employees with @united.co.sz email addresses
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
                Now available to all United Holdings employees with @united.co.sz email addresses
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Having trouble? Contact ICT Department
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
      currentStep={currentStep}
      onStepChange={setCurrentStep}
      onComplete={completeOnboarding}
      onLogout={handleLogout}
    />
  }

  // Main application with user info
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
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
      {/* Your main application content goes here */}
    </div>
  )
}

// Onboarding Flow Component (unchanged)
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
                Open Beta Access • All Employees Welcome
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