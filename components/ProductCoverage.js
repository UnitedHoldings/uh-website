import React from 'react';

export default function ProductCoverage({ coverage }) {
  if (!coverage || coverage.length === 0) return null;
  return (
    <section className="py-8 px-4 max-w-2xl mx-auto">
      <h2 className="font-semibold mb-2">Coverage Details</h2>
      <ul className="space-y-2">
        {coverage.map(item => (
          <li key={item.title} className="border-b pb-2">
            <strong>{item.title}:</strong> {item.content}
          </li>
        ))}
      </ul>
    </section>
  );
}
