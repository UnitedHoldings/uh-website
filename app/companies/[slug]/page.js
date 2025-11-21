import CompanyProductsPage from "@/components/Companies/CompnayProductPage";

export default function CompanyPage({ params }) {
  // Validate company code
  const validCompanyCodes = ['UGI', 'ULA', 'UP'];
  console.log(params);
  
  const companyCode = params.slug.toUpperCase();
  
  if (!validCompanyCodes.includes(companyCode)) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Company Not Found</h1>
          <p className="text-gray-600 mb-4">The company code "{params.companyCode}" is not valid.</p>
          <a 
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-[#9b1c20] transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return <CompanyProductsPage companyCode={companyCode} />;
}

// Generate static params for SSG
export async function generateStaticParams() {
  return [
    { companyCode: 'ugi' },
    { companyCode: 'ula' },
    { companyCode: 'up' },
  ];
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const companyCode = params.slug.toUpperCase();
  const companyNames = {
    UGI: 'United General Insurance',
    ULA: 'United Life Assurance', 
    UP: 'United Pay'
  };

  const companyName = companyNames[companyCode] || 'Company';

  return {
    title: `${companyName} | Products`,
    description: `Explore insurance products and services from ${companyName}`,
  };
}