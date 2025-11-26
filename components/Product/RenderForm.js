'use client'
import React, { useState, useEffect } from 'react';
import { LoadingState } from './LoadingState';

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
    }, [product]);

    // Helper function to find field keys by type or label pattern
    const findFieldKey = (patterns, type = null) => {
        if (!formConfig || !formConfig.formFields) return null;
        
        for (const field of formConfig.formFields) {
            // Check by type first
            if (type && field.type === type) {
                return field.fieldKey;
            }
            // Check by field key patterns
            for (const pattern of patterns) {
                if (field.fieldKey.toLowerCase().includes(pattern)) {
                    return field.fieldKey;
                }
            }
            // Check by label patterns as fallback
            for (const pattern of patterns) {
                if (field.label.toLowerCase().includes(pattern)) {
                    return field.fieldKey;
                }
            }
        }
        return null;
    };

    // Transform flat form data to the required API payload structure
    const transformFormDataToPayload = (flatFormData) => {
        if (!formConfig || !formConfig.formFields) {
            return null;
        }

        const formFields = formConfig.formFields.map(field => {
            let value = flatFormData[field.fieldKey] || '';
            
            // Convert value types based on field type
            switch (field.type) {
                case 'number':
                    value = value ? Number(value) : 0;
                    break;
                case 'checkbox':
                    value = Boolean(value);
                    break;
                // Add other type conversions as needed
                default:
                    // Keep as string for text, email, tel, date, select
                    break;
            }

            return {
                fieldKey: field.fieldKey,
                label: field.label,
                value: value,
                type: field.type
            };
        });

        return {
            product: product?.name || '',
            companyCode: company?.code || 'UGI', // Fallback to UGI if company code not available
            formFields: formFields
        };
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted. formData:', formData);
        
        // Validate that all required fields have values
        if (!formConfig || !formConfig.formFields) {
            setError('Form configuration not loaded. Please try again.');
            return;
        }

        const emptyFields = [];

        // Check all required fields for empty values
        formConfig.formFields.forEach(field => {
            const fieldValue = (formData[field.fieldKey] || '').toString().trim();
            if (!fieldValue) {
                emptyFields.push(field.label);
            }
        });

        // If there are empty fields, show error with specific field names
        if (emptyFields.length > 0) {
            setError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
            return;
        }

        // (email validation moved below after extracting the dynamic email value)

        // Build a flat payload expected by the page-level handler (name, email, phone at top-level)
        const nameFieldKey = findFieldKey(['name', 'fullname', 'firstname', 'lastname']);
        const emailFieldKey = findFieldKey(['email'], 'email');
        const phoneFieldKey = findFieldKey(['phone', 'mobile', 'tel', 'cell'], 'tel');

        const nameVal = nameFieldKey ? (formData[nameFieldKey] || '').toString().trim() : '';
        const emailVal = emailFieldKey ? (formData[emailFieldKey] || '').toString().trim() : '';
        const phoneVal = phoneFieldKey ? (formData[phoneFieldKey] || '').toString().trim() : '';

        // Validate email format if we found an email field
        if (emailVal) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailVal)) {
                setError('Please enter a valid email address.');
                return;
            }
        }

        // Build flat payload containing all form fields keyed by their fieldKey
        const flatPayload = formConfig.formFields.reduce((acc, f) => {
            acc[f.fieldKey] = formData[f.fieldKey] || '';
            return acc;
        }, {});

        // Ensure top-level name/email/phone keys exist for the page handler
        if (nameVal) flatPayload.name = nameVal;
        if (emailVal) flatPayload.email = emailVal;
        if (phoneVal) flatPayload.phone = phoneVal;

        // Also prepare the API-specific payload (kept for debugging/logs)
        const apiPayload = transformFormDataToPayload(formData);
        if (!apiPayload) {
            setError('Failed to prepare form data for submission.');
            return;
        }

        console.log('Prepared flat payload for page handler:', flatPayload);
        console.log('Prepared API payload for remote endpoint:', apiPayload);

        // Clear any previous error and call the page-level submit handler with the flat payload
        setError(null);
        sendQuote(apiPayload);
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
                <LoadingState />
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