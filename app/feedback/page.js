"use client"
import React, { useState, useEffect } from 'react'

const STORAGE_KEY = 'public_feedback_submissions_v1'
const SERVER_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedback`

export default function FeedbackPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const [feedback, setFeedback] = useState({
        // Basic Information
        name: '',
        email: '',
        description: '',
        
        // Website Experience
        experience: 5,
        ease_of_navigation: '',
        
        // Feedback Content
        likes: '',
        additions: '',
        
        // Digital Features
        digital_features: [],
        
        // Community & Final Thoughts
        join_community: '',
        final_thoughts: ''
    })

    const handleInputChange = (field, value) => {
        setFeedback(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleFeatureChange = (feature) => {
        setFeedback(prev => ({
            ...prev,
            digital_features: prev.digital_features.includes(feature)
                ? prev.digital_features.filter(item => item !== feature)
                : [...prev.digital_features, feature]
        }))
    }

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 4))
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
                if (!feedback.name || !feedback.email || !feedback.description) {
                    setStatus({ error: 'Please complete all required fields in Section 1' })
                    return false
                }
                return true
            case 2:
                if (!feedback.ease_of_navigation) {
                    setStatus({ error: 'Please provide ease of navigation feedback' })
                    return false
                }
                return true
            case 3:
                return true // Features are optional
            case 4:
                return true // Final thoughts are optional
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
                name: feedback.name,
                email: feedback.email,
                description: feedback.description,
                experience: feedback.experience,
                ease_of_navigation: feedback.ease_of_navigation,
                likes: feedback.likes,
                additions: feedback.additions,
                digital_features: feedback.digital_features,
                join_community: feedback.join_community,
                final_thoughts: feedback.final_thoughts
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
            description: '',
            experience: 5,
            ease_of_navigation: '',
            likes: '',
            additions: '',
            digital_features: [],
            join_community: '',
            final_thoughts: ''
        })
        setCurrentStep(1)
        setSubmitted(false)
        setStatus(null)
    }

    const ProgressBar = () => (
        <div className="flex items-center justify-between mb-12">
            {[1, 2, 3, 4].map((step) => (
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
                            {['About You', 'Experience', 'Features', 'Final Thoughts'][step - 1]}
                        </span>
                    </div>
                    {step < 4 && (
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

    // Submission Confirmation Page (unchanged)
    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                        {/* Success Icon */}
                        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-green-500 to-[#9b1c20] rounded-full flex items-center justify-center">
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
                                        <svg className="w-6 h-6 text-[#9b1c20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                        <svg className="w-6 h-6 text-[#9b1c20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                        <svg className="w-6 h-6 text-[#9b1c20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Describe your relationship with United Holdings <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={feedback.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent transition-all"
                                    placeholder="e.g., Current United Holdings client, Prospective client, Industry partner, etc."
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Website Experience */}
                    {currentStep === 2 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-fadeIn">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Website Experience</h2>
                                <p className="text-gray-600">Share your experience with our website</p>
                            </div>

                            <div className="space-y-6">
                                {/* Experience Rating */}
                                <RatingStars
                                    rating={feedback.experience}
                                    onRatingChange={(rating) => handleInputChange('experience', rating)}
                                    label="Overall Experience Rating (1-5) *"
                                />

                                {/* Ease of Navigation */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ease of Navigation <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={feedback.ease_of_navigation}
                                        onChange={(e) => handleInputChange('ease_of_navigation', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                                        placeholder="How easy was it to find what you were looking for? Was the navigation intuitive?"
                                        required
                                    />
                                </div>

                                {/* What you like */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        What You Liked Most
                                    </label>
                                    <textarea
                                        value={feedback.likes}
                                        onChange={(e) => handleInputChange('likes', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                                        placeholder="What aspects of the website did you enjoy or find most useful?"
                                    />
                                </div>

                                {/* Suggested Additions */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Suggested Additions or Improvements
                                    </label>
                                    <textarea
                                        value={feedback.additions}
                                        onChange={(e) => handleInputChange('additions', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                                        placeholder="What features or improvements would you like to see added to the website?"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Digital Features */}
                    {currentStep === 3 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-fadeIn">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Digital Features & Community</h2>
                                <p className="text-gray-600">Tell us about features you use and community interest</p>
                            </div>

                            <div className="space-y-6">
                                {/* Digital Features */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-4">
                                        Which digital features do you use or are interested in? (Select all that apply)
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {[
                                            'Online Portal',
                                            'Mobile App',
                                            'Real-time Notifications',
                                            'Document Management',
                                            'Payment Processing',
                                            'Customer Support Chat',
                                            'Service Booking',
                                            'Account Dashboard',
                                            'Reporting Tools',
                                            'API Integration'
                                        ].map((feature) => (
                                            <label key={feature} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={feedback.digital_features.includes(feature)}
                                                    onChange={() => handleFeatureChange(feature)}
                                                    className="w-4 h-4 text-[#9b1c20] focus:ring-[#9b1c20] border-gray-300 rounded"
                                                />
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Join Community */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-4">
                                        Would you be interested in joining the United Holdings community for updates and exclusive content?
                                    </label>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {['yes', 'no'].map((option) => (
                                            <label key={option} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer bg-white">
                                                <input
                                                    type="radio"
                                                    name="join_community"
                                                    checked={feedback.join_community === option}
                                                    onChange={() => handleInputChange('join_community', option)}
                                                    className="w-4 h-4 text-[#9b1c20] focus:ring-[#9b1c20] border-gray-300"
                                                />
                                                <span className="text-sm font-medium text-gray-700 capitalize">
                                                    {option === 'yes' ? 'Yes, I\'m interested' : 'No, thank you'}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Final Thoughts */}
                    {currentStep === 4 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-fadeIn">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Final Thoughts</h2>
                                <p className="text-gray-600">Share any additional comments or suggestions</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Additional Comments or Suggestions
                                    </label>
                                    <textarea
                                        value={feedback.final_thoughts}
                                        onChange={(e) => handleInputChange('final_thoughts', e.target.value)}
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                                        placeholder="Any other thoughts, suggestions, or feedback you'd like to share about your experience with United Holdings?"
                                    />
                                </div>

                                {/* Summary Card */}
                                <div className="bg-gradient-to-r from-[#9b1c20] to-[#7a1619] rounded-xl p-6 text-white">
                                    <h3 className="text-lg font-semibold mb-4">Thank You for Your Feedback</h3>
                                    <p className="text-white/90 text-sm mb-4">
                                        Your insights help us continuously improve our services and digital experience for all United Holdings stakeholders.
                                    </p>
                                    <div className="text-xs text-white/70">
                                        <p>Your feedback will be reviewed by our team and used to enhance our platform.</p>
                                    </div>
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

                        {currentStep < 4 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="bg-gradient-to-r from-[#9b1c20] to-[#7a1619] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                            >
                                Continue to {['About You', 'Experience', 'Features', 'Final Thoughts'][currentStep]} →
                            </button>
                        ) : (<div></div>)}
                        {currentStep === 4 && (
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-gradient-to-r from-green-500 to-[#9b1c20] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                            >
                                {loading ? 'Submitting...' : 'Submit Feedback'}
                            </button>
                        )}
                    </div>
                </form>

                {/* Progress Indicator */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Step {currentStep} of 4 • Your feedback helps us improve our services
                    </p>
                </div>
            </div>
        </div>
    )
}