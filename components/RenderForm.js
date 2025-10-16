import React from 'react';

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
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default function RenderForm({ product, formData, handleInputChange }) {
    const productName = product.name.toLowerCase();
    
    // Function to determine product category
    const getProductCategory = () => {
        if (productName.includes('funeral') || productName.includes('life') || productName.includes('credit life') || productName.includes('group life')) {
            return 'life';
        } else if (productName.includes('motor') || productName.includes('car')) {
            return 'motor';
        } else if (productName.includes('home') || productName.includes('property')) {
            return 'home';
        } else if (productName.includes('legal')) {
            return 'legal';
        } else if (productName.includes('personal accident')) {
            return 'personal-accident';
        } else if (productName.includes('multimark') || productName.includes('business') || productName.includes('professional') || productName.includes('fidelity') || productName.includes('engineering')) {
            return 'business';
        } else if (productName.includes('loan') || productName.includes('micro') || productName.includes('umlamleli')) {
            return 'loan';
        }
        return 'general';
    };

    const productCategory = getProductCategory();
    
    let productFields = null;

    switch (productCategory) {
        // ULA Products - Life Assurance
        case 'life':
            productFields = (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
                    <InputField label="Date of Birth" name="dob" type="date" value={formData.dob || ''} onChange={handleInputChange} required />
                    <SelectField
                        label="Gender"
                        name="gender"
                        value={formData.gender || ''}
                        onChange={handleInputChange}
                        options={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' }
                        ]}
                        required
                    />
                    <InputField label="Coverage Amount (SZL)" name="coverageAmount" type="number" value={formData.coverageAmount || ''} onChange={handleInputChange} required />
                    <SelectField
                        label="Coverage Type"
                        name="coverageType"
                        value={formData.coverageType || 'individual'}
                        onChange={handleInputChange}
                        options={[
                            { value: 'individual', label: 'Individual' },
                            { value: 'family', label: 'Family' },
                            { value: 'group', label: 'Group' }
                        ]}
                        required
                    />
                    <InputField label="Number of Dependents" name="dependents" type="number" value={formData.dependents || ''} onChange={handleInputChange} />
                </div>
            );
            break;

        // UGI Products - Motor Insurance
        case 'motor':
            productFields = (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
                    <SelectField
                        label="Vehicle Type"
                        name="vehicleType"
                        value={formData.vehicleType || 'car'}
                        onChange={handleInputChange}
                        options={[
                            { value: 'car', label: 'Car' },
                            { value: 'suv', label: 'SUV' },
                            { value: 'truck', label: 'Truck' },
                            { value: 'motorcycle', label: 'Motorcycle' },
                            { value: 'bus', label: 'Bus' }
                        ]}
                        required
                    />
                    <InputField label="Vehicle Make" name="vehicleMake" value={formData.vehicleMake || ''} onChange={handleInputChange} required />
                    <InputField label="Vehicle Model" name="vehicleModel" value={formData.vehicleModel || ''} onChange={handleInputChange} required />
                    <InputField label="Year" name="vehicleYear" type="number" value={formData.vehicleYear || ''} onChange={handleInputChange} required />
                    <InputField label="Registration Number" name="registrationNumber" value={formData.registrationNumber || ''} onChange={handleInputChange} required />
                    <InputField label="Estimated Vehicle Value (SZL)" name="vehicleValue" type="number" value={formData.vehicleValue || ''} onChange={handleInputChange} required />
                </div>
            );
            break;

        // UGI Products - Home Insurance
        case 'home':
            productFields = (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
                    <InputField label="Property Address" name="propertyAddress" value={formData.propertyAddress || ''} onChange={handleInputChange} required className="md:col-span-2" />
                    <SelectField
                        label="Ownership Status"
                        name="ownershipStatus"
                        value={formData.ownershipStatus || 'owned'}
                        onChange={handleInputChange}
                        options={[
                            { value: 'owned', label: 'Owned' },
                            { value: 'mortgaged', label: 'Mortgaged' },
                            { value: 'rented', label: 'Rented' }
                        ]}
                        required
                    />
                    <InputField label="Property Type" name="propertyType" value={formData.propertyType || ''} onChange={handleInputChange} required />
                    <InputField label="Estimated Property Value (SZL)" name="propertyValue" type="number" value={formData.propertyValue || ''} onChange={handleInputChange} required />
                    <SelectField
                        label="Coverage Type"
                        name="coverageType"
                        value={formData.coverageType || 'both'}
                        onChange={handleInputChange}
                        options={[
                            { value: 'building', label: 'Building Only' },
                            { value: 'contents', label: 'Contents Only' },
                            { value: 'both', label: 'Both' }
                        ]}
                        required
                    />
                </div>
            );
            break;

        // UGI Products - Legal Insurance
        case 'legal':
            productFields = (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
                    <SelectField
                        label="Legal Matter Type"
                        name="legalMatter"
                        value={formData.legalMatter || ''}
                        onChange={handleInputChange}
                        options={[
                            { value: 'civil', label: 'Civil Matter' },
                            { value: 'criminal', label: 'Criminal Matter' },
                            { value: 'labor', label: 'Labor Dispute' },
                            { value: 'family', label: 'Family Law' },
                            { value: 'contract', label: 'Contract Dispute' }
                        ]}
                        required
                    />
                    <InputField label="Estimated Legal Costs (SZL)" name="estimatedCosts" type="number" value={formData.estimatedCosts || ''} onChange={handleInputChange} required />
                    <SelectField
                        label="Urgency Level"
                        name="urgency"
                        value={formData.urgency || 'medium'}
                        onChange={handleInputChange}
                        options={[
                            { value: 'low', label: 'Low' },
                            { value: 'medium', label: 'Medium' },
                            { value: 'high', label: 'High' },
                            { value: 'urgent', label: 'Urgent' }
                        ]}
                        required
                    />
                    <InputField label="Case Description" name="caseDescription" value={formData.caseDescription || ''} onChange={handleInputChange} className="md:col-span-2" />
                </div>
            );
            break;

        // UGI Products - Personal Accident
        case 'personal-accident':
            productFields = (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
                    <InputField label="Date of Birth" name="dob" type="date" value={formData.dob || ''} onChange={handleInputChange} required />
                    <SelectField
                        label="Occupation"
                        name="occupation"
                        value={formData.occupation || ''}
                        onChange={handleInputChange}
                        options={[
                            { value: 'professional', label: 'Professional' },
                            { value: 'manual', label: 'Manual Labor' },
                            { value: 'office', label: 'Office Work' },
                            { value: 'self-employed', label: 'Self-Employed' },
                            { value: 'other', label: 'Other' }
                        ]}
                        required
                    />
                    <InputField label="Coverage Amount (SZL)" name="coverageAmount" type="number" value={formData.coverageAmount || ''} onChange={handleInputChange} required />
                    <SelectField
                        label="Coverage Type"
                        name="coverageType"
                        value={formData.coverageType || 'individual'}
                        onChange={handleInputChange}
                        options={[
                            { value: 'individual', label: 'Individual' },
                            { value: 'family', label: 'Family' }
                        ]}
                        required
                    />
                </div>
            );
            break;

        // UGI Products - Business Insurance
        case 'business':
            productFields = (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
                    <InputField label="Business Name" name="businessName" value={formData.businessName || ''} onChange={handleInputChange} required />
                    <InputField label="Business Registration Number" name="registrationNumber" value={formData.registrationNumber || ''} onChange={handleInputChange} required />
                    <SelectField
                        label="Business Type"
                        name="businessType"
                        value={formData.businessType || 'retail'}
                        onChange={handleInputChange}
                        options={[
                            { value: 'retail', label: 'Retail' },
                            { value: 'services', label: 'Services' },
                            { value: 'manufacturing', label: 'Manufacturing' },
                            { value: 'construction', label: 'Construction' },
                            { value: 'professional', label: 'Professional Services' },
                            { value: 'other', label: 'Other' }
                        ]}
                        required
                    />
                    <InputField label="Number of Employees" name="employeeCount" type="number" value={formData.employeeCount || ''} onChange={handleInputChange} required />
                    <InputField label="Annual Revenue (SZL)" name="annualRevenue" type="number" value={formData.annualRevenue || ''} onChange={handleInputChange} required />
                    <InputField label="Business Address" name="businessAddress" value={formData.businessAddress || ''} onChange={handleInputChange} className="md:col-span-2" />
                </div>
            );
            break;

        // UP Products - Loans
        case 'loan':
            productFields = (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
                    <InputField label="Desired Loan Amount (SZL)" name="loanAmount" type="number" value={formData.loanAmount || ''} onChange={handleInputChange} required />
                    <SelectField
                        label="Loan Purpose"
                        name="loanPurpose"
                        value={formData.loanPurpose || ''}
                        onChange={handleInputChange}
                        options={[
                            { value: 'emergency', label: 'Emergency' },
                            { value: 'education', label: 'Education' },
                            { value: 'medical', label: 'Medical' },
                            { value: 'business', label: 'Business' },
                            { value: 'home', label: 'Home Improvement' },
                            { value: 'vehicle', label: 'Vehicle' },
                            { value: 'other', label: 'Other' }
                        ]}
                        required
                    />
                    <SelectField
                        label="Employment Status"
                        name="employmentStatus"
                        value={formData.employmentStatus || ''}
                        onChange={handleInputChange}
                        options={[
                            { value: 'employed', label: 'Employed' },
                            { value: 'self-employed', label: 'Self-Employed' },
                            { value: 'government', label: 'Government Employee' },
                            { value: 'unemployed', label: 'Unemployed' }
                        ]}
                        required
                    />
                    <InputField label="Monthly Income (SZL)" name="monthlyIncome" type="number" value={formData.monthlyIncome || ''} onChange={handleInputChange} required />
                    <InputField label="Employer Name" name="employerName" value={formData.employerName || ''} onChange={handleInputChange} />
                    {productName.includes('umlamleli') && (
                        <InputField label="Government Department" name="governmentDept" value={formData.governmentDept || ''} onChange={handleInputChange} required />
                    )}
                </div>
            );
            break;

        default:
            productFields = (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
                    <InputField label="Coverage Amount (SZL)" name="coverageAmount" type="number" value={formData.coverageAmount || ''} onChange={handleInputChange} required />
                    <SelectField
                        label="Coverage Type"
                        name="coverageType"
                        value={formData.coverageType || 'standard'}
                        onChange={handleInputChange}
                        options={[
                            { value: 'standard', label: 'Standard' },
                            { value: 'premium', label: 'Premium' },
                            { value: 'comprehensive', label: 'Comprehensive' }
                        ]}
                        required
                    />
                    <InputField label="Additional Information" name="additionalInfo" value={formData.additionalInfo || ''} onChange={handleInputChange} className="md:col-span-2" />
                </div>
            );
    }

    return (
        <div className='gap-6 flex flex-col w-full'>
            {/* General Information Section */}
            <div className='flex w-full justify-center items-center gap-4'>
                <p className='font-semibold text-[#9b1c20] whitespace-nowrap '>General Information</p>
                <div className='h-[0.5px] w-full bg-gray-200 mt-1' />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                <InputField label="Name" name="name" value={formData.name || ''} onChange={handleInputChange} required />
                <InputField label="Surname" name="surname" value={formData.surname || ''} onChange={handleInputChange} required />
                <InputField label="ID/Passport Number" name="idPassport" value={formData.idPassport || ''} onChange={handleInputChange} required />
                <InputField label="Email" name="email" type="email" value={formData.email || ''} onChange={handleInputChange} required />
                <InputField label="Phone Number" name="phone" type="tel" value={formData.phone || ''} onChange={handleInputChange} required />
                <InputField label="Physical Address" name="address" value={formData.address || ''} onChange={handleInputChange} required />
            </div>

            {/* Product-Specific Information Section */}
            <div className='flex w-full justify-center items-center gap-4'>
                <p className='font-semibold text-[#9b1c20] whitespace-nowrap '>{product.name} Information</p>
                <div className='h-[0.5px] w-full bg-gray-200 mt-1' />
            </div>
            {productFields}
        </div>
    );
}