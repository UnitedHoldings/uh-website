// ProductsData.js
// Centralized data for all United Holdings insurance products

import {
  HiOutlineTrash,
  HiOutlineHome,
  HiOutlineFire,
  HiOutlineCloud,
  HiOutlineShieldCheck,
  HiOutlineExclamationCircle,
  HiOutlineTruck,
  HiOutlineScale,
  HiOutlineUsers,
  HiOutlinePhone,
  HiOutlineCash,
  HiOutlineCreditCard,
  HiOutlineHand,
  HiOutlineDocumentText,
  HiOutlineCurrencyDollar,
  HiOutlineBriefcase,
  HiOutlineHeart,
  HiOutlineUserGroup,
  HiOutlineOfficeBuilding,
  HiOutlineLockClosed,
  HiOutlineCalendar,
  HiOutlineTrendingUp,
  HiOutlineChip,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineDocument,
} from 'react-icons/hi';

const ProductsData = [
  // Life Assurance
  {
    name: 'Life Assurance',
    tagline: 'Long-term protection for you and your family',
    heroImage: '/life.jpg',
    overview: 'United Life Assurance provides comprehensive long-term assurance products designed to secure your family\'s financial future. As the dedicated long-term insurer within the United Holdings group, we offer a range of life assurance solutions including personal life covers, group life, credit life, and funeral assurance plans. Our policies ensure financial support in the event of death or permanent disability, with benefits such as lump sum payouts, debt coverage, and additional perks like double accidental death benefits and discounts on funeral services through our sister company, Dups Funeral Home. With a wide branch network across Eswatini, claims approved within 2 hours, and 100% Eswatini ownership, we deliver exceptional service and peace of mind. Whether for individuals, groups, or specific community needs like Tinkhundla Funeral Cover, our life assurance products are tailored to provide reliable protection and support during life\'s most challenging times.',
    stats: ['Claims approved in 2 hours', '100% Eswatini owned', 'Wide branch network'],
    benefits: [
      { text: 'Financial security for family', icon: HiOutlineHeart },
      { text: 'Double accidental death benefit', icon: HiOutlineShieldCheck },
      { text: 'Funeral discounts and services', icon: HiOutlineCalendar },
      { text: 'Group and credit life options', icon: HiOutlineUserGroup },
      { text: 'Quick claims processing', icon: HiOutlineClock },
    ],
    coverage: [
      { title: 'Personal Life Covers', content: 'Lump sum payout upon death or disability.' },
      { title: 'Group Life', content: 'Coverage for groups and communities.' },
      { title: 'Credit Life', content: 'Pays off outstanding debts if borrower dies or is disabled.' },
    ],
    exclusions: [
      { title: 'Policy Specific', content: 'Exclusions vary by plan; consult terms.' },
    ],
    eligibility: [
      'Eswatini residents',
      'Age and health requirements per policy',
    ],
    howToApply: [
      'Contact branch or get quote online',
      'Submit required documents',
      'Get approval and make payment',
    ],
    paymentMethods: ['Debit Order', 'Bank Transfer', 'Mobile Money'],
    faqs: [
      { title: 'How fast are claims paid?', content: 'Approved within 2 hours.' },
      { title: 'What benefits for accidental death?', content: 'Double payout for accidental deaths.' },
    ],
    related: [
      { name: 'Funeral Assurance', image: '/funeral.jpg', link: '/products/funeral' },
      { name: 'Dignified Family Support Cover', image: '/family-support.jpg', link: '/products/family-support' },
    ],
    trust: 'Reliable long-term assurance for Eswatini families.',
  },
  // Home Insurance
  {
    name: 'Home Insurance',
    tagline: 'Protect Your Home and Peace of Mind',
    heroImage: '/home.jpg',
    overview: 'Our comprehensive Home Insurance provides complete protection for your most valuable asset - your home. This extensive coverage safeguards your main residence, outbuildings, and personal contents against a wide range of risks including fire, explosion, theft, burglary, and natural disasters such as storms, floods, hail, and earthquakes. Beyond structural protection, we include essential benefits like debris removal costs, alternative accommodation if your home becomes uninhabitable due to covered damage, and personal liability coverage. With coverage extending up to E50,000, flexible payment options tailored to your budget, and 24/7 claims support, you can rest assured that your home and belongings are protected. Our policy is designed specifically for Eswatini homeowners, understanding local risks and providing reliable protection that thousands of families trust to secure their homes and peace of mind.',
    stats: ['Covers up to E50,000', 'Flexible payment options', '24/7 claims support'],
    benefits: [
      { text: 'Debris Removal', icon: HiOutlineTrash },
      { text: 'Alternative Accommodation', icon: HiOutlineHome },
      { text: 'Fire & Theft Cover', icon: HiOutlineFire },
      { text: 'Natural Disaster Protection', icon: HiOutlineCloud },
      { text: 'Personal Liability', icon: HiOutlineShieldCheck },
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
    overview: 'Our Motor Insurance offers comprehensive protection for your vehicle with three flexible coverage options to suit your needs and budget. Choose from Comprehensive coverage that protects against accidents, theft, fire, collision, and third-party liability; Third Party Only for essential legal liability coverage; or Third Party, Fire and Theft for balanced protection. Each policy includes valuable benefits like free towing services, windscreen cover, and funeral cover in case of accidental death. We understand that your vehicle is essential for daily life in Eswatini, which is why we provide 24/7 claims assistance and support. Our comprehensive policies are designed to get you back on the road quickly after an incident, with efficient claims processing and a network of trusted repair shops. With thousands of motorists across Eswatini trusting us with their vehicle protection, you can drive with confidence knowing you have reliable coverage from a locally-owned insurance provider.',
    stats: ['Free towing', 'Windscreen cover', 'Funeral cover for accidents'],
    benefits: [
      { text: 'Comprehensive, Third Party, Fire & Theft options', icon: HiOutlineExclamationCircle },
      { text: 'Free Towing Services', icon: HiOutlineTruck },
      { text: 'Windscreen Cover', icon: HiOutlineShieldCheck },
      { text: 'Funeral Cover for Accidents', icon: HiOutlineShieldCheck },
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
      'Valid driver\'s license',
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
    overview: 'Our Legal Insurance provides comprehensive legal protection for you and your family, ensuring you have access to quality legal representation when you need it most. This essential coverage includes face-to-face legal counselling, immediate telephonic legal advice, and full in-court representation across civil, criminal, labour, and administrative matters. Whether you\'re dealing with breach of contract, unfair dismissal, criminal charges, or need assistance with drawing up a will, our extensive network of qualified attorneys is ready to assist. With coverage up to E100,000 and protection extending to your spouse, children, and even parents/in-laws, this policy offers true family-wide legal security. We understand that legal issues can be stressful and costly, which is why we provide immediate access to legal experts who can guide you through complex situations. Thousands of Eswatini families rely on our legal protection for peace of mind in an increasingly complex legal environment.',
    stats: ['Covers up to E100,000', 'Face-to-face and telephonic advice', 'Network of attorneys'],
    benefits: [
      { text: 'Face-to-face legal counselling', icon: HiOutlineScale },
      { text: 'Immediate telephonic access', icon: HiOutlinePhone },
      { text: 'Network of attorneys', icon: HiOutlineUsers },
      { text: 'In-court representation', icon: HiOutlineScale },
      { text: 'Accidental death legal expenses cover', icon: HiOutlineShieldCheck },
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
    overview: 'Our Micro Loans service provides immediate financial assistance for employed individuals across Eswatini who need quick access to cash for emergencies, opportunities, or unexpected expenses. We offer loans up to E50,000 with flexible repayment terms extending up to 36 months, designed to fit your financial situation and budget. The application process is simple and straightforward, with immediate payment upon approval to ensure you get the funds when you need them most. Our salary deduction option makes repayment convenient and hassle-free, automatically deducting payments from your salary. We understand that financial needs can arise unexpectedly, which is why we\'ve designed our micro loans to be accessible, transparent, and reliable. Whether you\'re facing medical expenses, home repairs, educational costs, or simply need a financial boost, our micro loans provide the solution you need with the trust and reliability that comes from being a 100% Eswatini-owned financial service provider.',
    stats: ['Up to E50,000', 'Immediate payment', 'Easy application'],
    benefits: [
      { text: 'Financial boost when you need it', icon: HiOutlineCash },
      { text: 'Easy pay options (salary deduction)', icon: HiOutlineCreditCard },
      { text: 'Immediate payment on approval', icon: HiOutlineHand },
      { text: 'Simple application process', icon: HiOutlineDocumentText },
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
    overview: 'Our Dignified Family Support Cover provides essential financial protection for your loved ones during the difficult period following your passing. This compassionate coverage offers interim financial support through monthly income payments to your beneficiaries for six months, helping to bridge the income gap and maintain family stability. With payouts up to E30,000 and affordable premiums starting from just E12.50 per month, this policy ensures your family can cover essential living expenses while adjusting to new circumstances. The first instalment is paid immediately after your passing once the claim is approved, providing timely assistance when it\'s needed most. We understand that financial worries should be the last thing on your family\'s mind during such challenging times, which is why we\'ve designed this coverage to be accessible, reliable, and dignified. Thousands of Eswatini families trust us to provide this crucial safety net, ensuring their loved ones are protected and supported.',
    stats: ['Up to E30,000 payout', 'From E12.50/month', 'Interim assistance'],
    benefits: [
      { text: 'Monthly income for beneficiaries', icon: HiOutlineCash },
      { text: 'Immediate first instalment after passing', icon: HiOutlineCurrencyDollar },
      { text: 'Affordable premiums', icon: HiOutlineHand },
      { text: 'Bridges income gap for families', icon: HiOutlineUsers },
    ],
    coverage: [
      { title: 'Interim Assistance', content: 'Monthly income for six months after policyholder\'s death.' },
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
    overview: 'Our Comprehensive Motor Insurance provides the highest level of protection for your vehicle, covering virtually all risks you might encounter on Eswatini roads. This all-inclusive policy protects against accident damage, theft, fire, collision, lightning, explosion, and includes essential third-party liability coverage. Beyond standard protection, we offer valuable additional benefits including free towing services, windscreen cover, and funeral cover in case of accidental death. We understand that your vehicle represents a significant investment and is essential for your daily activities, which is why we provide 24/7 claims support and assistance. Our comprehensive coverage is designed to give you complete peace of mind, knowing that whether you\'re facing minor damage or major incidents, you\'re fully protected. With thousands of motorists across Eswatini trusting us with their comprehensive coverage needs, you can drive with confidence knowing you have reliable protection from a locally-owned insurance provider that understands your needs.',
    stats: ['Comprehensive cover', 'Third-party liability', 'Fire & theft'],
    benefits: [
      { text: 'Accident cover', icon: HiOutlineExclamationCircle },
      { text: 'Fire & theft', icon: HiOutlineFire },
      { text: 'Third-party liability', icon: HiOutlineShieldCheck },
    ],
    coverage: [{ title: 'Comprehensive', content: 'All risks including accident, theft, fire, and third-party.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Motor Insurance - Third Party
  {
    name: 'Third Party Motor Insurance',
    tagline: 'Liability protection',
    heroImage: '/car.jpg',
    overview: 'Our Third Party Motor Insurance provides essential legal liability coverage that protects you financially if you cause injury, death, or property damage to others while operating your vehicle. This cost-effective insurance meets legal requirements while providing crucial protection against potentially significant third-party claims. While it doesn\'t cover damage to your own vehicle, it ensures that if you\'re responsible for an accident, the costs associated with injury to other people or damage to their property are covered. We understand that responsible vehicle ownership includes being prepared for unexpected incidents, which is why we\'ve made this basic but essential coverage accessible and affordable. Our straightforward application process and flexible payment options make it easy to obtain the necessary legal protection without complexity or delay. Thousands of responsible motorists across Eswatini trust us for their third-party insurance needs, knowing they have reliable coverage from a locally-owned provider that prioritizes customer service and support.',
    stats: ['Third-party only'],
    benefits: [
      { text: 'Covers injury to others', icon: HiOutlineShieldCheck },
      { text: 'Covers property damage', icon: HiOutlineShieldCheck },
    ],
    coverage: [{ title: 'Third Party', content: 'Legal liability for injury or property damage to others.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Motor Insurance - Third Party, Fire & Theft
  {
    name: 'Third Party, Fire & Theft Motor Insurance',
    tagline: 'Liability plus fire/theft',
    heroImage: '/car.jpg',
    overview: 'Our Third Party, Fire & Theft Motor Insurance offers balanced protection that combines essential third-party liability coverage with important protection for your own vehicle against fire and theft risks. This middle-ground option provides legal liability coverage for injury or damage to others while also safeguarding your investment against fire damage, lightning, explosion, and theft. We understand that many vehicle owners want more than basic third-party coverage but may not need full comprehensive protection, which is why we designed this flexible option. It provides the peace of mind of knowing you\'re covered for significant risks like vehicle theft and fire damage while maintaining affordable premiums. Our claims process is straightforward and efficient, with support available 24/7 to assist when you need it most. This popular coverage option has been trusted by thousands of Eswatini motorists who value the balanced protection and affordable pricing that meets their specific needs and budget requirements.',
    stats: ['Third-party', 'Fire', 'Theft'],
    benefits: [
      { text: 'Fire cover', icon: HiOutlineFire },
      { text: 'Theft cover', icon: HiOutlineLockClosed },
      { text: 'Third-party liability', icon: HiOutlineShieldCheck },
    ],
    coverage: [{ title: 'Third Party, Fire & Theft', content: 'Covers fire, theft, and third-party liability.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Home Insurance - Buildings, outbuildings, and contents
  {
    name: 'Buildings, Outbuildings & Contents Insurance',
    tagline: 'Protect your property and belongings',
    heroImage: '/home.jpg',
    overview: 'Our Buildings, Outbuildings & Contents Insurance provides complete protection for your entire property, including your main residence, additional structures, and all personal belongings within. This comprehensive coverage safeguards against fire, theft, natural disasters, and other specified risks that could damage your property or possessions. We understand that your home is more than just a building - it\'s filled with valuable items and memories that need protection. Our policy covers everything from structural damage to loss of personal contents, with additional benefits like debris removal costs and alternative accommodation if your home becomes uninhabitable. With coverage extending up to E50,000 and flexible payment options designed for Eswatini homeowners, you can customize protection that fits your specific needs and budget. Thousands of families across Eswatini trust us to protect their homes and belongings, knowing they have reliable coverage from a locally-owned insurance provider that understands local risks and needs.',
    stats: ['Buildings', 'Contents', 'Outbuildings'],
    benefits: [
      { text: 'Fire', icon: HiOutlineFire },
      { text: 'Theft', icon: HiOutlineLockClosed },
      { text: 'Natural disasters', icon: HiOutlineCloud },
    ],
    coverage: [{ title: 'Buildings & Contents', content: 'Covers structure and belongings.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Personal Accident Insurance
  {
    name: 'Personal Accident Insurance',
    tagline: 'Lump sum payout for injury, disability, or death',
    heroImage: '/accident.jpg',
    overview: 'Our Personal Accident Insurance provides crucial financial protection if you suffer injury, disability, or death due to an accident. This essential coverage pays a lump sum benefit that can help cover medical expenses, replace lost income during recovery, or provide financial support to your family in case of accidental death. We understand that accidents can happen unexpectedly and often result in significant financial burdens, which is why we\'ve designed this coverage to provide immediate financial assistance when you need it most. The lump sum payout can be used flexibly to cover hospital bills, rehabilitation costs, household expenses, or any other needs that arise following an accident. Our straightforward claims process and 24/7 support ensure that you receive assistance quickly during difficult times. Thousands of individuals and families across Eswatini trust our personal accident coverage for peace of mind, knowing they have reliable financial protection from unexpected accidents that could otherwise create significant financial hardship.',
    stats: ['Lump sum payout'],
    benefits: [
      { text: 'Injury cover', icon: HiOutlineHeart },
      { text: 'Disability cover', icon: HiOutlineShieldCheck },
      { text: 'Death cover', icon: HiOutlineShieldCheck },
    ],
    coverage: [{ title: 'Accident', content: 'Lump sum for injury, disability, or death.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Political Violence & Terrorism Insurance
  {
    name: 'Political Violence & Terrorism Insurance',
    tagline: 'Protection against unrest, riots, terrorism',
    heroImage: '/political.jpg',
    overview: 'Our Political Violence & Terrorism Insurance provides essential protection for businesses and property owners against losses resulting from civil unrest, riots, strikes, terrorism, and other political violence events. This specialized coverage is particularly important in today\'s unpredictable environment, safeguarding your commercial assets, inventory, and business continuity against politically-motivated incidents. We understand that businesses face unique risks that extend beyond traditional insurance coverage, which is why we offer this targeted protection specifically designed for the Eswatini market. Whether you operate a retail establishment, manufacturing facility, or own commercial property, this coverage ensures that unexpected political events don\'t jeopardize your financial stability. Our claims handling is efficient and understanding of the sensitive nature of political violence incidents, with support available to help you recover and resume operations as quickly as possible. Business owners across Eswatini trust us to provide this crucial protection, knowing they have comprehensive coverage from a locally-owned provider that understands regional risks.',
    stats: ['Unrest', 'Riots', 'Terrorism'],
    benefits: [
      { text: 'Business protection', icon: HiOutlineShieldCheck },
      { text: 'Covers political violence', icon: HiOutlineExclamationCircle },
    ],
    coverage: [{ title: 'Political Violence', content: 'Covers losses from political violence and terrorism.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Engineering Policies & Guarantees
  {
    name: 'Engineering Policies & Guarantees',
    tagline: 'For contractors, developers, construction projects',
    heroImage: '/engineering.jpg',
    overview: 'Our Engineering Policies & Guarantees provide comprehensive insurance solutions for contractors, developers, and construction projects across Eswatini. This specialized coverage protects against risks specific to engineering and construction work, including contractor\'s all risk, erection all risk, machinery breakdown, and various guarantee bonds required for project completion. We understand that construction and engineering projects involve significant investments and complex risks that require tailored insurance solutions. Our policies cover everything from site works and equipment to liability and project delays, ensuring that your project remains protected throughout all phases of development. Additionally, we provide guarantee bonds that may be required for tender purposes, performance guarantees, or advance payment protections. Construction professionals and developers across Eswatini trust our engineering insurance expertise, knowing they have comprehensive protection from a locally-owned provider that understands the unique challenges and requirements of the construction industry in our region.',
    stats: ['Contractors', 'Developers', 'Construction'],
    benefits: [
      { text: 'Project cover', icon: HiOutlineBriefcase },
      { text: 'Equipment cover', icon: HiOutlineChip },
    ],
    coverage: [{ title: 'Engineering', content: 'Covers site works, equipment, and liability.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Multimark Policy
  {
    name: 'Multimark Policy',
    tagline: 'All-inclusive corporate/business cover',
    heroImage: '/multimark.jpg',
    overview: 'Our Multimark Policy offers all-inclusive insurance protection for businesses and corporations operating in Eswatini, providing comprehensive coverage against a wide range of commercial risks in a single, convenient package. This versatile policy can be customized to include property damage, business interruption, liability coverage, theft, money protection, and various other commercial risks specific to your industry and operations. We understand that businesses need efficient, comprehensive insurance solutions that minimize complexity while maximizing protection, which is why we\'ve designed the Multimark Policy as a flexible, all-in-one solution. Whether you operate a small retail business, manufacturing facility, service company, or large corporation, this policy can be tailored to your specific risk profile and coverage needs. Business owners and corporate risk managers across Eswatini trust our Multimark Policy for reliable, comprehensive protection that simplifies insurance management while ensuring all critical business assets and operations are properly safeguarded against unexpected events.',
    stats: ['Corporate', 'Business', 'All risks'],
    benefits: [
      { text: 'All-in-one business cover', icon: HiOutlineOfficeBuilding },
    ],
    coverage: [{ title: 'Multimark', content: 'Covers multiple business risks.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Medical Malpractice Insurance
  {
    name: 'Medical Malpractice Insurance',
    tagline: 'For healthcare professionals',
    heroImage: '/medical.jpg',
    overview: 'Our Medical Malpractice Insurance provides essential professional liability coverage for healthcare professionals across Eswatini, including doctors, nurses, dentists, specialists, and other medical practitioners. This specialized insurance protects against claims of negligence, errors, or omissions in professional medical services that could result in patient injury, complications, or other adverse outcomes. We understand that healthcare professionals face unique liability risks in their practice, which is why we offer comprehensive malpractice coverage specifically designed for the medical field. Our policies include legal defense costs, settlement amounts, and damages awarded, ensuring that your professional reputation and financial stability are protected against malpractice claims. Healthcare professionals throughout Eswatini trust our medical malpractice coverage for reliable protection that allows them to focus on providing quality patient care without the constant worry of potential liability claims. Our understanding of the healthcare industry and local legal environment ensures that you receive appropriate coverage tailored to your specific practice and risk exposure.',
    stats: ['Doctors', 'Nurses', 'Dentists'],
    benefits: [
      { text: 'Professional liability', icon: HiOutlineUser },
    ],
    coverage: [{ title: 'Malpractice', content: 'Covers professional errors and negligence.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Professional Indemnity Insurance
  {
    name: 'Professional Indemnity Insurance',
    tagline: 'Covers professional errors, negligence',
    heroImage: '/indemnity.jpg',
    overview: 'Our Professional Indemnity Insurance provides crucial protection for professionals across various industries against claims of negligence, errors, omissions, or breach of duty in their professional services. This essential coverage is designed for consultants, advisors, architects, engineers, accountants, and other professionals who provide expert advice or services to clients. We understand that even the most careful professionals can face allegations of inadequate work or advice, which is why we offer comprehensive indemnity coverage that includes legal defense costs, settlement amounts, and damages awarded. Our policies are tailored to specific professions, ensuring that you receive appropriate protection for your particular risk exposure and professional responsibilities. Professionals throughout Eswatini trust our indemnity insurance for reliable protection that safeguards their practice, reputation, and financial stability against potential claims. With our understanding of local professional standards and legal requirements, we provide coverage that meets the specific needs of Eswatini professionals across various sectors and specializations.',
    stats: ['Professional errors', 'Negligence'],
    benefits: [
      { text: 'Indemnity cover', icon: <HiOutlineDocument /> },
    ],
    coverage: [{ title: 'Indemnity', content: 'Covers professional errors and negligence.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Fidelity Guarantee Insurance
  {
    name: 'Fidelity Guarantee Insurance',
    tagline: 'Protection against employee fraud/theft',
    heroImage: '/fidelity.jpg',
    overview: 'Our Fidelity Guarantee Insurance provides essential protection for businesses against financial losses resulting from employee fraud, theft, or dishonesty. This specialized coverage safeguards your company\'s assets, cash, inventory, and other valuable property against internal threats that could significantly impact your financial stability and operations. We understand that businesses of all sizes face risks from internal dishonesty, which is why we offer comprehensive fidelity coverage that can be customized based on your employee structure, cash handling procedures, and specific vulnerability areas. Our policies cover direct financial losses, investigation costs, and recovery expenses associated with employee dishonesty incidents. Business owners and financial managers across Eswatini trust our fidelity guarantee insurance for reliable protection that complements their internal controls and security measures. With our understanding of local business environments and risk factors, we provide coverage that addresses the specific fidelity risks faced by Eswatini businesses, ensuring comprehensive protection against potential internal threats.',
    stats: ['Employee fraud', 'Theft'],
    benefits: [
      { text: 'Fidelity guarantee', icon: HiOutlineLockClosed },
    ],
    coverage: [{ title: 'Fidelity', content: 'Covers employee fraud and theft.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Dignified Tribute Cover
  {
    name: 'Dignified Tribute Cover',
    tagline: 'Cash payout for memorial arrangements',
    heroImage: '/tribute.jpg',
    overview: 'Our Dignified Tribute Cover provides a cash payout to your nominated beneficiary to help cover memorial arrangement costs and related expenses following your passing. This thoughtful coverage ensures that your loved ones have immediate access to funds for memorial services, tribute events, and other arrangements that honor your memory with dignity and respect. We understand that memorial arrangements involve both emotional significance and practical financial considerations, which is why we offer this dedicated coverage specifically designed for tribute expenses. The cash payout provides flexibility for your beneficiaries to create a meaningful tribute that reflects your life and values without financial strain during an emotionally difficult time. Families across Eswatini trust our Dignified Tribute Cover for compassionate financial support that allows them to focus on honoring their loved one\'s memory rather than worrying about immediate expenses. Our straightforward claims process ensures timely access to funds when they\'re needed most.',
    stats: ['Memorial payout'],
    benefits: [
      { text: 'Cash for memorials', icon: HiOutlineCalendar },
    ],
    coverage: [{ title: 'Tribute', content: 'Cash payout for memorial arrangements.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Funeral Assurance (Individual & Group)
  {
    name: 'Funeral Assurance',
    tagline: 'Funeral support for individuals and groups',
    heroImage: '/funeral.jpg',
    overview: 'Our Funeral Assurance provides comprehensive funeral expense coverage for both individuals and groups, ensuring that funeral costs don\'t create additional financial burden during times of loss. This essential coverage helps cover funeral services, burial or cremation expenses, transportation, and other related costs associated with final arrangements. We understand that funeral expenses can be significant and often arise unexpectedly, which is why we offer flexible individual and group coverage options designed for Eswatini families and organizations. Our individual policies provide personal protection, while our group options are ideal for employers, associations, or community organizations wanting to provide funeral benefits to members or employees. Families and organizations across Eswatini trust our funeral assurance for reliable, compassionate coverage that honors cultural traditions and provides financial support when it\'s needed most. Our efficient claims process ensures timely payout to help cover expenses without delay during difficult times.',
    stats: ['Individual', 'Group'],
    benefits: [
      { text: 'Funeral expense cover', icon: HiOutlineUsers },
    ],
    coverage: [{ title: 'Funeral', content: 'Covers funeral expenses for individuals and groups.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Umlamleli Loan (Salary Advance)
  {
    name: 'Umlamleli Loan (Salary Advance)',
    tagline: 'Mid-month salary boost',
    heroImage: '/loan.jpg',
    overview: 'Our Umlamleli Loan service provides convenient salary advance solutions for employed individuals across Eswatini who need mid-month financial assistance between pay periods. This short-term loan option offers quick access to cash for unexpected expenses, emergencies, or opportunities that arise before your next salary payment. We understand that financial needs don\'t always align with pay schedules, which is why we offer this flexible salary advance service with simple application requirements and rapid approval. The repayment is conveniently structured through salary deduction, making it hassle-free and ensuring you don\'t face additional administrative burdens. Employed individuals throughout Eswatini trust our Umlamleli Loans for reliable, transparent short-term financing that provides immediate financial relief when needed. Our commitment to responsible lending ensures that loans are structured affordably based on your income, helping you manage temporary cash flow challenges without creating long-term financial strain.',
    stats: ['Salary advance'],
    benefits: [
      { text: 'Quick salary boost', icon: HiOutlineTrendingUp },
    ],
    coverage: [{ title: 'Salary Advance', content: 'Short-term loan against salary.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Shesha Loans
  {
    name: 'Shesha Loans',
    tagline: 'Fast-access emergency funds',
    heroImage: '/shesha.jpg',
    overview: 'Our Shesha Loans provide fast-access emergency funds for employed individuals across Eswatini who need immediate financial assistance for urgent needs or unexpected expenses. This quick loan service is designed for speed and convenience, with streamlined application processes and rapid approval to ensure you receive funds when you need them most. We understand that financial emergencies can arise unexpectedly and require immediate attention, which is why we\'ve designed our Shesha Loans to provide timely solutions without unnecessary delays or complexity. Whether you\'re facing medical emergencies, vehicle repairs, home maintenance issues, or other urgent financial needs, our quick loan service offers reliable access to emergency funds. Employed individuals throughout Eswatini trust our Shesha Loans for transparent, responsible emergency financing that provides immediate relief during challenging financial situations. Our commitment to customer service ensures you receive professional assistance throughout the borrowing process.',
    stats: ['Fast approval'],
    benefits: [
      { text: 'Emergency funds', icon: HiOutlineExclamationCircle },
    ],
    coverage: [{ title: 'Emergency Loan', content: 'Quick loan for urgent needs.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Contractor\'s All Risk (via Engineering)
  {
    name: 'Contractor\'s All Risk',
    tagline: 'Site works, equipment, liability',
    heroImage: '/engineering.jpg',
    overview: 'Our Contractor\'s All Risk insurance provides comprehensive protection for construction projects, contractors, and developers across Eswatini, covering site works, equipment, materials, and liability exposures specific to construction activities. This specialized coverage is essential for any construction project, protecting against damage to the works, theft of materials and equipment, natural disasters, and third-party liability claims arising from construction operations. We understand that construction projects involve significant investments and complex risks that require tailored insurance solutions, which is why we offer comprehensive all-risk coverage specifically designed for the construction industry. Our policies can be customized based on project size, duration, and specific risk factors, ensuring appropriate protection throughout the construction phase. Contractors and developers throughout Eswatini trust our Contractor\'s All Risk coverage for reliable protection that safeguards their projects, equipment, and financial investments against the unique risks faced in the construction industry.',
    stats: ['All risk', 'Contractors'],
    benefits: [
      { text: 'Site and equipment cover', icon: HiOutlineBriefcase },
    ],
    coverage: [{ title: 'All Risk', content: 'Covers site works, equipment, and liability.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
  // Business Interruption / Corporate Extensions
  {
    name: 'Business Interruption / Corporate Extensions',
    tagline: 'Linked to Multimark & Engineering',
    heroImage: '/business.jpg',
    overview: 'Our Business Interruption and Corporate Extensions provide crucial coverage for loss of income and additional expenses when your business operations are disrupted by insured events covered under your Multimark or Engineering policies. This essential protection helps maintain financial stability during periods when your business cannot operate normally due to damage from fire, natural disasters, equipment breakdown, or other covered incidents. We understand that business interruption can create significant financial challenges beyond direct physical damage, which is why we offer comprehensive coverage for lost profits, fixed expenses, and extra costs incurred to minimize disruption. Our policies can be tailored to your specific business operations, revenue patterns, and recovery needs, ensuring appropriate protection against operational disruptions. Business owners throughout Eswatini trust our business interruption coverage for reliable financial protection that helps maintain stability during recovery periods, ensuring that temporary operational disruptions don\'t become permanent business failures.',
    stats: ['Business interruption'],
    benefits: [
      { text: 'Income protection', icon: HiOutlineCurrencyDollar },
    ],
    coverage: [{ title: 'Business Interruption', content: 'Covers loss of income due to interruption.' }],
    exclusions: [], eligibility: [], howToApply: [], paymentMethods: [], faqs: [], related: [], trust: ''
  },
]

export default ProductsData;