// UnitedGeneralInsuranceData.js
// Centralized data for all United General Insurance (UGI) products

import {
  PiGavel,
  PiScales,
  PiPhone,
  PiCurrencyCircleDollar,
  PiHandCoins,
  PiCar,
  PiShieldCheck,
  PiUsers,
  PiWrench,
  PiFirstAidKit,
  PiBriefcase,
  PiHeart,
  PiHouse,
  PiLightning,
  PiTruck,
  PiTag,
  PiCheckCircle,
  PiFire,
  PiStethoscope,
  PiMapPin,
  PiWarning,
  PiCalculator,
  PiBank,
  PiHandshake,
  PiGear,
  PiLock,
  PiShieldWarning,
  PiBuildings,
  PiFileText,
  PiGlobe,
} from 'react-icons/pi';

// Icon mapping object to convert string icons to actual components
const iconMap = {
  PiGavel,
  PiScales,
  PiPhone,
  PiCurrencyCircleDollar,
  PiHandCoins,
  PiCar,
  PiShieldCheck,
  PiUsers,
  PiWrench,
  PiFirstAidKit,
  PiBriefcase,
  PiHeart,
  PiHouse,
  PiLightning,
  PiTruck,
  PiTag,
  PiCheckCircle,
  PiFire,
  PiStethoscope,
  PiMapPin,
  PiWarning,
  PiCalculator,
  PiBank,
  PiHandshake,
  PiGear,
  PiLock,
  PiShieldWarning,
  PiBuildings,
  PiFileText,
  PiGlobe,
};

// Function to fetch data from API
const fetchUnitedGeneralInsuranceData = async () => {
  try {
    const response = await fetch('https://website.api.united.co.sz/api/products?type=ugiProducts');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }
    
    // Transform API data to match our local structure
    const transformedData = data.data.map(product => {
      // Extract heroImage URL from the asset structure
      const heroImage = product.heroImage?.asset?.url || '/images/default-hero.jpg';
      
      // Map benefits with icons
      const benefits = product.benefits?.map(benefit => ({
        text: benefit.text,
        icon: iconMap[benefit.icon] || PiShieldCheck // Fallback to PiShieldCheck if icon not found
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
      
      // Map related products and extract image URLs
      const related = product.related?.map(relatedItem => {
        // Extract image from related item if available, otherwise use fallback
        let image = '/images/default-product.jpg';
        
        if (relatedItem.heroImage?.asset?.url) {
          image = relatedItem.heroImage.asset.url;
        } else {
          // Fallback to conditional images based on product name
          if (relatedItem.name === 'Personal Accident Insurance') {
            image = '/personal-accident.jpg';
          } else if (relatedItem.name === 'Home Contents Insurance') {
            image = '/home-contents.jpg';
          } else if (relatedItem.name === 'Legal Insurance') {
            image = '/legal-insurance.jpg';
          } else if (relatedItem.name === 'Motor Insurance') {
            image = '/car.jpg';
          }
        }
        
        return {
          name: relatedItem.name,
          image: image,
          link: relatedItem.link
        };
      }) || [];
      
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
        trust: product.trust || 'Reliable insurance protection for Eswatini residents.',
      };
    });
     
    return transformedData;
    
  } catch (error) {
    console.error('Error fetching United General Insurance data:', error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export { fetchUnitedGeneralInsuranceData };