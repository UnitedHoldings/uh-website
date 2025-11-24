import React, { useState, useEffect } from 'react';

// Reusable Input Field Component
const InputField = ({ label, name, type = 'text', value, onChange, required = false, className = ' ', ...props }) => (
    <div className={className}>
        <label className=" block text-xs font-medium text-gray-800 ">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={label}
            className="w-full  py-2 outline-none  bg-white border-gray-300 border-b   placeholder-gray-300  "
            {...props}
        />
    </div>
);

// Reusable Select Field Component
const SelectField = ({ label, name, value, onChange, options, required = false, className = '' }) => (
    <div className={className}>
        <label className="block text-xs font-medium text-gray-800 ">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full  py-2 outline-none  bg-white border-gray-300 border-b   placeholder-gray-300 "
        >
            <option value="" disabled>{`Select ${label}`}</option>
            {options && options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default function RenderForm({ 
    product, 
    formData, 
    handleInputChange, 
    company,
    sendQuote,
    isSubmitting,
    submitMessage,
    submitError,
    companyText 
}) {
    const [formConfig, setFormConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to determine product category key
    const getProductCategoryKey = () => {
        const productName = product.name.toLowerCase();
        
        if (productName.includes('funeral') || productName.includes('life') || productName.includes('credit life') || productName.includes('group life')) {
            return 'life_insurance';
        } else if (productName.includes('motor') || productName.includes('car')) {
            return 'motor_insurance';
        } else if (productName.includes('home') || productName.includes('property')) {
            return 'home_insurance';
        } else if (productName.includes('legal')) {
            return 'legal_insurance';
        } else if (productName.includes('personal accident')) {
            return 'personal_accident';
        } else if (productName.includes('multimark') || productName.includes('business') || productName.includes('professional') || productName.includes('fidelity') || productName.includes('engineering')) {
            return 'business_insurance';
        } else if (productName.includes('loan') || productName.includes('micro') || productName.includes('umlamleli')) {
            return 'loan_products';
        }
        return 'general_insurance';
    };

    // Fetch form configuration from API
    useEffect(() => {
        const fetchFormConfig = async () => {
            try {
                setLoading(true);
                const categoryKey = getProductCategoryKey();
                
                const response = await fetch(
                    `/api/form-category?${new URLSearchParams({ categoryKey })}`
                );
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch form configuration: ${response.status}`);
                }
                
                const config = await response.json();
                setFormConfig(config);
                setError(null);
            } catch (err) {
                console.error('Error fetching form configuration:', err);
                setError(err.message);
                // Fallback to empty config
                setFormConfig({ fields: [] });
            } finally {
                setLoading(false);
            }
        };

        if (product) {
            fetchFormConfig();
        }
    }, [product]);

    // Function to render field based on configuration
    const renderField = (field) => {
        const commonProps = {
            key: field.name,
            label: field.label,
            name: field.name,
            value: formData[field.name] || '',
            onChange: handleInputChange,
            required: field.required || false,
            className: field.className || ''
        };

        switch (field.type) {
            case 'select':
                return (
                    <SelectField
                        {...commonProps}
                        options={field.options || []}
                    />
                );
            case 'number':
                return (
                    <InputField
                        {...commonProps}
                        type="number"
                    />
                );
            case 'date':
                return (
                    <InputField
                        {...commonProps}
                        type="date"
                    />
                );
            case 'email':
                return (
                    <InputField
                        {...commonProps}
                        type="email"
                    />
                );
            case 'tel':
                return (
                    <InputField
                        {...commonProps}
                        type="tel"
                    />
                );
            default:
                return (
                    <InputField
                        {...commonProps}
                        type="text"
                    />
                );
        }
    };

    // Render product-specific fields from API configuration
    const renderProductFields = () => {
        if (loading) {
            return (
                <div className="flex justify-center py-8">
                    <div className="animate-pulse text-gray-500">Loading form configuration...</div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex justify-center py-8">
                    <div className="text-red-500">Error loading form: {error}</div>
                </div>
            );
        }

        if (!formConfig || !formConfig.fields || formConfig.fields.length === 0) {
            return (
                <div className="flex justify-center py-8">
                    <div className="text-gray-500">No form configuration available for this product.</div>
                </div>
            );
        }

        return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
                {formConfig.fields.map(field => renderField(field))}
            </div>
        );
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.phone) {
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return;
        }

        // Call the sendQuote function from parent
        sendQuote(formData);
    };

    return (
        <form onSubmit={handleFormSubmit} className='gap-6 flex flex-col w-full'>
            {/* General Information Section */}
            <div className='flex w-full justify-center items-center gap-4'>
                <p className='font-semibold text-[#9b1c20] whitespace-nowrap '>General Information</p>
                <div className='h-[0.5px] w-full bg-gray-200 mt-1' />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                <InputField 
                    label="Full Name" 
                    name="name" 
                    value={formData.name || ''} 
                    onChange={handleInputChange} 
                    required 
                />
                <InputField 
                    label="Email" 
                    name="email" 
                    type="email" 
                    value={formData.email || ''} 
                    onChange={handleInputChange} 
                    required 
                />
                <InputField 
                    label="Phone Number" 
                    name="phone" 
                    type="tel" 
                    value={formData.phone || ''} 
                    onChange={handleInputChange} 
                    required 
                />
                <SelectField
                    label="Cover Plan"
                    name="coverPlan"
                    value={formData.coverPlan || ''}
                    onChange={handleInputChange}
                    options={[
                        { value: 'E10000', label: 'E10,000' },
                        { value: 'E20000', label: 'E20,000' },
                        { value: 'E30000', label: 'E30,000' },
                        { value: 'E40000', label: 'E40,000' },
                        { value: 'E50000', label: 'E50,000' }
                    ]}
                />
                <InputField 
                    label="Date of Birth" 
                    name="dob" 
                    type="date" 
                    value={formData.dob || ''} 
                    onChange={handleInputChange} 
                />
                <InputField 
                    label="Physical Address" 
                    name="address" 
                    value={formData.address || ''} 
                    onChange={handleInputChange} 
                />
            </div>

            {/* Product-Specific Information Section */}
            <div className='flex w-full justify-center items-center gap-4'>
                <p className='font-semibold text-[#9b1c20] whitespace-nowrap '>{product.name} Information</p>
                <div className='h-[0.5px] w-full bg-gray-200 mt-1' />
            </div>
            
            {renderProductFields()}

            {/* Submit Button and Messages */}
            <div className='w-full flex justify-center sm:justify-start mt-4 sm:mt-6'>
                <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className={`px-8 sm:px-12 py-3 sm:py-4 rounded-full font-semibold transition text-sm sm:text-base w-full sm:w-auto ${
                        isSubmitting || loading
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-[#9b1c20] text-white hover:opacity-90'
                    }`}
                >
                    {isSubmitting ? 'Submitting...' : loading ? 'Loading...' : companyText.submitButtonText}
                </button>
            </div>

            {/* Display submission messages */}
            {submitMessage && (
                <div className="text-green-600 text-center mt-4">
                    {submitMessage}
                </div>
            )}
            {submitError && (
                <div className="text-red-600 text-center mt-4">
                    {submitError}
                </div>
            )}
        </form>
    );
}