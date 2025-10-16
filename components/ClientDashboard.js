"use client";
import { useState } from "react";

function PolicyList({ policies }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {policies.map((p) => (
        <div key={p.id} className="p-4 border rounded bg-white/60">
          <h4 className="font-semibold">{p.type} <span className="text-sm text-gray-600">({p.policyNumber})</span></h4>
          <p className="text-sm">Status: <strong>{p.status}</strong></p>
          <p className="text-sm">Cover: {p.cover}</p>
          <div className="mt-2 flex gap-2">
            <button className="px-3 py-1 bg-red-600 text-white rounded text-sm">View</button>
            <button className="px-3 py-1 border rounded text-sm">Download</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ClientDashboard({ user, data }) {
  const [policies] = useState(data.policies);
  const [claims] = useState(data.claims);
  const [payments] = useState(data.payments);

  return (
    <div className="space-y-6">
      <header className="bg-white/40 p-4 rounded-md  flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Welcome, {user.name}</h2>
          <p className="text-sm text-gray-700">Policy: {user.policyNumber}</p>
        </div>
        <div className="text-right text-sm">
          <p>Member since 2019</p>
          <p className="text-red-600 font-semibold">Account secure</p>
        </div>
      </header>

      <section>
        <h3 className="text-xl font-semibold mb-3">Policy Management</h3>
        <PolicyList policies={policies} />
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Claims (recent)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {claims.map((c) => (
            <div key={c.id} className="p-4 border rounded bg-white/60">
              <p className="font-semibold">{c.type} — {c.status}</p>
              <p className="text-sm">Amount: {c.amount}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Payments & Billing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {payments.map((t) => (
            <div key={t.id} className="p-3 border rounded bg-white/60 text-sm">
              <p>{t.date}</p>
              <p className="font-semibold">{t.amount}</p>
              <p className="text-gray-700">{t.method}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Support & Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded bg-white/60">
            <h4 className="font-semibold">Documents</h4>
            <p className="text-sm">Download policy schedules, certificates, and statements.</p>
            <button className="mt-2 px-3 py-1 border rounded text-sm">Open Vault</button>
          </div>
          <div className="p-4 border rounded bg-white/60">
            <h4 className="font-semibold">Customer Support</h4>
            <p className="text-sm">Chat, raise a ticket, or schedule a callback.</p>
            <button className="mt-2 px-3 py-1 border rounded text-sm">Contact Support</button>
          </div>
        </div>
      </section>
    </div>
  );
}
