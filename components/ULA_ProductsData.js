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

const UnitedLifeAssuranceData = [
  {
    name: 'Family Funeral Plan',
    tagline: 'Secure Your Loved Ones\' Farewell',
    heroImage: '/family-funeral.jpg',
    overview:
      'United Life Assurance (ULA) Family Funeral Plan provides comprehensive funeral cover for your entire family with quick claims processing and flexible payment terms. This life assurance product ensures your loved ones are protected during difficult times, offering up to E50,000 coverage with additional benefits like casket discounts. Backed by ULA\'s commitment to Eswatini families, this plan delivers peace of mind and financial security when it matters most.',
    stats: ['From E50/month', 'Up to E50,000 coverage', 'Family-wide protection'],
    benefits: [
      { text: 'Covers entire family under one plan', icon: PiUsersThree },
      { text: 'Quick claims turnaround time', icon: PiCheckCircle },
      { text: 'Flexible premium payment options', icon: PiCurrencyCircleDollar },
      { text: 'Up to E50,000 coverage', icon: PiShieldCheck },
      { text: '5% discount on caskets via Dups', icon: PiHandCoins },
    ],
    coverage: [
      { title: 'Family Coverage', content: 'Comprehensive protection for all family members under one policy.' },
      { title: 'Financial Support', content: 'Up to E50,000 payout to cover funeral expenses.' },
      { title: 'Additional Benefits', content: 'Casket discounts and flexible payment options.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult policy terms for details.' },
      { title: 'Pre-existing Conditions', content: 'Certain pre-existing conditions may have waiting periods.' },
    ],
    eligibility: ['Eswatini resident', 'Age 18-65 for main member', 'Valid ID and family details required'],
    howToApply: [
      'Contact a ULA branch or request a quote online',
      'Submit valid ID and family member details',
      'Receive approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money', 'Annual/Bi-annual'],
    faqs: [
      { title: 'How many family members can be covered?', content: 'The plan covers immediate family members as specified in the policy.' },
      { title: 'What is the claims processing time?', content: 'Claims are processed quickly, typically within the timeframe specified in your policy.' },
    ],
    related: [
      { name: 'Individual Funeral Plan', image: '/images/individual-funeral.jpg', link: '/products/individual-funeral-plan' },
      { name: 'Tinkhundla Funeral Cover', image: '/images/tinkhundla-funeral.jpg', link: '/products/tinkhundla-funeral-cover' },
    ],
    trust: 'Trusted family protection for Eswatini households.',
  },
  {
    name: 'Individual Funeral Plan',
    tagline: 'Peace of Mind for Your Final Journey',
    heroImage: '/individual-funeral.jpg',
    overview:
      'United Life Assurance (ULA) Individual Funeral Plan offers personalized funeral coverage with fast payouts and premium flexibility. Designed for Eswatini residents seeking personal protection, this life assurance product provides tailored coverage up to E25,000 with rapid claims processing. With options for annual, bi-annual, or monthly payments and additional benefits like free storage, ULA ensures your final journey is handled with dignity and care.',
    stats: ['From E30/month', 'Up to E25,000 coverage', 'Flexible payment options'],
    benefits: [
      { text: 'Tailored coverage up to E25,000', icon: PiUser },
      { text: 'Rapid claims processing', icon: PiCheckCircle },
      { text: 'Annual, bi-annual, or monthly payments', icon: PiCurrencyCircleDollar },
      { text: '14 days free storage with Dups', icon: PiHouse },
      { text: '100% Swati-owned reliability', icon: PiShieldCheck },
    ],
    coverage: [
      { title: 'Personal Coverage', content: 'Tailored funeral coverage up to E25,000 for individuals.' },
      { title: 'Storage Benefits', content: '14 days free storage facility access.' },
      { title: 'Payment Flexibility', content: 'Multiple payment frequency options available.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult policy terms for details.' },
      { title: 'Suicide Clause', content: 'Standard suicide clause applies as per policy terms.' },
    ],
    eligibility: ['Eswatini resident', 'Age 18-65', 'Valid ID required'],
    howToApply: [
      'Contact a ULA branch or request a quote online',
      'Submit valid ID and personal details',
      'Receive approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money', 'Annual/Bi-annual'],
    faqs: [
      { title: 'What payment frequencies are available?', content: 'Monthly, bi-annual, and annual payment options are available.' },
      { title: 'Is the free storage included?', content: 'Yes, 14 days free storage with Dups is included in the plan.' },
    ],
    related: [
      { name: 'Family Funeral Plan', image: '/images/family-funeral.jpg', link: '/products/family-funeral-plan' },
      { name: 'Group Life', image: '/images/group-life.jpg', link: '/products/group-life' },
    ],
    trust: 'Personalized funeral protection for Eswatini residents.',
  },
  {
    name: 'Tinkhundla Funeral Cover',
    tagline: 'Affordable Cover for All Communities',
    heroImage: '/tinkhundla-funeral.jpg',
    overview:
      'United Life Assurance (ULA) Tinkhundla Funeral Cover provides affordable funeral protection for communities across Eswatini at just E11 per month. This community-focused life assurance product offers E5,000 coverage with quick claims processing and philanthropic support. Designed specifically for Tinkhundla residents, this plan demonstrates ULA\'s commitment to making funeral coverage accessible to all Eswatini communities.',
    stats: ['E11/month', 'E5,000 coverage', 'Community-focused'],
    benefits: [
      { text: 'E5,000 cover for E11/month', icon: PiCurrencyCircleDollar },
      { text: 'Open to all Tinkhundla residents', icon: PiMapPin },
      { text: 'Quick claims with E5.9M donation support', icon: PiHandCoins },
      { text: 'Community-focused philanthropy', icon: PiHeart },
      { text: 'Simple registration process', icon: PiFileText },
    ],
    coverage: [
      { title: 'Basic Coverage', content: 'E5,000 funeral coverage at an affordable monthly premium.' },
      { title: 'Community Support', content: 'Backed by community donation support for claims.' },
      { title: 'Philanthropic Focus', content: 'Community-oriented approach to funeral coverage.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult policy terms for details.' },
      { title: 'Geographical Limits', content: 'Available only to registered Tinkhundla residents.' },
    ],
    eligibility: ['Eswatini resident', 'Registered Tinkhundla member', 'Valid ID required'],
    howToApply: [
      'Contact a ULA branch or Tinkhundla office',
      'Submit valid ID and Tinkhundla registration',
      'Receive approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'Who is eligible for this cover?', content: 'Registered Tinkhundla residents across Eswatini.' },
      { title: 'What is the coverage amount?', content: 'E5,000 funeral coverage for E11 per month.' },
    ],
    related: [
      { name: 'Family Funeral Plan', image: '/images/family-funeral.jpg', link: '/products/family-funeral-plan' },
      { name: 'Individual Funeral Plan', image: '/images/individual-funeral.jpg', link: '/products/individual-funeral-plan' },
    ],
    trust: 'Affordable community protection for Eswatini residents.',
  },
  {
    name: 'Group Life',
    tagline: 'Protect Your Team\'s Future',
    heroImage: '/group-life.jpg',
    overview:
      'United Life Assurance (ULA) Group Life provides comprehensive life coverage for employee groups with employer-backed benefits and quick payouts. This corporate life assurance product offers death and disability benefits for teams of all sizes, with flexible group options and fast claim settlements. Designed for Eswatini businesses, ULA Group Life ensures your employees are protected, contributing to workplace security and peace of mind.',
    stats: ['From E40/month per member', 'Group coverage', 'Employer-subsidized'],
    benefits: [
      { text: 'Covers employees under one policy', icon: PiUsers },
      { text: 'Death and disability benefits', icon: PiShieldCheck },
      { text: 'Employer-subsidized premiums', icon: PiBank },
      { text: 'Flexible group size options', icon: PiChartLineUp },
      { text: 'Fast claim settlements', icon: PiCheckCircle },
    ],
    coverage: [
      { title: 'Employee Protection', content: 'Life coverage for all employees under a single policy.' },
      { title: 'Death Benefits', content: 'Financial protection for families in case of employee death.' },
      { title: 'Disability Coverage', content: 'Support for employees in case of permanent disability.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult policy terms for details.' },
      { title: 'Employment Status', content: 'Coverage typically requires active employment status.' },
    ],
    eligibility: ['Eswatini resident', 'Employed in a registered group', 'Employer enrollment required'],
    howToApply: [
      'Employer contacts ULA for group enrollment',
      'Submit employee details and company registration',
      'Receive approval and arrange payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Corporate Payment'],
    faqs: [
      { title: 'What is the minimum group size?', content: 'Flexible options available for groups of various sizes.' },
      { title: 'Can employers subsidize premiums?', content: 'Yes, employers can choose to subsidize employee premiums.' },
    ],
    related: [
      { name: 'Credit Life', image: '/images/credit-life.jpg', link: '/products/credit-life' },
      { name: 'Family Funeral Plan', image: '/images/family-funeral.jpg', link: '/products/family-funeral-plan' },
    ],
    trust: 'Comprehensive group protection for Eswatini businesses.',
  },
  {
    name: 'Credit Life',
    tagline: 'Safeguard Your Loans and Family',
    heroImage: '/credit-life.jpg',
    overview:
      'United Life Assurance (ULA) Credit Life protects borrowers and their families by covering loan repayments in case of death or disability. This life assurance product provides peace of mind for Eswatini residents with mortgages, personal loans, or other financial obligations. With affordable premium rates and quick claim processing, ULA Credit Life ensures your loved ones are not burdened by outstanding debts during difficult times.',
    stats: ['From E25/month', 'Loan protection', 'Quick claims'],
    benefits: [
      { text: 'Pays off loans on death or disability', icon: PiBank },
      { text: 'Covers mortgages and personal loans', icon: PiHouse },
      { text: 'Affordable premium rates', icon: PiCurrencyCircleDollar },
      { text: 'Peace of mind for borrowers', icon: PiShieldCheck },
      { text: 'Quick claim processing', icon: PiCheckCircle },
    ],
    coverage: [
      { title: 'Loan Protection', content: 'Covers outstanding loan balances in case of death or disability.' },
      { title: 'Mortgage Coverage', content: 'Protection for home loans and mortgages.' },
      { title: 'Personal Loans', content: 'Coverage for various types of personal loans.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult policy terms for details.' },
      { title: 'Loan Type Limits', content: 'Certain loan types may have specific exclusions.' },
    ],
    eligibility: ['Eswatini resident', 'Active loan holder', 'Age 18-65'],
    howToApply: [
      'Contact ULA or your lending institution',
      'Submit loan details and personal information',
      'Receive approval and add to loan payments',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Added to Loan Payments'],
    faqs: [
      { title: 'What types of loans are covered?', content: 'Mortgages, personal loans, and various other loan types.' },
      { title: 'How are claims processed?', content: 'Claims are processed directly with the lending institution.' },
    ],
    related: [
      { name: 'Group Life', image: '/images/group-life.jpg', link: '/products/group-life' },
      { name: 'Individual Funeral Plan', image: '/images/individual-funeral.jpg', link: '/products/individual-funeral-plan' },
    ],
    trust: 'Reliable loan protection for Eswatini borrowers.',
  },
];

export default UnitedLifeAssuranceData;