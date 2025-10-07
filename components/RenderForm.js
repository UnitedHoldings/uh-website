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
    const type = product.name.toLowerCase();
    let productFields = null;
    if (type.includes('life-insurance') || type.includes('life')) {
        productFields = (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
                <InputField label="Date of Birth" name="lifeDob" type="date" value={formData.lifeDob || ''} onChange={handleInputChange} required />
                <SelectField
                    label="Gender"
                    name="lifeGender"
                    value={formData.lifeGender || ''}
                    onChange={handleInputChange}
                    options={[
                        { value: '', label: 'Select Gender' },
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' }
                    ]}
                    required
                />
                <InputField label="Coverage Amount (SZL)" name="lifeCoverageAmount" type="number" value={formData.lifeCoverageAmount || ''} onChange={handleInputChange} required />
            </div>
        );
    } else if (type.includes('health')) {
        productFields = (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
                <InputField label="Date of Birth" name="healthDob" type="date" value={formData.healthDob || ''} onChange={handleInputChange} required />
                <SelectField
                    label="Gender"
                    name="healthGender"
                    value={formData.healthGender || ''}
                    onChange={handleInputChange}
                    options={[
                        { value: '', label: 'Select Gender' },
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' }
                    ]}
                    required
                />
                <SelectField
                    label="Coverage Type"
                    name="healthCoverageType"
                    value={formData.healthCoverageType || 'individual'}
                    onChange={handleInputChange}
                    options={[
                        { value: 'individual', label: 'Individual' },
                        { value: 'family', label: 'Family' }
                    ]}
                    required
                />
            </div>
        );
    } else if (type.includes('motor') || type.includes('car')) {
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
                        { value: 'motorcycle', label: 'Motorcycle' }
                    ]}
                    required
                />
                <InputField label="Vehicle Make" name="vehicleMake" value={formData.vehicleMake || ''} onChange={handleInputChange} required />
                <InputField label="Year" name="vehicleYear" type="number" value={formData.vehicleYear || ''} onChange={handleInputChange} required />
                <InputField label="Estimated Vehicle Value (SZL)" name="vehicleValue" type="number" value={formData.vehicleValue || ''} onChange={handleInputChange} required />
            </div>
        );
    } else if (type.includes('home')) {
        productFields = (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
                <InputField label="Property Address" name="homeAddress" value={formData.homeAddress || ''} onChange={handleInputChange} required className="md:col-span-2" />
                <SelectField
                    label="Ownership Status"
                    name="homeOwnership"
                    value={formData.homeOwnership || 'owned'}
                    onChange={handleInputChange}
                    options={[
                        { value: 'owned', label: 'Owned' },
                        { value: 'mortgaged', label: 'Mortgaged' },
                        { value: 'rented', label: 'Rented' }
                    ]}
                    required
                />
                <InputField label="Estimated Property Value (SZL)" name="homePropertyValue" type="number" value={formData.homePropertyValue || ''} onChange={handleInputChange} required />
                <SelectField
                    label="Coverage Type"
                    name="homeCoverageType"
                    value={formData.homeCoverageType || 'both'}
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
    } else if (type.includes('business')) {
        productFields = (
            <div>
                <InputField label="Business Name" name="businessName" value={formData.businessName || ''} onChange={handleInputChange} required />
                <InputField label="Owner's Name" name="businessOwner" value={formData.businessOwner || ''} onChange={handleInputChange} required />
                <SelectField
                    label="Business Type"
                    name="businessType"
                    value={formData.businessType || 'retail'}
                    onChange={handleInputChange}
                    options={[
                        { value: 'retail', label: 'Retail' },
                        { value: 'services', label: 'Services' },
                        { value: 'manufacturing', label: 'Manufacturing' },
                        { value: 'other', label: 'Other' }
                    ]}
                    required
                />
                <InputField label="Estimated Annual Revenue (SZL)" name="businessRevenue" type="number" value={formData.businessRevenue || ''} onChange={handleInputChange} required />
            </div>
        );
    }

    return (
        <div className='gap-6 flex flex-col w-full'>
             <div className='flex w-full justify-center items-center gap-4'>
                <p className='font-semibold text-[#9b1c20] whitespace-nowrap '>General Information</p>
                <div className='h-[0.5px] w-full bg-gray-200 mt-1' />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                <InputField label="Name" name="name" value={formData.name || ''} onChange={handleInputChange} required />
                <InputField label="Surname" name="surname" value={formData.surname || ''} onChange={handleInputChange} required />
                <InputField label="ID/Passport" name="idPassport" value={formData.idPassport || ''} onChange={handleInputChange} required />
                <InputField label="Email" name="email" type="email" value={formData.email || ''} onChange={handleInputChange} required />
                <InputField label="Phone Number" name="phone" type="tel" value={formData.phone || ''} onChange={handleInputChange} required />
            </div>
            <div className='flex w-full justify-center items-center gap-4'>
                <p className='font-semibold text-[#9b1c20] whitespace-nowrap '>{product.name} Information</p>
                <div className='h-[0.5px] w-full bg-gray-200 mt-1' />
            </div>
            {productFields}

        </div>

    );
}
