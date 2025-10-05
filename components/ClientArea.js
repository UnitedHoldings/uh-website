"use client";
import { useState } from "react";
import ClientLogin from "./ClientLogin";
import ClientDashboard from "./ClientDashboard";

const mockData = {
  policies: [
    { id: 1, policyNumber: "UL-00123", type: "United Life Assurance", status: "Active", cover: "Funeral & Credit Life" },
    { id: 2, policyNumber: "UG-00456", type: "United General Insurance", status: "Lapsed", cover: "Motor" },
  ],
  claims: [
    { id: 1, type: "Funeral Claim", status: "Processing", amount: "R3,400" },
    { id: 2, type: "Motor Repair", status: "Paid", amount: "R8,200" },
  ],
  payments: [
    { id: 1, date: "2025-09-10", amount: "R450", method: "Card" },
    { id: 2, date: "2025-06-01", amount: "R1,200", method: "Bank Transfer" },
  ],
};

export default function ClientArea() {
  const [user, setUser] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {!user ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Policyholder Client Area</h1>
            <p className="text-lg text-gray-700 mb-4">Manage policies, submit claims, pay premiums and access documents — all in one secure place.</p>

            <div className="grid gap-3">
              <div className="p-4 border rounded bg-white/60">
                <h4 className="font-semibold">Key Features</h4>
                <ul className="list-disc ml-5 text-sm">
                  <li>Policy Management — view & download schedules</li>
                  <li>Payments & Billing — multiple payment options</li>
                  <li>Claims Services — submit and track claims</li>
                  <li>Profile & Account Updates</li>
                </ul>
              </div>

              <div className="p-4 border rounded bg-white/60">
                <h4 className="font-semibold">Security</h4>
                <p className="text-sm">Bank-grade encryption and multi-factor authentication protect your data.</p>
              </div>

            </div>
          </div>

          <ClientLogin onAuth={(u) => setUser(u)} />
        </div>
      ) : (
        <ClientDashboard user={user} data={mockData} />
      )}
    </div>
  );
}
