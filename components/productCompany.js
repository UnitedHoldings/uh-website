// utils/productCompany.js
export const getProductCompany = (product) => {
  // Check if product has explicit company field (case insensitive)
  if (product.company) {
    const company = product.company.toUpperCase();
    if (['ULA', 'UGI', 'UP'].includes(company)) {
      return company;
    }
  }

  // Determine by product characteristics
  const productName = (product.name || '').toLowerCase();
  const productDescription = (product.description || '').toLowerCase();
  const productCategory = (product.category || '').toLowerCase();

  // Combine all searchable text
  const searchText = `${productName} ${productDescription} ${productCategory}`;

  // United Life Assurance products - more specific matching
  if (
    /\bfuneral\b/.test(searchText) ||
    /\blife\b/.test(searchText) ||
    /\bcredit life\b/.test(searchText) ||
    /\bgroup life\b/.test(searchText) ||
    /\bassurance\b/.test(searchText) ||
    /\bdeath\b/.test(searchText) ||
    /\bburial\b/.test(searchText) ||
    productCategory.includes('life') ||
    productCategory.includes('assurance')
  ) {
    return 'ULA';
  }

  // United Pay products - more specific matching
  if (
    /\bloan\b/.test(searchText) ||
    /\bmicro\b/.test(searchText) ||
    /\bsalary\b/.test(searchText) ||
    /\bumlamleli\b/.test(searchText) ||
    /\bpay\b/.test(searchText) ||
    /\bpayment\b/.test(searchText) ||
    /\blending\b/.test(searchText) ||
    /\bcredit\b/.test(searchText) ||
    productCategory.includes('loan') ||
    productCategory.includes('finance') ||
    productCategory.includes('payment')
  ) {
    return 'UP';
  }

  // United General Insurance products (default) - more specific matching
  if (
    /\binsurance\b/.test(searchText) ||
    /\bvehicle\b/.test(searchText) ||
    /\bcar\b/.test(searchText) ||
    /\bhome\b/.test(searchText) ||
    /\bproperty\b/.test(searchText) ||
    /\basset\b/.test(searchText) ||
    /\bcommercial\b/.test(searchText) ||
    /\bpersonal\b/.test(searchText) ||
    productCategory.includes('insurance') ||
    productCategory.includes('general') ||
    productCategory.includes('property')
  ) {
    return 'UGI';
  }

  // Default fallback
  return 'UGI';
};

export const getCompanyDetails = (companyCode) => {
  const companies = {
    'ULA': {
      name: 'United Life Assurance',
      fullName: 'United Life Assurance Company',
      description: 'Life insurance and assurance products',
      colors: {
        primary: '#3d834d',
        secondary: '#2d6340',
        light: '#ecf4ee',
        dark: '#1f4228',
        text: '#ffffff'
      }
    },
    'UGI': {
      name: 'United General Insurance',
      fullName: 'United General Insurance Company',
      description: 'General insurance and risk coverage',
      colors: {
        primary: '#286278',
        secondary: '#7a1619',
        light: '#f9e8e8',
        dark: '#5d0f12',
        text: '#ffffff'
      }
    },
    'UP': {
      name: 'United Pay',
      fullName: 'United Pay Financial Services',
      description: 'Payment solutions and lending services',
      colors: {
        primary: '#f79620',
        secondary: '#c6771a',
        light: '#fef4e8',
        dark: '#9e5f15',
        text: '#ffffff'
      }
    }
  };
  
  return companies[companyCode] || companies['UGI'];
};

export const getCompanyStyles = (companyCode) => {
  const company = getCompanyDetails(companyCode);
  return company.colors;
};