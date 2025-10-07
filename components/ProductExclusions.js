import React from 'react';

export default function ProductExclusions({ exclusions }) {
  if (!exclusions || exclusions.length === 0) return null;
  return (
    <section className="py-8 px-4 max-w-2xl mx-auto">
      <h2 className="font-semibold mb-2">Exclusions</h2>
      <ul className="space-y-2">
        {exclusions.map(item => (
          <li key={item.title} className="border-b pb-2">
            <strong>{item.title}:</strong> {item.content}
          </li>
        ))}
      </ul>
    </section>
  );
}
