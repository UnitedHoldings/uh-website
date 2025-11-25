'use client'
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
const SelectField = ({ label, name, value, onChange, options = [], required = false, className = '' }) => (
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
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

// Field renderer based on field configuration from API
const DynamicField = ({ field, value, onChange, className = '' }) => {
    const commonProps = {
        label: field.label,
        name: field.fieldKey, // Use fieldKey from API as name
        value: value || '',
        onChange: onChange,
        required: true, // All fields from API are required
        className: className
    };

    switch (field.type) {
        case 'select':
            return <SelectField {...commonProps} options={field.options || []} />;
        case 'date':
            return <InputField {...commonProps} type="date" />;
        case 'number':
            return <InputField {...commonProps} type="number" />;
        case 'email':
            return <InputField {...commonProps} type="email" />;
        case 'tel':
            return <InputField {...commonProps} type="tel" />;
        default:
            return <InputField {...commonProps} type="text" />;
    }
};

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

    // Clear local validation error when user updates form data
    useEffect(() => {
        if (error) {
            setError(null);
        }
    }, [formData]);

    // Function to determine product category key based on API structure
    const getProductCategoryKey = () => {
        if (!product || !product.name) return 'general_insurance';
        
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
            return 'personal_accident_insurance';
        } else if (productName.includes('multimark') || productName.includes('business') || productName.includes('professional') || productName.includes('fidelity') || productName.includes('engineering')) {
            return 'business_insurance';
        } else if (productName.includes('loan') || productName.includes('micro') || productName.includes('umlamleli')) {
            return 'loan_products';
        }
        return 'general_insurance';
    };

    // Fetch form configuration from external API
    useEffect(() => {
        const fetchFormConfig = async () => {
            // Don't fetch if no product
            if (!product) {
                setLoading(false);
                return;
            }

            const categoryKey = getProductCategoryKey();
            
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://website.api.united.co.sz/api/form-category?categoryKey=${categoryKey}`
                );
                console.log( `https://website.api.united.co.sz/api/form-category?categoryKey=${categoryKey}`);
                
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch form configuration: ${response.status}`);
                }
                
                const result = await response.json();
                
                if (result.success && result.data) {
                    setFormConfig(result.data);
                } else {
                    throw new Error(result.message || 'Invalid API response');
                }
            } catch (err) {
                console.error('Error fetching form configuration:', err);
                setError(err.message);
                setFormConfig(null);
            } finally {
                setLoading(false);
            }
        };

        fetchFormConfig();
    }, [product]); // Changed dependency to product object instead of product.name

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted. formData:', formData);
        
        // Tolerate several common field keys for name, email, phone
        const nameVal = (
            formData.fullName || formData.name || formData.full_name || formData.firstName || formData.first_name || ''
        ).toString().trim();
        const emailVal = (
            formData.email || formData.Email || formData.userEmail || formData.emailAddress || ''
        ).toString().trim();
        const phoneVal = (
            formData.phone || formData.mobile || formData.telephone || formData.phoneNumber || formData.mobileNumber || ''
        ).toString().trim();

        // Debug log to see what values we're checking
        console.log('Validation check - name:', nameVal, 'email:', emailVal, 'phone:', phoneVal);

        if (!nameVal) {
            setError('Please enter your full name.');
            return;
        }
        if (!emailVal) {
            setError('Please enter your email address.');
            return;
        }
        if (!phoneVal) {
            setError('Please enter your phone number.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Clear any previous error and call the sendQuote function from parent
        setError(null);
        // Normalize commonly-used keys when sending so backend receives expected shape
        const payload = {
            ...formData,
            name: nameVal,
            email: emailVal,
            phone: phoneVal,
        };

        console.log('Sending payload:', payload);
        sendQuote(payload);
    };

    if (!product) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-gray-600">No product selected</div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-gray-600">Loading form configuration...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-red-600 text-center">
                    <p>Error loading form configuration</p>
                    <p className="text-sm text-gray-600 mt-2">
                        Please try again later or contact support
                    </p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleFormSubmit} className='gap-6 flex flex-col w-full'>
            {/* General Information Section - Using fields from API */}
            {formConfig && formConfig.formFields && formConfig.formFields.length > 0 && (
                <div>
                    <div className='flex w-full justify-center items-center gap-4'>
                        <p className='font-semibold text-[#9b1c20] whitespace-nowrap '>
                            {formConfig.categoryName || product.name} Information
                        </p>
                        <div className='h-[0.5px] w-full bg-gray-200 mt-1' />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {formConfig.formFields.map((field) => (
                            <DynamicField
                                key={field.fieldKey}
                                field={field}
                                value={formData[field.fieldKey]}
                                onChange={handleInputChange}
                            />
                        ))}
                    </div>
                </div>
            )}

           

            {/* Submit Button */}
            <div className='w-full flex justify-center sm:justify-start mt-4 sm:mt-6'>
                <button
                    type="submit"
                    disabled={isSubmitting || !formConfig}
                    className={`px-8 sm:px-12 py-3 sm:py-4 rounded-full text-white font-semibold transition text-sm sm:text-base w-full sm:w-auto ${
                        isSubmitting || !formConfig
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-[#9b1c20] text-white hover:opacity-90'
                    }`}
                >
                    {isSubmitting ? 'Submitting...' : "Submit"}
                </button>
            </div>

            {/* Display submit messages */}
            {submitMessage && (
                <div className="text-green-600 text-center">{submitMessage}</div>
            )}
            {submitError && (
                <div className="text-red-600 text-center">{submitError}</div>
            )}
            {error && (
                <div className="text-red-600 text-center">{error}</div>
            )}
        </form>
    );
}