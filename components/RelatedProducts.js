import React from 'react';

export default function RelatedProducts({ related }) {
  if (!related || related.length === 0) return null;
  return (
    <section className="py-8 px-4 max-w-2xl mx-auto">
      <h2 className="font-semibold mb-2">Related Products</h2>
      <div className="flex gap-4 flex-wrap">
        {related.map(item => (
          <a key={item.name} href={item.link} className="block border rounded-lg p-4 w-48 hover:shadow">
            <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded mb-2" />
            <div className="font-semibold text-sm">{item.name}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
