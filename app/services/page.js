import Agent from '@/components/Agent';

const services = [
  { id: 'insurance', title: 'Insurance', desc: 'Life, motor, home and business insurance solutions tailored to your needs.' },
  { id: 'loans', title: 'Loans & Credit', desc: 'Micro loans and consumer finance with competitive rates.' },
  { id: 'payments', title: 'United Pay', desc: 'Fast, secure payment solutions for individuals and businesses.' },
];

export default function Services() {
  return (
    <main className="max-w-[1400px] mx-auto px-4 py-12">
      <h1 className="text-4xl font-semibold text-[#9b1c20] mb-6">Our Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map(s => (
          <div key={s.id} className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{s.title}</h3>
            <p className="text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>

      <Agent />
    </main>
  );
}
