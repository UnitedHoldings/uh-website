"use client";

import React, { useState } from 'react';

export default function ClaimForm() {
  const [form, setForm] = useState({
    fullName: '',
    policyNumber: '',
    phone: '',
    email: '',
    incidentDate: '',
    incidentDescription: '',
    files: []
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleFiles(e) {
    setForm(prev => ({ ...prev, files: Array.from(e.target.files) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);

    // Mock submit - replace with real API call
    await new Promise(r => setTimeout(r, 1000));

    setSubmitting(false);
    setSuccess({
      reference: `CLM-${Math.floor(100000 + Math.random() * 900000)}`,
      message: 'Your claim has been submitted. Our claims team will contact you within 48 hours.'
    });

    // Clear files & keep data
    setForm(prev => ({ ...prev, files: [] }));
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            placeholder="Full name"
            className="col-span-1 md:col-span-1 border rounded-full px-4 py-2"
          />
          <input
            name="policyNumber"
            value={form.policyNumber}
            onChange={handleChange}
            required
            placeholder="Policy number"
            className="col-span-1 md:col-span-1 border rounded-full px-4 py-2"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="col-span-1 md:col-span-1 border rounded-full px-4 py-2"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
            type="email"
            className="col-span-1 md:col-span-2 border rounded-full px-4 py-2"
          />
          <input
            name="incidentDate"
            value={form.incidentDate}
            onChange={handleChange}
            type="date"
            className="col-span-1 md:col-span-1 border rounded-full px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Describe the incident</label>
          <textarea
            name="incidentDescription"
            value={form.incidentDescription}
            onChange={handleChange}
            rows={5}
            required
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Provide details about what happened, location, parties involved, estimated damage, police report (if any)..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Upload supporting documents (photos, receipts, police report)</label>
          <input type="file" multiple onChange={handleFiles} className="w-full" />
          {form.files.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600">
              {form.files.map((f, i) => <li key={i}>{f.name}</li>)}
            </ul>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-[#9b1c20] text-white px-6 py-3 rounded-full font-semibold shadow"
          >
            {submitting ? 'Submitting...' : 'Submit Claim'}
          </button>
          <button
            type="button"
            onClick={() => setForm({ fullName: '', policyNumber: '', phone: '', email: '', incidentDate: '', incidentDescription: '', files: [] })}
            className="border border-gray-300 px-6 py-3 rounded-full"
          >
            Reset
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p className="font-semibold">Disclaimer</p>
          <p>
            The information you provide is for claim registration only and does not imply acceptance of liability or confirmation of cover. Final settlement and cover depend on policy terms, verification and underwriting. For urgent assistance call 800 1010.
          </p>
        </div>
      </form>

      {success && (
        <div className="mt-6 border-l-4 border-[#9b1c20] bg-green-50 p-4 rounded">
          <p className="font-semibold text-sm">Claim Submitted</p>
          <p className="text-sm text-gray-700 mt-1">{success.message}</p>
          <p className="text-sm mt-2">Reference: <span className="font-mono text-[#9b1c20]">{success.reference}</span></p>
        </div>
      )}
    </div>
  );
}
