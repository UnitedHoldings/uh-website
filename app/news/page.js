import news from '@/data/news';
import Agent from '@/components/Agent';

export default function News() {
  return (
    <main className="max-w-[1400px] mx-auto px-4 py-12">
      <h1 className="text-4xl font-semibold text-[#9b1c20] mb-6">Latest News</h1>

      <div className="flex flex-col gap-6">
        {news.map(item => (
          <article key={item.id} className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{item.date}</p>
            <p className="text-gray-600">{item.excerpt}</p>
          </article>
        ))}
      </div>

      <Agent />
    </main>
  );
}
