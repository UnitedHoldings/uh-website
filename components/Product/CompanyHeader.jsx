// components/Product/CompanyHeader.jsx
const COMPANY_COLORS = {
  'UGI': '#286278',
  'ULA': '#3d834d', 
  'UP': '#f79620',
};

const COMPANY_NAMES = {
  'UGI': 'United General Insurance',
  'ULA': 'United Life Assurance',
  'UP': 'United Pay'
};

export const CompanyHeader = ({ product, company }) => {
  const departmentColor = COMPANY_COLORS[company] || '#9b1c20';
  const companyName = COMPANY_NAMES[company] || company;

  return (
    <div>
      {/* Company Header Bar */}
      <div
        className='h-8 w-full'
        style={{ backgroundColor: departmentColor }}
      />

      {/* Main Header */}
      <div
        className='py-4'
        style={{ backgroundColor: departmentColor }}
      >
        <header className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-center sm:text-left">
              {product.tagline}
            </h1>
            <div className="text-white text-sm sm:text-base bg-black/20 px-3 py-1 rounded-full">
              {companyName}
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};