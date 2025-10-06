// ProductsData.js
// Centralized data for all United Holdings insurance products


const ProductsData = [
  // Home Insurance
  {
    name: 'Home Insurance',
    tagline: 'Protect Your Home and Peace of Mind',
    heroImage: '/home.jpg',
    overview: 'Provides cover for your house, outbuildings, and contents against fire, theft, and natural disasters.',
    stats: ['Covers up to E50,000', 'Flexible payment options', '24/7 claims support'],
    benefits: [
      'Debris Removal',
      'Alternative Accommodation',
      'Fire & Theft Cover',
      'Natural Disaster Protection',
      'Personal Liability',
    ],
    coverage: [
      { title: 'Fire & Explosion', content: 'Covers damage caused by fire, lightning, or explosion.' },
      { title: 'Theft', content: 'Loss or damage due to burglary or theft.' },
      { title: 'Natural Disasters', content: 'Storm, flood, hail, and earthquake cover.' },
    ],
    exclusions: [
      { title: 'Waiting Periods', content: 'Claims within the first 30 days are not covered.' },
      { title: 'Wear & Tear', content: 'General wear and tear is not covered.' },
    ],
    eligibility: [
      'Applicant must be 18+ years old',
      'Proof of residence',
      'Valid ID/Passport',
    ],
    howToApply: [
      'Fill out the online form',
      'Submit required documents',
      'Get approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'Can I change beneficiaries?', content: 'Yes, you can update beneficiaries anytime via your account.' },
      { title: 'How do I file a claim?', content: 'Use the online portal or contact our claims team.' },
    ],
    related: [
      { name: 'Personal Accident', image: '/accident.jpg', link: '/products/personal-accident' },
      { name: 'Funeral Cover', image: '/funeral.jpg', link: '/products/funeral' },
    ],
    trust: '100% Eswatini-owned. Trusted by thousands.',
  },
  // Motor Insurance
  {
    name: 'Motor Insurance',
    tagline: 'Comprehensive, Third Party, Fire & Theft',
    heroImage: '/car.jpg',
    overview: 'Comprehensive cover for your vehicle, including accident, theft, fire, and third-party liability.',
    stats: ['Free towing', 'Windscreen cover', 'Funeral cover for accidents'],
    benefits: [
      'Comprehensive, Third Party, Fire & Theft options',
      'Free Towing Services',
      'Windscreen Cover',
      'Funeral Cover for Accidents',
    ],
    coverage: [
      { title: 'Comprehensive', content: 'Covers accident damage, theft, fire, collision, lightning, explosion, and third-party liability.' },
      { title: 'Third-Party Only', content: 'Covers legal liability for injury, death, or property damage to third parties.' },
      { title: 'Third Party, Fire and Theft', content: 'Covers loss/damage to your vehicle from fire, lightning, explosion, theft, and third-party liabilities.' },
    ],
    exclusions: [
      { title: 'Unlicensed Drivers', content: 'No cover if the driver is not properly licensed.' },
      { title: 'Illegal Use', content: 'No cover for illegal or unapproved use of the vehicle.' },
    ],
    eligibility: [
      'Vehicle must be roadworthy',
      'Valid driver’s license',
    ],
    howToApply: [
      'Fill out the online form',
      'Submit vehicle documents',
      'Get approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'What is covered under comprehensive?', content: 'Accident, theft, fire, and third-party liability.' },
      { title: 'How do I claim towing?', content: 'Contact our claims team 24/7 for assistance.' },
    ],
    related: [
      { name: 'Home Insurance', image: '/home.jpg', link: '/products/home-insurance' },
      { name: 'Personal Accident', image: '/accident.jpg', link: '/products/personal-accident' },
    ],
    trust: 'Trusted by thousands of motorists in Eswatini.',
  },
  // Legal Insurance
  {
    name: 'Legal Insurance',
    tagline: 'Legal Protection for You & Family',
    heroImage: '/legal.jpg',
    overview: 'Legal counselling and representation for civil, criminal, labour, and administrative matters.',
    stats: ['Covers up to E100,000', 'Face-to-face and telephonic advice', 'Network of attorneys'],
    benefits: [
      'Face-to-face legal counselling',
      'Immediate telephonic access',
      'Network of attorneys',
      'In-court representation',
      'Accidental death legal expenses cover',
    ],
    coverage: [
      { title: 'Civil Matters', content: 'Breach of contract, defective goods, evictions, uncontested divorce.' },
      { title: 'Criminal Matters', content: 'Assault, theft, robbery, murder, rape, hijacking, physical abuse.' },
      { title: 'Labour Matters', content: 'Unfair dismissals, discrimination, unfair labour practices.' },
      { title: 'Administrative Matters', content: 'Drawing up a simple will.' },
    ],
    exclusions: [
      { title: 'Waiting Periods', content: '6 months for most cases, 12 months for criminal cases.' },
      { title: 'Non-disclosure', content: 'Claims may be denied for non-disclosure or misrepresentation.' },
    ],
    eligibility: [
      'Main member: 18-65 years',
      'Spouse: 18-65 years',
      'Children: up to 18 years',
      'Parents/in-law: up to 75 years',
    ],
    howToApply: [
      'Fill out the online form',
      'Submit required documents',
      'Get approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'What is covered?', content: 'Civil, criminal, labour, and administrative legal matters.' },
      { title: 'What is the waiting period?', content: '6 months for most cases, 12 months for criminal.' },
    ],
    related: [
      { name: 'Home Insurance', image: '/home.jpg', link: '/products/home-insurance' },
      { name: 'Motor Insurance', image: '/car.jpg', link: '/products/motor-insurance' },
    ],
    trust: 'Legal protection for Eswatini families.',
  },
  // Micro Loans
  {
    name: 'Micro Loans',
    tagline: 'Immediate Access to Cash',
    heroImage: '/micro.jpg',
    overview: 'Short-term loans up to E50,000 for individuals who are gainfully employed.',
    stats: ['Up to E50,000', 'Immediate payment', 'Easy application'],
    benefits: [
      'Financial boost when you need it',
      'Easy pay options (salary deduction)',
      'Immediate payment on approval',
      'Simple application process',
    ],
    coverage: [
      { title: 'Loan Amount', content: 'Up to E50,000, payable within 36 months.' },
      { title: 'Eligibility', content: 'Gainfully employed, employer agrees to source deductions.' },
    ],
    exclusions: [
      { title: 'Statutory Deductions', content: 'Must qualify according to statutory deductions regulation.' },
    ],
    eligibility: [
      '18+ years old',
      'Gainfully employed',
      'Employer must agree to source deductions',
    ],
    howToApply: [
      'Apply online',
      'Submit required documents',
      'Get approval and receive payment',
    ],
    paymentMethods: ['Bank Transfer', 'Salary Deduction'],
    faqs: [
      { title: 'How fast is payment?', content: 'Immediate, once approved.' },
      { title: 'Who can apply?', content: 'Anyone gainfully employed with employer consent.' },
    ],
    related: [
      { name: 'Home Insurance', image: '/home.jpg', link: '/products/home-insurance' },
      { name: 'Motor Insurance', image: '/car.jpg', link: '/products/motor-insurance' },
    ],
    trust: 'Fast, reliable loans for Eswatini.',
  },
  // Dignified Family Support Cover
  {
    name: 'Dignified Family Support Cover',
    tagline: 'Support for Your Loved Ones',
    heroImage: '/family-support.jpg',
    overview: 'Provides interim financial support for your family after your passing, with monthly income for six months.',
    stats: ['Up to E30,000 payout', 'From E12.50/month', 'Interim assistance'],
    benefits: [
      'Monthly income for beneficiaries',
      'Immediate first instalment after passing',
      'Affordable premiums',
      'Bridges income gap for families',
    ],
    coverage: [
      { title: 'Interim Assistance', content: 'Monthly income for six months after policyholder’s death.' },
      { title: 'Payout', content: 'Up to E30,000 to the beneficiary.' },
    ],
    exclusions: [
      { title: 'Only Policyholder Covered', content: 'Only the policyholder is covered under this plan.' },
    ],
    eligibility: [
      '18+ years old',
      'Valid ID/Passport',
    ],
    howToApply: [
      'Fill out the online form',
      'Submit required documents',
      'Get approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'How soon is the first payment?', content: 'Immediately after passing, once claim is approved.' },
      { title: 'Who is covered?', content: 'Only the policyholder.' },
    ],
    related: [
      { name: 'Funeral Cover', image: '/funeral.jpg', link: '/products/funeral' },
      { name: 'Credit Life Insurance', image: '/credit-life.jpg', link: '/products/credit-life' },
    ],
    trust: 'Trusted support for Eswatini families.',
  },
  // Motor Insurance - Comprehensive
  {
    name: 'Comprehensive Motor Insurance',
    tagline: 'Full vehicle protection',
    heroImage: '/car.jpg',
    overview: 'Covers your vehicle for accident, theft, fire, and third-party liability.',
    stats: ['Comprehensive cover', 'Third-party liability', 'Fire & theft'],
    benefits: ['Accident cover', 'Fire & theft', 'Third-party liability'],
    coverage: [{ title: 'Comprehensive', content: 'All risks including accident, theft, fire, and third-party.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Motor Insurance - Third Party
  {
    name: 'Third Party Motor Insurance',
    tagline: 'Liability protection',
    heroImage: '/car.jpg',
    overview: 'Covers your legal liability for injury or damage to others.',
    stats: ['Third-party only'],
    benefits: ['Covers injury to others', 'Covers property damage'],
    coverage: [{ title: 'Third Party', content: 'Legal liability for injury or property damage to others.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Motor Insurance - Third Party, Fire & Theft
  {
    name: 'Third Party, Fire & Theft Motor Insurance',
    tagline: 'Liability plus fire/theft',
    heroImage: '/car.jpg',
    overview: 'Covers third-party liability plus fire and theft of your vehicle.',
    stats: ['Third-party', 'Fire', 'Theft'],
    benefits: ['Fire cover', 'Theft cover', 'Third-party liability'],
    coverage: [{ title: 'Third Party, Fire & Theft', content: 'Covers fire, theft, and third-party liability.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Home Insurance - Buildings, outbuildings, and contents
  {
    name: 'Buildings, Outbuildings & Contents Insurance',
    tagline: 'Protect your property and belongings',
    heroImage: '/home.jpg',
    overview: 'Covers your home, outbuildings, and contents against major risks.',
    stats: ['Buildings', 'Contents', 'Outbuildings'],
    benefits: ['Fire', 'Theft', 'Natural disasters'],
    coverage: [{ title: 'Buildings & Contents', content: 'Covers structure and belongings.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Personal Accident Insurance
  {
    name: 'Personal Accident Insurance',
    tagline: 'Lump sum payout for injury, disability, or death',
    heroImage: '/accident.jpg',
    overview: 'Pays a lump sum if you are injured, disabled, or die in an accident.',
    stats: ['Lump sum payout'],
    benefits: ['Injury cover', 'Disability cover', 'Death cover'],
    coverage: [{ title: 'Accident', content: 'Lump sum for injury, disability, or death.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Political Violence & Terrorism Insurance
  {
    name: 'Political Violence & Terrorism Insurance',
    tagline: 'Protection against unrest, riots, terrorism',
    heroImage: '/political.jpg',
    overview: 'Safeguards your business against losses from unrest, riots, and terrorism.',
    stats: ['Unrest', 'Riots', 'Terrorism'],
    benefits: ['Business protection', 'Covers political violence'],
    coverage: [{ title: 'Political Violence', content: 'Covers losses from political violence and terrorism.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Engineering Policies & Guarantees
  {
    name: 'Engineering Policies & Guarantees',
    tagline: 'For contractors, developers, construction projects',
    heroImage: '/engineering.jpg',
    overview: 'Insurance and guarantees for construction and engineering projects.',
    stats: ['Contractors', 'Developers', 'Construction'],
    benefits: ['Project cover', 'Equipment cover'],
    coverage: [{ title: 'Engineering', content: 'Covers site works, equipment, and liability.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Multimark Policy
  {
    name: 'Multimark Policy',
    tagline: 'All-inclusive corporate/business cover',
    heroImage: '/multimark.jpg',
    overview: 'Comprehensive insurance for businesses against unforeseen risks.',
    stats: ['Corporate', 'Business', 'All risks'],
    benefits: ['All-in-one business cover'],
    coverage: [{ title: 'Multimark', content: 'Covers multiple business risks.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Medical Malpractice Insurance
  {
    name: 'Medical Malpractice Insurance',
    tagline: 'For healthcare professionals',
    heroImage: '/medical.jpg',
    overview: 'Covers doctors, nurses, dentists, and healthcare professionals for liability.',
    stats: ['Doctors', 'Nurses', 'Dentists'],
    benefits: ['Professional liability'],
    coverage: [{ title: 'Malpractice', content: 'Covers professional errors and negligence.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Professional Indemnity Insurance
  {
    name: 'Professional Indemnity Insurance',
    tagline: 'Covers professional errors, negligence',
    heroImage: '/indemnity.jpg',
    overview: 'Protects professionals against claims of negligence or errors.',
    stats: ['Professional errors', 'Negligence'],
    benefits: ['Indemnity cover'],
    coverage: [{ title: 'Indemnity', content: 'Covers professional errors and negligence.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Fidelity Guarantee Insurance
  {
    name: 'Fidelity Guarantee Insurance',
    tagline: 'Protection against employee fraud/theft',
    heroImage: '/fidelity.jpg',
    overview: 'Covers losses from employee fraud or theft.',
    stats: ['Employee fraud', 'Theft'],
    benefits: ['Fidelity guarantee'],
    coverage: [{ title: 'Fidelity', content: 'Covers employee fraud and theft.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Dignified Tribute Cover
  {
    name: 'Dignified Tribute Cover',
    tagline: 'Cash payout for memorial arrangements',
    heroImage: '/tribute.jpg',
    overview: 'Pays out cash to nominated beneficiary for memorial arrangements.',
    stats: ['Memorial payout'],
    benefits: ['Cash for memorials'],
    coverage: [{ title: 'Tribute', content: 'Cash payout for memorial arrangements.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Funeral Assurance (Individual & Group)
  {
    name: 'Funeral Assurance',
    tagline: 'Funeral support for individuals and groups',
    heroImage: '/funeral.jpg',
    overview: 'Funeral insurance for individuals and groups, covering funeral expenses.',
    stats: ['Individual', 'Group'],
    benefits: ['Funeral expense cover'],
    coverage: [{ title: 'Funeral', content: 'Covers funeral expenses for individuals and groups.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Umlamleli Loan (Salary Advance)
  {
    name: 'Umlamleli Loan (Salary Advance)',
    tagline: 'Mid-month salary boost',
    heroImage: '/loan.jpg',
    overview: 'Short-term salary advance for mid-month cash needs.',
    stats: ['Salary advance'],
    benefits: ['Quick salary boost'],
    coverage: [{ title: 'Salary Advance', content: 'Short-term loan against salary.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Shesha Loans
  {
    name: 'Shesha Loans',
    tagline: 'Fast-access emergency funds',
    heroImage: '/shesha.jpg',
    overview: 'Quick loans for emergencies and urgent needs.',
    stats: ['Fast approval'],
    benefits: ['Emergency funds'],
    coverage: [{ title: 'Emergency Loan', content: 'Quick loan for urgent needs.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Contractor’s All Risk (via Engineering)
  {
    name: 'Contractor’s All Risk',
    tagline: 'Site works, equipment, liability',
    heroImage: '/engineering.jpg',
    overview: 'Covers site works, equipment, and liability for contractors.',
    stats: ['All risk', 'Contractors'],
    benefits: ['Site and equipment cover'],
    coverage: [{ title: 'All Risk', content: 'Covers site works, equipment, and liability.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Business Interruption / Corporate Extensions
  {
    name: 'Business Interruption / Corporate Extensions',
    tagline: 'Linked to Multimark & Engineering',
    heroImage: '/business.jpg',
    overview: 'Covers loss of income due to business interruption, linked to Multimark and Engineering policies.',
    stats: ['Business interruption'],
    benefits: ['Income protection'],
    coverage: [{ title: 'Business Interruption', content: 'Covers loss of income due to interruption.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
]
export default ProductsData;
