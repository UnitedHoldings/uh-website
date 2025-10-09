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
  PiFirstAidKit, // Replaced PiBandage
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
} from 'react-icons/pi';

const UnitedGeneralInsuranceData = [
  {
    name: 'Legal Insurance',
    tagline: 'Shield Your Family from Legal Battles',
    heroImage: '/images/legal-insurance.jpg',
    overview:
      'United General Insurance (UGI) Legal Insurance provides expert legal assistance to protect you and your loved ones from the financial burden of disputes and accidents. This short-term insurance product offers comprehensive coverage for civil, criminal, and labor matters, ensuring access to legal counseling and representation. With benefits like accidental death legal expense payouts and extended services such as debt counseling, our policy is designed to deliver peace of mind. Backed by UGI\'s commitment to Eswatini residents, this product ensures reliable support through a wide branch network and efficient claims processing.',
    stats: ['From E50/month', 'Eswatini-focused coverage', 'Wide branch network'],
    benefits: [
      { text: 'Legal counseling and representation', icon: PiGavel },
      { text: 'Coverage for civil, criminal, and labor matters', icon: PiScales },
      { text: 'Face-to-face or telephonic advice', icon: PiPhone },
      { text: 'Accidental death legal expenses cash benefit', icon: PiCurrencyCircleDollar },
      { text: 'Extended services like debt counseling', icon: PiHandCoins },
    ],
    coverage: [
      { title: 'Legal Disputes', content: 'Support for civil, criminal, and labor-related legal matters.' },
      { title: 'Accidental Death', content: 'Cash benefit for legal expenses related to accidental death.' },
      { title: 'Debt Counseling', content: 'Access to professional debt counseling services.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult policy terms for details.' },
    ],
    eligibility: ['Eswatini resident', 'Age 18+', 'Valid ID required'],
    howToApply: [
      'Contact a UGI branch or request a quote online',
      'Submit valid ID and required documents',
      'Receive approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'What types of legal matters are covered?', content: 'Civil, criminal, and labor disputes are included.' },
      { title: 'Is debt counseling included?', content: 'Yes, extended services include debt counseling.' },
    ],
    related: [
      { name: 'Personal Accident Insurance', image: '/images/personal-accident.jpg', link: '/products/personal-accident-insurance' },
      { name: 'Home Contents Insurance', image: '/images/home-contents.jpg', link: '/products/home-contents-insurance' },
    ],
    trust: 'Reliable legal protection for Eswatini residents.',
  },
  {
    name: 'Motor Insurance',
    tagline: 'Drive with Total Confidence',
    heroImage: '/images/motor-insurance.jpg',
    overview:
      'United General Insurance (UGI) Motor Insurance offers customizable coverage to protect your vehicle against accidents, theft, natural disasters, and more. Whether you choose comprehensive or third-party options, our policy ensures peace of mind on the road. With optional add-ons like towing and coverage for modifications, plus protection against hijacking and third-party liability, UGI delivers tailored solutions for Eswatini drivers. Our efficient claims process and local expertise make us a trusted choice for vehicle owners.',
    stats: ['From E200/month', 'Eswatini-focused coverage', 'Wide branch network'],
    benefits: [
      { text: 'Comprehensive or third-party options', icon: PiCar },
      { text: 'Protection from natural causes and hijacking', icon: PiShieldCheck },
      { text: 'Third-party liability coverage', icon: PiUsers },
      { text: 'Optional add-ons like towing and modifications', icon: PiWrench },
    ],
    coverage: [
      { title: 'Vehicle Protection', content: 'Covers accidents, theft, and natural disasters.' },
      { title: 'Third-Party Liability', content: 'Protection against damage to third-party property or persons.' },
      { title: 'Add-Ons', content: 'Optional towing and modification coverage.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult policy terms for details.' },
    ],
    eligibility: ['Eswatini resident', 'Vehicle ownership', 'Valid driver\'s license'],
    howToApply: [
      'Contact a UGI branch or request a quote online',
      'Submit vehicle ownership and driver\'s license documents',
      'Receive approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'What does comprehensive coverage include?', content: 'Covers accidents, theft, natural disasters, and more.' },
      { title: 'Can I add towing services?', content: 'Yes, towing is an optional add-on.' },
    ],
    related: [
      { name: 'Home Contents Insurance', image: '/images/home-contents.jpg', link: '/products/home-contents-insurance' },
      { name: 'Personal Accident Insurance', image: '/images/personal-accident.jpg', link: '/products/personal-accident-insurance' },
    ],
    trust: 'Trusted vehicle protection for Eswatini drivers.',
  },
  {
    name: 'Personal Accident Insurance',
    tagline: 'Secure Your Future Against the Unexpected',
    heroImage: '/images/personal-accident.jpg',
    overview:
      'United General Insurance (UGI) Personal Accident Insurance provides lump-sum payouts for injuries, disabilities, or death caused by accidents. This short-term insurance product ensures financial security by covering loss of limbs, sight, hearing, or speech, and protects against income loss. With beneficiary payouts for family support, UGI offers affordable protection tailored to Eswatini residents, backed by a wide branch network and efficient claims processing.',
    stats: ['From E30/month', 'Eswatini-focused coverage', 'Wide branch network'],
    benefits: [
      { text: 'Cash benefits for accidental death or disability', icon: PiCurrencyCircleDollar },
      { text: 'Coverage for loss of limbs, sight, hearing, or speech', icon: PiFirstAidKit }, // Replaced PiBandage
      { text: 'Protects against income loss', icon: PiBriefcase },
      { text: 'Beneficiary payout for family security', icon: PiHeart },
    ],
    coverage: [
      { title: 'Accidental Death', content: 'Lump-sum payout for accidental death.' },
      { title: 'Disability', content: 'Coverage for permanent disability or loss of function.' },
      { title: 'Income Protection', content: 'Safeguards against loss of income due to accidents.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult policy terms for details.' },
    ],
    eligibility: ['Eswatini resident', 'Age 18-65', 'Valid ID required'],
    howToApply: [
      'Contact a UGI branch or request a quote online',
      'Submit valid ID and required documents',
      'Receive approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'What qualifies as an accident?', content: 'Unexpected events causing injury, disability, or death.' },
      { title: 'Who can be a beneficiary?', content: 'Any designated family member or individual.' },
    ],
    related: [
      { name: 'Legal Insurance', image: '/images/legal-insurance.jpg', link: '/products/legal-insurance' },
      { name: 'Home Contents Insurance', image: '/images/home-contents.jpg', link: '/products/home-contents-insurance' },
    ],
    trust: 'Affordable accident protection for Eswatini residents.',
  },
  {
    name: 'Home Contents Insurance',
    tagline: 'Protect What Matters Most at Home',
    heroImage: '/images/home-contents.jpg',
    overview:
      'United General Insurance (UGI) Home Contents Insurance safeguards your household valuables against damage, theft, and natural disasters. This short-term insurance product covers electronics, furniture, and personal belongings, with additional protection for power surges, transit, and guest or employee items. Designed for Eswatini homeowners and tenants, UGI ensures peace of mind with a wide branch network and efficient claims processing.',
    stats: ['From E100/month', 'Eswatini-focused coverage', 'Wide branch network'],
    benefits: [
      { text: 'Safeguards from natural events and burglary', icon: PiHouse },
      { text: 'Power surge protection for electronics', icon: PiLightning },
      { text: 'Transit and temporary removal cover', icon: PiTruck },
      { text: 'Guest and employee item coverage', icon: PiUsers },
    ],
    coverage: [
      { title: 'Household Valuables', content: 'Protection for furniture, electronics, and personal items.' },
      { title: 'Natural Disasters', content: 'Covers damage from events like storms or floods.' },
      { title: 'Power Surge', content: 'Protection for electronics against power surges.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult policy terms for details.' },
      { title: 'Wear & Tear', content: 'General wear and tear is not covered.' },
    ],
    eligibility: ['Eswatini resident', 'Homeowner or tenant', 'Proof of residence required'],
    howToApply: [
      'Contact a UGI branch or request a quote online',
      'Submit proof of residence and required documents',
      'Receive approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'What items are covered?', content: 'Furniture, electronics, and personal belongings.' },
      { title: 'Does it cover guest items?', content: 'Yes, guest and employee items are included.' },
    ],
    related: [
      { name: 'Home Warranty Insurance', image: '/images/home-warranty.jpg', link: '/products/home-warranty-insurance' },
      { name: 'Motor Insurance', image: '/images/motor-insurance.jpg', link: '/products/motor-insurance' },
    ],
    trust: 'Comprehensive home protection for Eswatini residents.',
  },
  {
    name: 'Home Warranty Insurance',
    tagline: 'Buy or Sell Homes Worry-Free',
    heroImage: '/images/home-warranty.jpg',
    overview:
      'United General Insurance (UGI) Home Warranty Insurance provides a two-year warranty against hidden property defects, ensuring security for Eswatini homeowners and sellers. Covering issues like faulty roofing, walls, foundations, electrics, and plumbing, this short-term insurance product boosts property marketability and protects against unexpected repair costs. Backed by professional inspections and UGI\'s trusted service, it offers peace of mind for property transactions.',
    stats: ['From E150/month', 'Eswatini-focused coverage', 'Wide branch network'],
    benefits: [
      { text: 'Covers roof, wall, and foundation issues', icon: PiHouse },
      { text: 'Protection from faulty electrics and plumbing', icon: PiWrench },
      { text: 'Boosts property marketability', icon: PiTag },
      { text: 'Backed by professional inspections', icon: PiCheckCircle },
    ],
    coverage: [
      { title: 'Structural Defects', content: 'Covers issues with roofs, walls, and foundations.' },
      { title: 'Electrical and Plumbing', content: 'Protection against faulty systems.' },
      { title: 'Property Transactions', content: 'Enhances marketability for buyers and sellers.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult policy terms for details.' },
      { title: 'Pre-Existing Issues', content: 'Known defects prior to policy start are not covered.' },
    ],
    eligibility: ['Eswatini resident', 'Property owner or seller', 'Recent property inspection'],
    howToApply: [
      'Contact a UGI branch or request a quote online',
      'Submit recent property inspection and ownership documents',
      'Receive approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'What defects are covered?', content: 'Roof, wall, foundation, electrical, and plumbing issues.' },
      { title: 'Is a property inspection required?', content: 'Yes, a recent inspection is needed.' },
    ],
    related: [
      { name: 'Home Contents Insurance', image: '/images/home-contents.jpg', link: '/products/home-contents-insurance' },
      { name: 'Motor Insurance', image: '/images/motor-insurance.jpg', link: '/products/motor-insurance' },
    ],
    trust: 'Trusted warranty protection for Eswatini properties.',
  },
  {
    name: 'Multimark Policy',
    tagline: 'All-in-One Business Protection',
    heroImage: '/images/multimark.jpg',
    overview:
      'United General Insurance (UGI) Multimark Policy offers comprehensive coverage for Eswatini businesses, protecting against risks like fire, theft, business interruption, and liability. This corporate insurance product safeguards buildings, electronic equipment, and goods in transit, while covering employer and public liability. Designed for established businesses, it ensures continuity and security with UGI\'s trusted service and efficient claims processing.',
    stats: ['From E500/month', 'Eswatini-focused coverage', 'Wide branch network'],
    benefits: [
      { text: 'Fire and building damage protection', icon: PiFire },
      { text: 'Business interruption and theft coverage', icon: PiBriefcase },
      { text: 'Employer and public liability', icon: PiUsers },
      { text: 'Electronic equipment and goods in transit', icon: PiTruck },
    ],
    coverage: [
      { title: 'Property Damage', content: 'Covers fire and other building damages.' },
      { title: 'Business Interruption', content: 'Protection against operational losses.' },
      { title: 'Liability', content: 'Employer and public liability coverage.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult policy terms for details.' },
    ],
    eligibility: ['Registered Eswatini business', 'Valid business license', 'Minimum 1-year operation'],
    howToApply: [
      'Contact a UGI branch or request a quote online',
      'Submit business license and operational records',
      'Receive approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'What risks are covered?', content: 'Fire, theft, business interruption, and liability.' },
      { title: 'Is equipment in transit covered?', content: 'Yes, goods in transit are included.' },
    ],
    related: [
      { name: 'Bonds and Guarantee', image: '/images/bonds-guarantee.jpg', link: '/products/bonds-guarantee' },
      { name: 'Engineering Policies', image: '/images/engineering.jpg', link: '/products/engineering-policies' },
    ],
    trust: 'Comprehensive protection for Eswatini businesses.',
  },
  {
    name: 'Medical Malpractice',
    tagline: 'Safeguard Your Practice from Claims',
    heroImage: '/images/medical-malpractice.jpg',
    overview:
      'United General Insurance (UGI) Medical Malpractice Insurance protects licensed medical professionals in Eswatini from claims due to professional errors or negligence. Covering bodily injury and negligent acts, this professional insurance product is ideal for self-employed practitioners or subcontractors. With UGI\'s trusted support and efficient claims processing, you can focus on your practice with confidence.',
    stats: ['From E300/month', 'Eswatini-focused coverage', 'Wide branch network'],
    benefits: [
      { text: 'Covers negligent acts or omissions', icon: PiStethoscope },
      { text: 'Liability for bodily injury', icon: PiFirstAidKit }, // Replaced PiBandage
      { text: 'Applies to self-employed or subcontractors', icon: PiUsers },
      { text: 'Territory-specific coverage', icon: PiMapPin },
    ],
    coverage: [
      { title: 'Professional Errors', content: 'Covers negligent acts or omissions in practice.' },
      { title: 'Bodily Injury', content: 'Liability for patient injuries due to errors.' },
      { title: 'Subcontractors', content: 'Protection for self-employed or subcontracted professionals.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult policy terms for details.' },
    ],
    eligibility: ['Licensed medical professional', 'Eswatini resident', 'Proof of practice required'],
    howToApply: [
      'Contact a UGI branch or request a quote online',
      'Submit proof of license and practice documents',
      'Receive approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'Who is eligible for this insurance?', content: 'Licensed medical professionals in Eswatini.' },
      { title: 'What errors are covered?', content: 'Negligent acts or omissions causing patient harm.' },
    ],
    related: [
      { name: 'Professional Indemnity', image: '/images/professional-indemnity.jpg', link: '/products/professional-indemnity' },
      { name: 'Personal Accident Insurance', image: '/images/personal-accident.jpg', link: '/products/personal-accident-insurance' },
    ],
    trust: 'Trusted protection for Eswatini medical professionals.',
  },
  {
    name: 'Professional Indemnity',
    tagline: 'Defend Your Expertise with Confidence',
    heroImage: '/images/professional-indemnity.jpg',
    overview:
      'United General Insurance (UGI) Professional Indemnity Insurance protects Eswatini professionals like architects, engineers, accountants, and medical practitioners from liability due to advisory errors or service failures. This professional insurance product offers tailored coverage, including fronted risk options, ensuring peace of mind for your practice. UGI\'s reliable service and efficient claims processing make it a trusted choice for professionals.',
    stats: ['From E250/month', 'Eswatini-focused coverage', 'Wide branch network'],
    benefits: [
      { text: 'Protects architects, engineers, and medical pros', icon: PiBriefcase },
      { text: 'Liability for advisory errors', icon: PiWarning },
      { text: 'Includes accountants and auditors', icon: PiCalculator },
      { text: 'Fronted risk options available', icon: PiShieldCheck },
    ],
    coverage: [
      { title: 'Advisory Errors', content: 'Covers liability for professional mistakes.' },
      { title: 'Professional Services', content: 'Protection for architects, engineers, accountants, and more.' },
      { title: 'Fronted Risk', content: 'Options for tailored risk coverage.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult policy terms for details.' },
    ],
    eligibility: ['Licensed professional', 'Eswatini resident', 'Proof of qualifications'],
    howToApply: [
      'Contact a UGI branch or request a quote online',
      'Submit proof of qualifications and required documents',
      'Receive approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'Who can get this insurance?', content: 'Licensed professionals like architects and accountants.' },
      { title: 'What are fronted risk options?', content: 'Tailored coverage for specific professional risks.' },
    ],
    related: [
      { name: 'Medical Malpractice', image: '/images/medical-malpractice.jpg', link: '/products/medical-malpractice' },
      { name: 'Multimark Policy', image: '/images/multimark.jpg', link: '/products/multimark-policy' },
    ],
    trust: 'Trusted indemnity for Eswatini professionals.',
  },
  {
    name: 'Bonds and Guarantee',
    tagline: 'Secure Your Contracts Effortlessly',
    heroImage: '/images/bonds-guarantee.jpg',
    overview:
      'United General Insurance (UGI) Bonds and Guarantee Insurance provides Eswatini businesses with guarantees for customs, courts, bids, and performance bonds. This corporate insurance product covers advance payments and retention, boosting business credibility with tailored solutions. Backed by UGI\'s trusted service and efficient claims processing, it ensures your contracts are secure and your reputation intact.',
    stats: ['From E400/month', 'Eswatini-focused coverage', 'Wide branch network'],
    benefits: [
      { text: 'Covers advance payments and retention', icon: PiCurrencyCircleDollar },
      { text: 'Requires collateral and financials', icon: PiBank },
      { text: 'Boosts business credibility', icon: PiHandshake },
      { text: 'Tailored to project needs', icon: PiGear },
    ],
    coverage: [
      { title: 'Contract Bonds', content: 'Guarantees for bids, performance, and customs.' },
      { title: 'Advance Payments', content: 'Covers advance payment obligations.' },
      { title: 'Retention', content: 'Protection for retention clauses in contracts.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult policy terms for details.' },
    ],
    eligibility: ['Registered Eswatini business', 'Valid contract or bid', 'Financial statements required'],
    howToApply: [
      'Contact a UGI branch or request a quote online',
      'Submit contract and financial statements',
      'Receive approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'What types of bonds are covered?', content: 'Customs, courts, bids, and performance bonds.' },
      { title: 'Are financial statements mandatory?', content: 'Yes, financials are required for approval.' },
    ],
    related: [
      { name: 'Multimark Policy', image: '/images/multimark.jpg', link: '/products/multimark-policy' },
      { name: 'Engineering Policies', image: '/images/engineering.jpg', link: '/products/engineering-policies' },
    ],
    trust: 'Trusted contract security for Eswatini businesses.',
  },
  {
    name: 'Engineering Policies',
    tagline: 'Shield Your Projects from Risks',
    heroImage: '/images/engineering.jpg',
    overview:
      'United General Insurance (UGI) Engineering Policies provide comprehensive coverage for Eswatini construction projects and machinery, protecting against unforeseen events. This corporate insurance product safeguards ongoing projects, installations, and operational equipment, ensuring economic stability. With UGI\'s trusted service and efficient claims processing, businesses can focus on project success with confidence.',
    stats: ['From E600/month', 'Eswatini-focused coverage', 'Wide branch network'],
    benefits: [
      { text: 'Protects ongoing projects and installations', icon: PiWrench },
      { text: 'Economic safeguard against unforeseen events', icon: PiShieldCheck },
      { text: 'Covers equipment in operation', icon: PiGear },
      { text: 'Requires project contracts and financials', icon: PiFileText },
    ],
    coverage: [
      { title: 'Construction Projects', content: 'Covers ongoing construction and installations.' },
      { title: 'Machinery', content: 'Protection for equipment in operation.' },
      { title: 'Economic Stability', content: 'Safeguards against financial losses from disruptions.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult policy terms for details.' },
    ],
    eligibility: ['Registered Eswatini business', 'Active construction project', 'Project documentation'],
    howToApply: [
      'Contact a UGI branch or request a quote online',
      'Submit project contracts and documentation',
      'Receive approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'What projects are covered?', content: 'Ongoing construction and installation projects.' },
      { title: 'Is equipment in use covered?', content: 'Yes, operational equipment is included.' },
    ],
    related: [
      { name: 'Multimark Policy', image: '/images/multimark.jpg', link: '/products/multimark-policy' },
      { name: 'Bonds and Guarantee', image: '/images/bonds-guarantee.jpg', link: '/products/bonds-guarantee' },
    ],
    trust: 'Trusted protection for Eswatini construction projects.',
  },
  {
    name: 'Fidelity Guarantee',
    tagline: 'Guard Against Internal Theft',
    heroImage: '/images/fidelity-guarantee.jpg',
    overview:
      'United General Insurance (UGI) Fidelity Guarantee Insurance protects Eswatini businesses from employee dishonesty and fraud, covering theft of money or property. This corporate insurance product, also known as first-party fraud cover, safeguards firms from risks posed by employees, partners, or volunteers. With UGI\'s trusted service and efficient claims processing, businesses can operate with confidence.',
    stats: ['From E350/month', 'Eswatini-focused coverage', 'Wide branch network'],
    benefits: [
      { text: 'Covers theft of money or property', icon: PiLock },
      { text: 'Safeguards from partner or volunteer risks', icon: PiUsers },
      { text: 'Requires employee details and claims history', icon: PiFileText },
      { text: 'Known as first-party fraud cover', icon: PiShieldCheck },
    ],
    coverage: [
      { title: 'Employee Theft', content: 'Covers theft of money or property by employees.' },
      { title: 'Fraud Protection', content: 'Safeguards against partner or volunteer fraud.' },
      { title: 'First-Party Cover', content: 'Protection for internal fraudulent activities.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult policy terms for details.' },
    ],
    eligibility: ['Registered Eswatini business', 'Minimum 5 employees', 'Employee records required'],
    howToApply: [
      'Contact a UGI branch or request a quote online',
      'Submit employee records and claims history',
      'Receive approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'What is covered under fidelity guarantee?', content: 'Theft of money or property by employees or partners.' },
      { title: 'Are volunteers covered?', content: 'Yes, risks from volunteers are included.' },
    ],
    related: [
      { name: 'Multimark Policy', image: '/images/multimark.jpg', link: '/products/multimark-policy' },
      { name: 'Bonds and Guarantee', image: '/images/bonds-guarantee.jpg', link: '/products/bonds-guarantee' },
    ],
    trust: 'Trusted fraud protection for Eswatini businesses.',
  },
  {
    name: 'Political Violence and Terrorism',
    tagline: 'Insure Against Geopolitical Unrest',
    heroImage: '/images/political-violence.jpg',
    overview:
      'United General Insurance (UGI) Political Violence and Terrorism Insurance protects Eswatini businesses from losses due to riots, political violence, or terrorism. This corporate insurance product is ideal for businesses in high-risk locations, offering coverage for non-obvious targets. Requiring royal or political declarations and location details, UGI ensures tailored protection with efficient claims processing and trusted service.',
    stats: ['From E450/month', 'Eswatini-focused coverage', 'Wide branch network'],
    benefits: [
      { text: 'Protects from riots and political violence', icon: PiShieldWarning },
      { text: 'Valuable for non-obvious targets', icon: PiBuildings },
      { text: 'Requires royal/political declarations', icon: PiFileText },
      { text: 'GPS and occupation details needed', icon: PiMapPin },
    ],
    coverage: [
      { title: 'Political Violence', content: 'Covers losses from riots and unrest.' },
      { title: 'Terrorism', content: 'Protection against terrorism-related damages.' },
      { title: 'Business Losses', content: 'Safeguards against financial impacts of instability.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult policy terms for details.' },
    ],
    eligibility: ['Registered Eswatini business', 'High-risk location', 'Risk assessment required'],
    howToApply: [
      'Contact a UGI branch or request a quote online',
      'Submit risk assessment and location details',
      'Receive approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'What events are covered?', content: 'Riots, political violence, and terrorism.' },
      { title: 'Is a risk assessment required?', content: 'Yes, a risk assessment is mandatory.' },
    ],
    related: [
      { name: 'Multimark Policy', image: '/images/multimark.jpg', link: '/products/multimark-policy' },
      { name: 'Fidelity Guarantee', image: '/images/fidelity-guarantee.jpg', link: '/products/fidelity-guarantee' },
    ],
    trust: 'Trusted protection for Eswatini businesses in high-risk areas.',
  },
];

export default UnitedGeneralInsuranceData;