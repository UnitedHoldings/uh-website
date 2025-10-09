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

const UnitedPayData = [
  {
    name: 'Micro Loan',
    tagline: 'Quick Cash for Life\'s Unexpected Moments',
    heroImage: '/images/micro-loan.jpg',
    overview:
      'United Pay Micro Loan provides instant access to funds up to E50,000 for emergencies or personal needs, with flexible repayment through convenient salary deductions. Designed for employed Eswatini residents, this financial solution offers competitive rates and fast approval within 48 hours. Whether you need funds for medical expenses, education, or unexpected costs, United Pay ensures you get the financial support you need with repayment terms tailored to your income.',
    stats: ['From E100/month', 'Up to E50,000', '48-hour approval'],
    benefits: [
      { text: 'Fast 48-hour approval and payout', icon: PiClock },
      { text: 'Competitive rates, repay over 3-36 months', icon: PiCurrencyCircleDollar },
      { text: 'No hassle—deducted from your salary', icon: PiMoney },
      { text: 'Available to employed private/public sector workers', icon: PiUser },
      { text: 'Tailored amounts from E1,000 based on income', icon: PiChartLineUp },
    ],
    coverage: [
      { title: 'Loan Amounts', content: 'Flexible amounts from E1,000 to E50,000 based on your income and needs.' },
      { title: 'Quick Processing', content: 'Fast approval and payout within 48 hours of application.' },
      { title: 'Flexible Repayment', content: 'Convenient salary deduction with terms from 3 to 36 months.' },
    ],
    exclusions: [
      { title: 'Employment Status', content: 'Must be currently employed with verifiable income.' },
      { title: 'Credit Assessment', content: 'Subject to creditworthiness and affordability assessment.' },
    ],
    eligibility: ['Eswatini resident', 'Employed with salary', 'Valid ID and payslip required'],
    howToApply: [
      'Visit any United Pay branch or apply online',
      'Submit valid ID and recent payslips',
      'Complete credit assessment and receive approval',
      'Sign agreement and receive funds',
    ],
    paymentMethods: ['Salary Deduction', 'Bank Transfer'],
    faqs: [
      { title: 'How quickly can I get the loan?', content: 'Approval and payout typically within 48 hours of complete application.' },
      { title: 'What is the maximum loan amount?', content: 'Up to E50,000 depending on your income and credit assessment.' },
    ],
    related: [
      { name: 'Civil Servant Micro Loan', image: '/images/civil-servant-loan.jpg', link: '/products/civil-servant-micro-loan' },
    ],
    trust: 'Reliable financial solutions for Eswatini employees.',
  },
  {
    name: 'Umlamleli Loan',
    tagline: 'Secure Funding Tailored for Public Servants',
    heroImage: '/images/civil-servant-loan.jpg',
    overview:
      'United Pay Civil Servant Micro Loan offers specialized financial solutions for government employees in Eswatini, with loans up to E20,000 designed around the stability of public service employment. This product features easy terms, low rates, and seamless salary deduction integration, helping civil servants meet urgent financial needs while building credit. With quick processing and flexible repayment options, United Pay supports the financial well-being of Eswatini\'s dedicated public servants.',
    stats: ['From E200/month', 'Up to E20,000', 'Government employee focus'],
    benefits: [
      { text: 'Up to E20,000 limit for civil servants', icon: PiMoney },
      { text: 'Quick processing and salary-based repayments', icon: PiClock },
      { text: 'Flexible 3-36 month terms at low rates', icon: PiCurrencyCircleDollar },
      { text: 'Builds credit while meeting urgent needs', icon: PiTrendUp },
      { text: 'Seamless employer deduction integration', icon: PiBank },
    ],
    coverage: [
      { title: 'Government Employee Focus', content: 'Specialized loans designed specifically for civil servants.' },
      { title: 'Higher Limits', content: 'Access to loans up to E20,000 with favorable terms.' },
      { title: 'Credit Building', content: 'Opportunity to build and improve credit history.' },
    ],
    exclusions: [
      { title: 'Employment Verification', content: 'Must be verified government employee.' },
      { title: 'Service Requirements', content: 'Must meet minimum service period requirements.' },
    ],
    eligibility: ['Eswatini resident', 'Government employee', 'Valid ID and employment letter'],
    howToApply: [
      'Visit United Pay branch with employment documents',
      'Submit ID and government employment letter',
      'Complete application and credit assessment',
      'Receive approval and access funds',
    ],
    paymentMethods: ['Salary Deduction', 'Government Payroll'],
    faqs: [
      { title: 'Is this only for government employees?', content: 'Yes, this product is specifically designed for civil servants.' },
      { title: 'What documents are required?', content: 'Valid ID and government employment verification letter.' },
    ],
    related: [
      { name: 'Micro Loan', image: '/images/micro-loan.jpg', link: '/products/micro-loan' },
    ],
    trust: 'Trusted financial partner for Eswatini civil servants.',
  },
];

export default UnitedPayData;