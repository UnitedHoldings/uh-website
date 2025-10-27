"use client"
import React, { useEffect, useState } from 'react'

const STORAGE_KEY = 'emailGateAccepted_v1'
const SERVER_URL = '/api/feedback'

// Beta tester whitelist - in production, move this to environment variables or server
const BETA_TESTERS = {
  'rego@ummo.xyz': 'fags$3sadty',
  'dev@ummo.xyz': 'usdf87379'
}

export default function EmailGate({ hours = 1 }) {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    // Check beta access cookie/token
    try {
      const cookieAuth = typeof document !== 'undefined' && document.cookie && document.cookie.includes('uh_beta=')
      const localAuth = typeof window !== 'undefined' && localStorage.getItem('uh_beta')
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

  const validEmail = (e) => BETA_TESTERS.hasOwnProperty(e.toLowerCase())
  const validPassword = (e, p) => BETA_TESTERS[e.toLowerCase()] === p

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setStatus(null)

    // Validate email is in beta list
    if (!validEmail(email)) {
      setStatus({ error: 'This email is not authorized for beta access.' })
      return
    }

    // Validate password matches
    if (!validPassword(email, password)) {
      setStatus({ error: 'Invalid password for beta access.' })
      return
    }

    setLoading(true)
    try {
      const payload = {
        email: email.trim(),
        type: 'beta-access',
        source: 'beta-gate'
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

      // success: persist and close
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now(), hours }))
      // Set beta access flag
      localStorage.setItem('uh_beta', '1')
      setVisible(false)
      setStatus({ ok: 'Beta access granted. Welcome!' })
    } catch (err) {
      console.error('Beta gate error:', err)
      setStatus({ error: 'Failed to verify beta access. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-lg p-6 space-y-4 shadow-lg">
        <h3 className="text-lg font-semibold">Beta Access Required</h3>
        <p className="text-sm text-gray-600">Please enter your beta tester credentials to continue.</p>

        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded"
            placeholder="beta@company.com"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Beta Access Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded"
            placeholder="••••••••"
          />
        </label>

        {status?.error && <div className="text-red-600 text-sm">{status.error}</div>}
        {status?.ok && <div className="text-green-700 text-sm">{status.ok}</div>}

        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="bg-[#9b1c20] text-white px-4 py-2 rounded flex-1">
            {loading ? 'Verifying...' : 'Access Beta'}
          </button>
        </div>

        <p className="text-xs text-gray-500">
          Beta access is invitation-only. Contact your administrator if you need access.
        </p>
      </form>
    </div>
  )
}
