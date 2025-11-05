// UnitedPayData.js
// Centralized data for all United Pay (UP) products

import {
  PiMoney,
  PiUser,
  PiCurrencyCircleDollar,
  PiShieldCheck,
  PiCheckCircle,
  PiMapPin,
  PiClock,
  PiChartLineUp,
  PiBank,
  PiFileText,
  PiIdentificationCard,
  PiTrendUp,
} from 'react-icons/pi';

// Icon mapping object to convert string icons to actual components
const iconMap = {
  PiMoney,
  PiUser,
  PiCurrencyCircleDollar,
  PiShieldCheck,
  PiCheckCircle,
  PiMapPin,
  PiClock,
  PiChartLineUp,
  PiBank,
  PiFileText,
  PiIdentificationCard,
  PiTrendUp,
};

// Function to fetch data from API
const fetchUnitedPayData = async () => {
  try {
    const response = await fetch('https://website.api.united.co.sz/api/products?type=upProducts');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }
    
    // Transform API data to match our local structure
    const transformedData = data.data.map(product => {
      // Map benefits with icons
      const benefits = product.benefits?.map(benefit => ({
        text: benefit.text,
        icon: iconMap[benefit.icon] || PiMoney // Fallback to PiMoney if icon not found
      })) || [];
      
      // Map coverage
      const coverage = product.coverage?.map(item => ({
        title: item.title,
        content: item.content
      })) || [];
      
      // Map exclusions
      const exclusions = product.exclusions?.map(item => ({
        title: item.title,
        content: item.content
      })) || [];
      
      // Map FAQs
      const faqs = product.faqs?.map(faq => ({
        title: faq.title,
        content: faq.content
      })) || [];
      
      // Map related products and add images
      const related = product.related?.map(relatedItem => {
        // Determine image based on product name
        let image = '/images/default-product.jpg';
        if (relatedItem.name === 'Micro Loan') {
          image = '/images/micro-loan.jpg';
        } else if (relatedItem.name === 'Civil Servant Micro Loan') {
          image = '/images/civil-servant-loan.jpg';
        }
        
        return {
          name: relatedItem.name,
          image: image,
          link: relatedItem.link
        };
      }) || [];
      
      // Determine hero image based on product name
      let heroImage = '/default-hero.jpg';
      if (product.name === 'Micro Loan') {
        heroImage = '/micro-loan.jpg';
      } else if (product.name === 'Umlamleli Loan') {
        heroImage = '/civil-servant-loan.jpg';
      }
      
      return {
        name: product.name,
        tagline: product.tagline,
        heroImage: heroImage,
        overview: product.overview,
        stats: product.stats || [],
        benefits: benefits,
        coverage: coverage,
        exclusions: exclusions,
        eligibility: product.eligibility || [],
        howToApply: product.howToApply || [],
        paymentMethods: product.paymentMethods || [],
        faqs: faqs,
        related: related,
        trust: product.trust || 'Reliable financial solutions for Eswatini residents.',
      };
    });
    
    return transformedData;
    
  } catch (error) {
    console.error('Error fetching United Pay data:', error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export { fetchUnitedPayData };