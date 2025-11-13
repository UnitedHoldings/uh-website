"use client"
import React, { useState, useEffect } from 'react'

const STORAGE_KEY = 'public_feedback_submissions_v1'
const SERVER_URL = 'https://website.api.united.co.sz/api/feedback'

export default function FeedbackPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const [feedback, setFeedback] = useState({
        // Section 1: About You
        name: '',
        email: '',
        company: '',
        role: '',
        roleOther: '',
        department: '',
        departmentOther: '',
        roleInteraction: '',

        // Section 2: Feedback on Website
        usabilityRating: 5,
        usabilityComments: '',
        mobileRating: 5,
        mobileComments: '',
        contentRating: 5,
        contentComments: '',

        // Section 3: Business Fit
        roleObjectivesRating: 5,
        roleObjectivesThoughts: '',
        brandAlignment: '',
        excitingAspects: '',

        // Section 4: Desired KPIs and Metrics
        selectedKPIs: [],
        kpiSuccessDefinition: '',
        additionalMetrics: '',

        // Section 5: Open-Ended Feedback & Sentiment
        likeMost: '',
        needsImprovement: '',
        otherThoughts: '',
        excitementRating: 8,
        excitementReason: '',
        npsScore: 9,
        npsReason: '',

        // Metadata
        submittedAt: 0,
    })

    const handleInputChange = (field, value) => {
        setFeedback(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleKPIChange = (kpi) => {
        setFeedback(prev => ({
            ...prev,
            selectedKPIs: prev.selectedKPIs.includes(kpi)
                ? prev.selectedKPIs.filter(item => item !== kpi)
                : [...prev.selectedKPIs, kpi]
        }))
    }

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 5))
            window.scrollTo(0, 0)
        }
    }

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1))
        window.scrollTo(0, 0)
    }

    const validateStep = (step) => {
        switch (step) {
            case 1:
                if (!feedback.name || !feedback.email || !feedback.role || !feedback.department || !feedback.roleInteraction) {
                    setStatus({ error: 'Please complete all required fields in Section 1' })
                    return false
                }
                return true
            case 2:
                return true // All ratings have defaults
            case 3:
                return true // Optional fields
            case 4:
                return true // Optional fields
            case 5:
                return true // Optional fields
            default:
                return true
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setStatus(null)

        try {
            const payload = {
                ...feedback,
                submittedAt: Date.now(),
            }

            const res = await fetch(SERVER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (!res.ok) throw new Error('Submission failed')

            // Store submission locally
            const submissions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
            submissions.push({
                ...payload,
                id: Date.now(),
                submittedAt: new Date().toISOString()
            })
            localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions))

            setSubmitted(true)

        } catch (err) {
            console.error('Feedback submission error', err)
            setStatus({ error: 'Failed to submit feedback. Please try again.' })
        } finally {
            setLoading(false)
        }
    }

    const handleNewFeedback = () => {
        setFeedback({
            name: '',
            email: '',
            company: '',
            role: '',
            roleOther: '',
            department: '',
            departmentOther: '',
            roleInteraction: '',
            usabilityRating: 5,
            usabilityComments: '',
            mobileRating: 5,
            mobileComments: '',
            contentRating: 5,
            contentComments: '',
            roleObjectivesRating: 5,
            roleObjectivesThoughts: '',
            brandAlignment: '',
            excitingAspects: '',
            selectedKPIs: [],
            kpiSuccessDefinition: '',
            additionalMetrics: '',
            likeMost: '',
            needsImprovement: '',
            otherThoughts: '',
            excitementRating: 8,
            excitementReason: '',
            npsScore: 9,
            npsReason: '',
            submittedAt: 0,
        })
        setCurrentStep(1)
        setSubmitted(false)
        setStatus(null)
    }

    const ProgressBar = () => (
        <div className="flex items-center justify-between mb-12">
            {[1, 2, 3, 4, 5].map((step) => (
                <React.Fragment key={step}>
                    <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-semibold transition-all duration-300 ${step === currentStep
                                ? 'bg-[#9b1c20] border-[#9b1c20] text-white'
                                : step < currentStep
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : 'border-gray-300 text-gray-400'
                            }`}>
                            {step < currentStep ? '✓' : step}
                        </div>
                        <span className="text-sm mt-2 text-gray-600 font-medium text-center min-w-[80px]">
                            {['About You', 'Website Feedback', 'Business Fit', 'KPIs', 'Final Thoughts'][step - 1]}
                        </span>
                    </div>
                    {step < 5 && (
                        <div className={`flex-1 h-1 mx-4 transition-all duration-300 ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                            }`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    )

    const RatingStars = ({ rating, onRatingChange, label }) => (
        <div className="bg-gray-50 rounded-xl p-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">{label}</label>
            <div className="flex items-center gap-3 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onRatingChange(star)}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${rating >= star
                                ? 'bg-[#9b1c20] text-white shadow-md'
                                : 'bg-white text-gray-400 border border-gray-300 hover:border-[#9b1c20] hover:text-[#9b1c20]'
                            }`}
                    >
                        <span className="font-semibold">{star}</span>
                    </button>
                ))}
                <span className="text-lg font-semibold text-gray-700 ml-4">
                    {rating}/5
                </span>
            </div>
        </div>
    )

    // Submission Confirmation Page
    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                        {/* Success Icon */}
                        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        {/* Thank You Message */}
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">
                            Thank You for Your Feedback!
                        </h1>

                        <div className="max-w-2xl mx-auto space-y-6">
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Your insights are invaluable in helping us shape the future of United Holdings&apos; digital experience.
                                We truly appreciate the time and thought you&apos;ve put into providing comprehensive feedback.
                            </p>

                            <div className="bg-gradient-to-r from-[#9b1c20] to-[#7a1619] rounded-xl p-6 text-white text-center">
                                <h3 className="text-lg font-semibold mb-2">Your Contribution Matters</h3>
                                <p className="text-white/90 text-sm">
                                    Your feedback directly influences our website improvements and helps us create 
                                    a better experience for all our clients and stakeholders.
                                </p>
                            </div>

                            {/* Next Steps */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                <div className="bg-blue-50 rounded-xl p-6 text-center">
                                    <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-blue-900 mb-2">Continue Exploring</h4>
                                    <p className="text-blue-700 text-sm">
                                        Feel free to explore more features and provide additional feedback as you discover them
                                    </p>
                                </div>

                                <div className="bg-green-50 rounded-xl p-6 text-center">
                                    <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-green-900 mb-2">Feedback Recorded</h4>
                                    <p className="text-green-700 text-sm">
                                        Your submission has been securely stored and will be reviewed by our development team
                                    </p>
                                </div>

                                <div className="bg-purple-50 rounded-xl p-6 text-center">
                                    <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-purple-900 mb-2">Stay Connected</h4>
                                    <p className="text-purple-700 text-sm">
                                        We may follow up on your feedback to better understand your perspective
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                                <button
                                    onClick={handleNewFeedback}
                                    className="bg-gradient-to-r from-[#9b1c20] to-[#7a1619] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                                >
                                    Submit Another Feedback
                                </button>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                                >
                                    Return to Home
                                </button>
                            </div>

                            {/* Confidentiality Notice */}
                            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <p className="text-sm text-gray-600">
                                    <strong>Privacy Notice:</strong> Your feedback is stored securely and will only be used
                                    for improving the United Holdings website. All responses are treated as confidential and will
                                    not be shared outside the development team.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Website Feedback
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Help us improve the United Holdings digital experience by sharing your insights
                    </p>
                </div>

                <ProgressBar />

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Step 1: About You */}
                    {currentStep === 1 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-fadeIn">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">About You</h2>
                                <p className="text-gray-600">Tell us about yourself and your role</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={feedback.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent transition-all"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={feedback.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent transition-all"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Company/Organization
                                    </label>
                                    <input
                                        type="text"
                                        value={feedback.company}
                                        onChange={(e) => handleInputChange('company', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent transition-all"
                                        placeholder="Your company or organization"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Primary Role <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={feedback.role}
                                        onChange={(e) => handleInputChange('role', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent transition-all"
                                        required
                                    >
                                        <option value="">Select your role</option>
                                        <option value="Client">Client</option>
                                        <option value="Partner">Partner</option>
                                        <option value="Stakeholder">Stakeholder</option>
                                        <option value="Supplier">Supplier</option>
                                        <option value="Prospective Client">Prospective Client</option>
                                        <option value="Industry Peer">Industry Peer</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {feedback.role === 'Other' && (
                                        <input
                                            type="text"
                                            value={feedback.roleOther}
                                            onChange={(e) => handleInputChange('roleOther', e.target.value)}
                                            placeholder="Please specify your role"
                                            className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    How do you typically interact with United Holdings? <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={feedback.roleInteraction}
                                    onChange={(e) => handleInputChange('roleInteraction', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent transition-all"
                                    placeholder="Describe your relationship with United Holdings and how you typically interact with our services..."
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Website Feedback */}
                    {currentStep === 2 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-fadeIn">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Website Experience Feedback</h2>
                                <p className="text-gray-600">Rate different aspects of your website experience</p>
                            </div>

                            <div className="space-y-6">
                                {/* Usability Rating */}
                                <div>
                                    <RatingStars
                                        rating={feedback.usabilityRating}
                                        onRatingChange={(rating) => handleInputChange('usabilityRating', rating)}
                                        label="Overall Usability & Ease of Use *"
                                    />
                                    <textarea
                                        value={feedback.usabilityComments}
                                        onChange={(e) => handleInputChange('usabilityComments', e.target.value)}
                                        rows={3}
                                        className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                                        placeholder="Any specific comments about the website's usability? What was intuitive or confusing?"
                                    />
                                </div>

                                {/* Mobile Rating */}
                                <div>
                                    <RatingStars
                                        rating={feedback.mobileRating}
                                        onRatingChange={(rating) => handleInputChange('mobileRating', rating)}
                                        label="Mobile Experience *"
                                    />
                                    <textarea
                                        value={feedback.mobileComments}
                                        onChange={(e) => handleInputChange('mobileComments', e.target.value)}
                                        rows={3}
                                        className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                                        placeholder="How was your experience using the website on mobile devices? Any issues or positive observations?"
                                    />
                                </div>

                                {/* Content Rating */}
                                <div>
                                    <RatingStars
                                        rating={feedback.contentRating}
                                        onRatingChange={(rating) => handleInputChange('contentRating', rating)}
                                        label="Content Quality & Relevance *"
                                    />
                                    <textarea
                                        value={feedback.contentComments}
                                        onChange={(e) => handleInputChange('contentComments', e.target.value)}
                                        rows={3}
                                        className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                                        placeholder="Thoughts on the website content? Is it clear, helpful, and relevant to your needs?"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Business Fit */}
                    {currentStep === 3 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-fadeIn">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Relationship & Fit</h2>
                                <p className="text-gray-600">How well does the website support your relationship with United Holdings?</p>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-4">
                                        How well does the website support your business objectives? *
                                    </label>
                                    <div className="flex items-center gap-3 mb-4">
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <button
                                                key={rating}
                                                type="button"
                                                onClick={() => handleInputChange('roleObjectivesRating', rating)}
                                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${feedback.roleObjectivesRating >= rating
                                                        ? 'bg-[#9b1c20] text-white shadow-md'
                                                        : 'bg-white text-gray-400 border border-gray-300 hover:border-[#9b1c20] hover:text-[#9b1c20]'
                                                    }`}
                                            >
                                                <span className="font-semibold">{rating}</span>
                                            </button>
                                        ))}
                                        <span className="text-lg font-semibold text-gray-700 ml-4">
                                            {feedback.roleObjectivesRating}/5
                                        </span>
                                    </div>

                                    <textarea
                                        value={feedback.roleObjectivesThoughts}
                                        onChange={(e) => handleInputChange('roleObjectivesThoughts', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                                        placeholder="How could the website better support your business relationship with United Holdings?"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand Alignment</label>
                                        <textarea
                                            value={feedback.brandAlignment}
                                            onChange={(e) => handleInputChange('brandAlignment', e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                                            placeholder="How well does the website represent the United Holdings brand and values?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Most Valuable Aspects</label>
                                        <textarea
                                            value={feedback.excitingAspects}
                                            onChange={(e) => handleInputChange('excitingAspects', e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                                            placeholder="What aspects of the website are most valuable for your relationship with United Holdings?"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: KPIs */}
                    {currentStep === 4 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-fadeIn">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Success Metrics</h2>
                                <p className="text-gray-600">What matters most for measuring a successful website experience?</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-4">
                                        Which metrics are most important for your experience? (Select all that apply)
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {[
                                            'Ease of finding information',
                                            'Speed of website',
                                            'Mobile responsiveness',
                                            'Quality of content',
                                            'Professional appearance',
                                            'Trust and credibility',
                                            'Contact and communication ease',
                                            'Service information clarity',
                                            'Document access and download',
                                            'Overall user satisfaction'
                                        ].map((kpi) => (
                                            <label key={kpi} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={feedback.selectedKPIs.includes(kpi)}
                                                    onChange={() => handleKPIChange(kpi)}
                                                    className="w-4 h-4 text-[#9b1c20] focus:ring-[#9b1c20] border-gray-300 rounded"
                                                />
                                                <span className="text-sm text-gray-700">{kpi}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        How do you define a successful website experience?
                                    </label>
                                    <textarea
                                        value={feedback.kpiSuccessDefinition}
                                        onChange={(e) => handleInputChange('kpiSuccessDefinition', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                                        placeholder="What specific outcomes or experiences would indicate website success for you?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Additional Success Factors
                                    </label>
                                    <textarea
                                        value={feedback.additionalMetrics}
                                        onChange={(e) => handleInputChange('additionalMetrics', e.target.value)}
                                        rows={2}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                                        placeholder="Are there any other factors that contribute to a positive website experience?"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Final Thoughts */}
                    {currentStep === 5 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-fadeIn">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Final Thoughts & Recommendations</h2>
                                <p className="text-gray-600">Share your overall impressions and suggestions</p>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">What you like most</label>
                                        <textarea
                                            value={feedback.likeMost}
                                            onChange={(e) => handleInputChange('likeMost', e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                                            placeholder="What aspects of the website do you find most valuable or impressive?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Areas for improvement</label>
                                        <textarea
                                            value={feedback.needsImprovement}
                                            onChange={(e) => handleInputChange('needsImprovement', e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                                            placeholder="What could be improved to better serve your needs?"
                                        />
                                    </div>
                                </div>

                                {/* Excitement Rating */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-4">
                                        Overall satisfaction with the website (1-10) *
                                    </label>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-sm text-gray-500 min-w-[40px]">1 - Not satisfied</span>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={feedback.excitementRating}
                                            onChange={(e) => handleInputChange('excitementRating', parseInt(e.target.value))}
                                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#9b1c20]"
                                        />
                                        <span className="text-sm text-gray-500 min-w-[60px]">10 - Very satisfied</span>
                                        <span className="text-xl font-bold text-[#9b1c20] min-w-[30px] text-center">
                                            {feedback.excitementRating}
                                        </span>
                                    </div>

                                    <textarea
                                        value={feedback.excitementReason}
                                        onChange={(e) => handleInputChange('excitementReason', e.target.value)}
                                        rows={2}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                                        placeholder="What drives your satisfaction level? What are you most pleased with?"
                                    />
                                </div>

                                {/* NPS Score */}
                                <div className="bg-gradient-to-r from-[#9b1c20] to-[#7a1619] rounded-xl p-6 text-white">
                                    <label className="block text-sm font-medium mb-4">
                                        Net Promoter Score: How likely are you to recommend United Holdings to others? (0-10) *
                                    </label>
                                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                                            <button
                                                key={score}
                                                type="button"
                                                onClick={() => handleInputChange('npsScore', score)}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${feedback.npsScore === score
                                                        ? 'bg-white text-[#9b1c20] shadow-lg scale-110'
                                                        : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
                                                    }`}
                                            >
                                                {score}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex justify-between text-xs mb-4">
                                        <span>0 - Not likely</span>
                                        <span>10 - Extremely likely</span>
                                    </div>

                                    <textarea
                                        value={feedback.npsReason}
                                        onChange={(e) => handleInputChange('npsReason', e.target.value)}
                                        rows={2}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent placeholder-white/60"
                                        placeholder="What's the main reason for your score? What would make you more likely to recommend United Holdings?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional comments or suggestions</label>
                                    <textarea
                                        value={feedback.otherThoughts}
                                        onChange={(e) => handleInputChange('otherThoughts', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                                        placeholder="Any other thoughts, suggestions, or feedback you'd like to share?"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Status Messages */}
                    {status && (
                        <div className={`rounded-xl p-4 flex items-center ${status.error
                                ? 'bg-red-50 border border-red-200 text-red-700'
                                : 'bg-green-50 border border-green-200 text-green-700'
                            }`}>
                            <svg className={`w-5 h-5 mr-3 ${status.error ? 'text-red-500' : 'text-green-500'
                                }`} fill="currentColor" viewBox="0 0 20 20">
                                {status.error ? (
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                ) : (
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                )}
                            </svg>
                            {status.error || status.ok}
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`px-8 py-3 rounded-xl font-semibold transition-all ${currentStep === 1
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            ← Back
                        </button>

                        {currentStep < 5 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="bg-gradient-to-r from-[#9b1c20] to-[#7a1619] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                            >
                                Continue to {['About You', 'Website Feedback', 'Business Fit', 'KPIs', 'Final Thoughts'][currentStep]} →
                            </button>
                        ) : (<div></div>)}
                        {currentStep === 5 && (
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                            >
                                {loading ? 'Submitting...' : 'Submit Feedback'}
                            </button>
                        )}
                    </div>
                </form>

                {/* Progress Indicator */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Step {currentStep} of 5 • Your feedback helps us improve our services
                    </p>
                </div>
            </div>
        </div>
    )
}