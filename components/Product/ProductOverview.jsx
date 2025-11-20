// components/Product/ProductOverview.jsx
const COMPANY_COLORS = {
  'UGI': '#286278',
  'ULA': '#3d834d',
  'UP': '#f79620',
};

export const ProductOverview = ({ product, company }) => {
  const departmentColor = COMPANY_COLORS[company] || '#9b1c20';

  return (
    <div className='max-w-[1400px] px-4 my-8 sm:my-12 md:my-16 space-y-6 mx-auto flex flex-col lg:flex-row'>
      <div className='lg:min-w-3/12 w-full lg:w-auto'>
        <h2 className='font-semibold text-2xl sm:text-3xl lg:text-4xl text-center lg:text-left'>
          {product.name}
        </h2>
        <p className='font-light text-gray-600 text-center lg:text-left mt-2'>
          {product.tagline}
        </p>
        <div className="flex flex-col w-full justify-between py-4 lg:py-6"></div>
      </div>

      <div className='w-full lg:border-l lg:border-gray-400 lg:pl-6'>
        <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <p className="text-gray-500 max-w-4xl text-base sm:text-lg leading-relaxed">
              {product.overview}
            </p>
          </div>
          <div>
            <div className="flex gap-3 sm:gap-4 mt-4 flex-wrap justify-center md:justify-start">
              {product.stats && product.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div
                    className="text-white px-3 sm:px-4 py-2 rounded-full font-bold text-sm sm:text-base whitespace-nowrap"
                    style={{ backgroundColor: departmentColor }}
                  >
                    {stat}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};