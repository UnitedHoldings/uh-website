import projects from '@/data/projects';
import Agent from '@/components/Agent';

export default function Projects() {
  return (
    <main className="max-w-[1400px] mx-auto px-4 py-12">
      <h1 className="text-4xl font-semibold text-[#9b1c20] mb-6">Projects & Initiatives</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map(p => (
          <article key={p.id} className="bg-white p-6 rounded-xl -sm">
            <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
            <p className="text-gray-600">{p.summary}</p>
            <p className="text-sm text-gray-400 mt-3">{p.year}</p>
          </article>
        ))}
      </div>

      <Agent />
    </main>
  );
}
