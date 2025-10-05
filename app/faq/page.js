export const metadata = {
  title: 'FAQ - United Holdings',
  description: 'Frequently asked questions about policies, proofs of insurance and client support.'
};

export default function FAQ() {
  return (
    <main className="max-w-[1100px] mx-auto px-4 py-12 font-outfit">
      <h1 className="text-3xl font-bold text-[#9b1c20] mb-6">FAQ's</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Proof of Insurance</h2>
        <p id="proof-insurance" className="text-gray-700 leading-relaxed">If you need proof of insurance (for a claim, a third party, or other verification), you can download policy schedules and certificates from the Policyholder Client Area after you login. If you do not have an online account, contact our support team at <a href="mailto:info@united.co.sz" className="text-[#9b1c20] underline">info@united.co.sz</a> or call 800 1010 and we will email or post the relevant documents after verification.</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">How do I register for the Client Area?</h3>
        <p className="text-gray-700">New users can register using their policy number and ID document. If you experience difficulty, contact our support team for assistance.</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">How long does a claim take?</h3>
        <p className="text-gray-700">Claim processing times vary depending on the type of claim and the documents provided. Our team aims to acknowledge all claims within 48 hours and will communicate expected timelines during the assessment.</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Payments and receipts</h3>
        <p className="text-gray-700">You can view payment history and download receipts in the Client Area. For payment issues, contact billing via 800 1010.</p>
      </section>

      <section className="mt-8 text-sm text-gray-600">
        <p>If you don't find an answer here, please email <a href="mailto:info@united.co.sz" className="text-[#9b1c20] underline">info@united.co.sz</a> or call 800 1010.</p>
      </section>
    </main>
  );
}
