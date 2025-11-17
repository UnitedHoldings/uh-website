import { NextResponse } from 'next/server'

const SLIDES_API_URL = 'http://uh-server-staging-688256516165.asia-east1.run.app/api/home'

export async function GET() {
  try {
    const response = await fetch(SLIDES_API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Error fetching slides:', err)
    return NextResponse.json(
      { error: 'Failed to fetch slides data' },
      { status: 500 }
    )
  }
}