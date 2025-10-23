// UnitedLifeAssuranceData.js
// Centralized data for all United Life Assurance (ULA) products

import {
  PiHeart,
  PiUsers,
  PiCurrencyCircleDollar,
  PiShieldCheck,
  PiCheckCircle,
  PiHouse,
  PiMapPin,
  PiPhone,
  PiHandCoins,
  PiBank,
  PiChartLineUp,
  PiFileText,
  PiUser,
  PiUsersThree,
  PiHandshake,
} from 'react-icons/pi';

// Icon mapping object to convert string icons to actual components
const iconMap = {
  PiHeart,
  PiUsers,
  PiCurrencyCircleDollar,
  PiShieldCheck,
  PiCheckCircle,
  PiHouse,
  PiMapPin,
  PiPhone,
  PiHandCoins,
  PiBank,
  PiChartLineUp,
  PiFileText,
  PiUser,
  PiUsersThree,
  PiHandshake,
};

// Function to fetch data from API
const fetchUnitedLifeAssuranceData = async () => {
  try {
    const response = await fetch('https://uh-server.onrender.com/api/products?type=ulaProducts');
    
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
        icon: iconMap[benefit.icon] || PiHeart // Fallback to PiHeart if icon not found
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
        if (relatedItem.name === 'Individual Funeral Plan') {
          image = '/images/individual-funeral.jpg';
        } else if (relatedItem.name === 'Family Funeral Plan') {
          image = '/images/family-funeral.jpg';
        } else if (relatedItem.name === 'Tinkhundla Funeral Cover') {
          image = '/images/tinkhundla-funeral.jpg';
        } else if (relatedItem.name === 'Group Life') {
          image = '/images/group-life.jpg';
        } else if (relatedItem.name === 'Credit Life') {
          image = '/images/credit-life.jpg';
        }
        
        return {
          name: relatedItem.name,
          image: image,
          link: relatedItem.link
        };
      }) || [];
      
      // FIX: Properly extract hero image URL from the nested Sanity.io structure
      let heroImage = '/images/default-hero.jpg';
      if (product.heroImage && product.heroImage.asset && product.heroImage.asset.url) {
        heroImage = product.heroImage.asset.url;
      }
      
      return {
        name: product.name,
        tagline: product.tagline,
        heroImage: heroImage, // Now this will be the actual URL string like "https://cdn.sanity.io/images/..."
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
        trust: product.trust || 'Trusted life assurance for Eswatini families.',
      };
    });
    
    return transformedData;
    
  } catch (error) {
    console.error('Error fetching United Life Assurance data:', error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export { fetchUnitedLifeAssuranceData };