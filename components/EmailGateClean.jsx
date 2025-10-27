"use client"
import React, { useEffect, useState } from 'react'

const STORAGE_KEY = 'emailGateAccepted_v1'
const SERVER_URL = '/api/feedback'

export default function EmailGateClean({ hours = 1 }) {
  const [visible, setVisible] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [product, setProduct] = useState('')
  const [category, setCategory] = useState('Feedback')
  const [rating, setRating] = useState('5')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    try {
      const cookieAuth = typeof document !== 'undefined' && document.cookie && document.cookie.includes('uh_session=')
      const localAuth = typeof window !== 'undefined' && (localStorage.getItem('uh_auth') || localStorage.getItem('user'))
      setIsAuth(Boolean(cookieAuth || localAuth))
    } catch (e) {
      setIsAuth(false)
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        setVisible(true)
        return
      }
      const obj = JSON.parse(raw)
      if (!obj || !obj.ts) {
        setVisible(true)
        return
      }
      const expires = obj.ts + (obj.hours || hours) * 60 * 60 * 1000
      if (Date.now() > expires) setVisible(true)
    } catch (err) {
      setVisible(true)
    }
  }, [hours])

  const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setStatus(null)
    if (!validEmail(email)) {
      setStatus({ error: 'Please enter a valid email address.' })
      return
    }

    setLoading(true)
    try {
      const payload = {
        fullName: fullName.trim() || undefined,
        email: email.trim(),
        product: product.trim() || undefined,
        category,
        rating,
        message: message.trim(),
        path: typeof window !== 'undefined' ? window.location.pathname : '/',
        source: 'email-gate'
      }

      const res = await fetch(SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || res.statusText)
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now(), hours }))
      setVisible(false)
      setStatus({ ok: 'Thanks — your feedback was submitted.' })
      setEmail('')
      setFullName('')
      setMessage('')
    } catch (err) {
      console.error('EmailGate submit error', err)
      setStatus({ error: 'Failed to submit — please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    if (!isAuth) {
      window.location.href = '/client-area'
      return
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ dismissed: true, ts: Date.now(), hours }))
    setVisible(false)
  }

  if (!visible) return null

  if (!isAuth) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-lg bg-white rounded-lg p-6 space-y-4 shadow-lg text-center">
          <h3 className="text-lg font-semibold">Login required</h3>
          <p className="text-sm text-gray-600">You must be logged in to access this content. Please sign in to continue.</p>
          <div className="flex justify-center gap-2 mt-4">
            <a href="/client-area" className="bg-[#9b1c20] text-white px-4 py-2 rounded">Sign in</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-lg p-6 space-y-4 shadow-lg">
        <h3 className="text-lg font-semibold">We'd love your feedback</h3>
        <p className="text-sm text-gray-600">Please provide your email to continue. We do not store your email locally; it is used only to contact you.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-sm font-medium">Full name (optional)</span>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" placeholder="Your name" />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Email (required)</span>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" placeholder="you@company.com" />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-sm font-medium">Product (optional)</span>
            <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" placeholder="e.g. Motor Insurance" />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded">
              <option>Feedback</option>
              <option>Bug</option>
              <option>Claim</option>
              <option>Request a Quote</option>
              <option>Other</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium">Message / details</span>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="mt-1 w-full px-3 py-2 border rounded" placeholder="Tell us more (optional)" />
        </label>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" required className="h-4 w-4" />
            <span className="text-sm">I consent to be contacted regarding this feedback. I understand personal information will not be stored in local storage.</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <span className="text-sm">Rating</span>
            <select value={rating} onChange={(e) => setRating(e.target.value)} className="ml-2 px-2 py-1 border rounded">
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
          </label>
        </div>

        {status?.error && <div className="text-red-600 text-sm">{status.error}</div>}
        {status?.ok && <div className="text-green-700 text-sm">{status.ok}</div>}

        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="bg-[#9b1c20] text-white px-4 py-2 rounded flex-1">{loading ? 'Submitting...' : 'Submit'}</button>
          <button type="button" onClick={handleSkip} className="border px-4 py-2 rounded">Sign in</button>
        </div>

        <p className="text-xs text-gray-500">We will use your email only to reply to your feedback. No email or PII is stored in the browser.</p>
      </form>
    </div>
  )
}
