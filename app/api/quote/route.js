/**
 * API Route: POST /api/quote
 * 
 * This route serves as a proxy for quote requests, forwarding them to the backend
 * API while avoiding CORS issues on the client side.
 */

export async function POST(request) {
  try {
    const body = await request.json();

    
    // Forward the request to the backend API
    const response = await fetch('https://website.api.united.co.sz/api/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Handle different response statuses
    if (response.status === 204) {
      return new Response(JSON.stringify({ success: true, message: 'Quote request submitted successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status} ${response.statusText}`);
    }

    // Try to parse response as JSON
    const responseText = await response.text();
    if (responseText.trim()) {
      try {
        const result = JSON.parse(responseText);
        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (parseError) {
        return new Response(JSON.stringify({ success: true, message: 'Quote request processed', rawResponse: responseText }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({ success: true, message: 'Quote request submitted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {

    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
