"use client";
import { useState } from "react";

export default function ClientLogin({ onAuth }) {
  const [policyNumber, setPolicyNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    // Very small demo auth: require both fields
    if (!policyNumber || !idNumber) {
      setError("Please enter both Policy Number and ID Number.");
      return;
    }

    // Simulate authentication and return mock user data
    const user = {
      name: "Thandiwe M.",
      policyNumber,
      idNumber,
      email: "thandiwe@example.com",
    };

    onAuth(user);
  }

  return (
    <div className="max-w-md mx-auto bg-white/60 backdrop-blur-md p-6 rounded-md shadow">
      <h3 className="text-2xl font-semibold mb-3">Policyholder Login</h3>
      <p className="text-sm text-gray-700 mb-4">Enter your policy number and ID to access the client area.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="p-2 rounded border"
          placeholder="Policy Number"
          value={policyNumber}
          onChange={(e) => setPolicyNumber(e.target.value)}
        />
        <input
          className="p-2 rounded border"
          placeholder="ID Number"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-red-600 text-white rounded" type="submit">Login</button>
          <button type="button" onClick={() => { setPolicyNumber(''); setIdNumber(''); setError(''); }} className="px-4 py-2 border rounded">Clear</button>
        </div>
      </form>
    </div>
  );
}
