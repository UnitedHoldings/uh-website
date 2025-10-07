import React from 'react';

export default function ProductHowToApply({ howToApply, paymentMethods }) {
  if (!howToApply || howToApply.length === 0) return null;
  return (
    <section className="py-8 px-4 max-w-2xl mx-auto">
      <h2 className="font-semibold mb-2">How to Apply</h2>
      <ol className="list-decimal pl-5">
        {howToApply.map(step => <li key={step}>{step}</li>)}
      </ol>
      {paymentMethods && paymentMethods.length > 0 && (
        <div className="mt-2 text-sm text-gray-500">Payment methods: {paymentMethods.join(', ')}</div>
      )}
    </section>
  );
}
