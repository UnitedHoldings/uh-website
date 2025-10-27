// Server-side proxy route for feedback + cookie session issuance
import { NextResponse } from 'next/server'

const FORWARD_URL = 'https://uh-server.onrender.com/api/feedback'

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

    // Create a lightweight session cookie value (opaque). Do not include PII in cookie value in production.
    const token = Buffer.from(`${body.email}|${Date.now()}`).toString('base64')
    const maxAge = 60 * 60 // 1 hour in seconds
    const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
    const cookie = `uh_session=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax; ${secureFlag}`

    // Return success and set cookie
    const payload = {
      ok: true,
      forwarded: forwardOk,
      forwardResponse: forwardText ? forwardText : undefined,
    }

    return new NextResponse(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookie,
      },
    })
  } catch (err) {
    console.error('Error in /api/feedback route:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
