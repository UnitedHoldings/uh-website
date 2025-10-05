"use client";

import React, { useState } from 'react';

export default function ClaimTracker() {
  const [ref, setRef] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleTrack(e) {
    e.preventDefault();
    if (!ref) return;
    setLoading(true);
    setResult(null);

    // Mock lookup - replace with real API call
    await new Promise(r => setTimeout(r, 900));

    // Mocked statuses
    const statuses = [
      { date: '2025-09-20', status: 'Registered - Awaiting documents' },
      { date: '2025-09-22', status: 'Under assessment' },
      { date: '2025-09-24', status: 'Approved - Payment processing' }
    ];

    setResult({
      reference: ref.toUpperCase(),
      policy: 'POL-' + Math.floor(10000 + Math.random() * 90000),
      statusHistory: statuses
    });

    setLoading(false);
  }

  return (
    <div>
      <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4 items-start">
        <input
          value={ref}
          onChange={e => setRef(e.target.value)}
          placeholder="Enter claim reference (e.g., CLM-123456)"
          className="flex-1 border rounded-full px-4 py-2"
        />
        <button className="bg-[#9b1c20] text-white px-6 py-2 rounded-full" type="submit" disabled={loading}>
          {loading ? 'Searching…' : 'Track Claim'}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Reference</p>
              <p className="font-mono text-xl text-[#9b1c20]">{result.reference}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Policy</p>
              <p className="font-semibold">{result.policy}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-semibold mb-2">Status History</p>
            <ul className="space-y-2 text-sm text-gray-700">
              {result.statusHistory.map((s, i) => (
                <li key={i} className="flex justify-between border rounded p-3 bg-white">
                  <span className="text-xs text-gray-500">{s.date}</span>
                  <span>{s.status}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            <p>If you need further assistance, call 800 1010 or email <a href="mailto:info@united.co.sz" className="text-[#9b1c20] underline">info@united.co.sz</a>.</p>
          </div>
        </div>
      )}
    </div>
  );
}
