// components/Product/HeroSection.jsx
import { ProductForm } from './ProductForm';

const COMPANY_COLORS = {
  'UGI': '#286278',
  'ULA': '#3d834d',
  'UP': '#f79620',
};

const getCompanySpecificText = (company) => {
  switch (company) {
    case 'UP':
      return {
        mainHeading: 'Get hassle-free financing for all your needs',
        formTitle: 'Please complete the details for your loan application',
      };
    case 'ULA':
      return {
        mainHeading: 'Get peace of mind with life assurance protection', 
        formTitle: 'Please complete the details for your life assurance quote',
      };
    default:
      return {
        mainHeading: 'Get hassle-free cover for all your insurance needs',
        formTitle: 'Please complete the details for your insurance quote',
      };
  }
};

export const HeroSection = ({ 
  product, 
  company, 
  formData, 
  handleInputChange, 
  handleFormSubmit, 
  isSubmitting, 
  submitMessage, 
  submitError 
}) => {
  const departmentColor = COMPANY_COLORS[company] || '#9b1c20';
  const isLightColor = departmentColor === '#f79620';
  const companyText = getCompanySpecificText(company);

  return (
    <div className='relative'>
      <div className='absolute w-full -z-10'>
        <div
          className='h-full w-full absolute opacity-20'
          style={{ backgroundColor: departmentColor }}
        />
        <img
          src={product.heroImage}
          alt={product.name}
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[720px] object-cover"
        />
      </div>

      <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-32 flex items-center">
        <div className="max-w-[1400px] mx-auto px-4 w-full gap-8 sm:gap-12 md:gap-16 lg:gap-24 flex flex-col">
          {/* Product Name */}
          <div className='flex items-center justify-center text-center'>
            <h1 className='font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-tight'>
              {product.name}
            </h1>
          </div>

          {/* Quote Form Section */}
          <div
            className="w-full px-4 sm:px-6 md:px-8 flex flex-col rounded-xl sm:rounded-2xl -xl mx-auto text-white py-6 sm:py-8"
            style={{ backgroundColor: departmentColor }}
          >
            <div className='space-y-3 sm:space-y-4 text-center sm:text-left'>
              <p className='text-2xl sm:text-3xl md:text-4xl font-semibold max-w-lg mx-auto sm:mx-0'>
                {companyText.mainHeading}
              </p>
              <p className='text-sm sm:text-base font-light max-w-md mx-auto sm:mx-0'>
                {product.tagline}
              </p>
            </div>

            <ProductForm
              product={product}
              company={company}
              formData={formData}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
              submitMessage={submitMessage}
              submitError={submitError}
              companyText={companyText}
            />

            {/* Disclaimer */}
            <div className={`text-xs mt-4 sm:mt-6 space-y-2 ${isLightColor ? 'text-gray-700' : 'text-gray-200'}`}>
              <p className={`font-bold text-lg sm:text-xl ${isLightColor ? 'text-gray-800' : 'text-gray-100'}`}>
                Disclaimer
              </p>
              <p className='text-justify'>
                {company === 'UP'
                  ? `We value your privacy and are committed to safeguarding your personal information. By submitting your details, you consent to us processing them for the purpose of providing you with a personalized loan offer. Loan approval is subject to credit assessment and affordability criteria. Interest rates and terms vary based on individual circumstances. It is essential that all information provided is accurate, as discrepancies may impact the validity of your application.`
                  : `We value your privacy and are committed to safeguarding your personal information. By submitting your details, you consent to us processing them for the purpose of providing you with a personalized quote. Please note that some of our advisors operate under supervision to ensure consistently excellent service. Quoted premiums are based on your individual risk profile and are subject to annual review in line with economic conditions and underwriting criteria. Terms, conditions, and benefit limits apply. It is essential that all information provided is accurate, as discrepancies may impact the validity or outcome of any future claims.`
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};