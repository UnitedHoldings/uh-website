"use client";
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic client-side validation
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', message: 'Please fill all fields.' });
      return;
    }

    setStatus({ type: 'success', message: 'Thanks — we will get back to you shortly.' });
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <main className="max-w-[900px] mx-auto px-4 py-12">
      <h1 className="text-4xl font-semibold text-[#9b1c20] mb-6">Contact Us</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="border p-3 rounded" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-3 rounded" />
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="border p-3 rounded h-32" />

          <div className="flex items-center justify-between">
            <button type="submit" className="bg-[#9b1c20] text-white px-6 py-2 rounded">Send Message</button>
            {status && (
              <p className={`${status.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{status.message}</p>
            )}
          </div>
        </div>
      </form>
    </main>
  );
}
