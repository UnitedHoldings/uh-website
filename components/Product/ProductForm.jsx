// components/Product/ProductForm.jsx

import RenderForm from "./RenderForm";


export const ProductForm = ({
  product,
  company,
  formData,
  handleInputChange,
  handleFormSubmit,
  isSubmitting,
  submitMessage,
  submitError,
  companyText
}) => {
  return (
    <>
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="bg-white w-full rounded-lg sm:rounded-xl -lg p-4 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4 items-center mx-auto text-black">
          <div className='w-full flex flex-col text-center sm:text-left'>
            <p className='text-xl sm:text-2xl md:text-3xl font-light mb-2'>
              Let&apos;s get started
            </p>
            <p className='font-semibold text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8'>
              {companyText.formTitle}
            </p>
          </div>

          <RenderForm
            product={product}
            formData={formData}
            handleInputChange={handleInputChange}
            company={company}
            sendQuote={handleFormSubmit}
            isSubmitting={isSubmitting}
            submitMessage={submitMessage}
            submitError={submitError}
            companyText={companyText}
          />
        </div>
      </div>

      {/* Success and Error Messages */}
      {(submitMessage || submitError) && (
        <div className={`mt-4 p-4 rounded-lg ${submitMessage ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {submitMessage || submitError}
        </div>
      )}
    </>
  );
};