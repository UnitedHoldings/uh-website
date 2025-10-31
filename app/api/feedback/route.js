// Server-side proxy route for feedback + cookie session issuance
import { NextResponse } from 'next/server'

const FORWARD_URL = 'https://website.api.united.co.sz/api/feedback'

const BETA_TESTERS = {
  'rego@ummo.xyz': 'fags$3sadty',
  'dev@ummo.xyz': 'usdf87379'
}

export async function POST(req) {
  try {
    const body = await req.json()
    if (!body || !body.email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 })
    }

    // Forward payload to external server; don't fail the flow if forwarding fails entirely
    let forwardOk = false
    let forwardText = ''
    try {
      const forwardRes = await fetch(FORWARD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      })
      forwardText = await forwardRes.text()
      forwardOk = forwardRes.ok || forwardRes.status === 204
    } catch (err) {
      console.warn('Forwarding to external feedback endpoint failed:', err)
    }

    // For beta access, we issue a special cookie with 1-hour expiry
    const token = Buffer.from(`${body.email}|${Date.now()}`).toString('base64')
    const maxAge = 60 * 60 // 1 hour in seconds
    const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
    
    // Create both session and beta cookies if this is a beta access request
    const cookies = []
    
    // Standard session cookie
    cookies.push(`uh_session=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax; ${secureFlag}`)
    
    // Special beta access cookie for authorized users
    if (body.type === 'beta-access' && body.email) {
      const email = body.email.toLowerCase()
      if (BETA_TESTERS[email]) {
        cookies.push(`uh_beta=1; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax; ${secureFlag}`)
      }
    }

    // Return success and set cookies
    const payload = {
      ok: true,
      forwarded: forwardOk,
      forwardResponse: forwardText ? forwardText : undefined,
    }

    return new NextResponse(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookies,
      },
    })
  } catch (err) {
    console.error('Error in /api/feedback route:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
