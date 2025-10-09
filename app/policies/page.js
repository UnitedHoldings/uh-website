"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PolicyPage() {
    const [activePolicy, setActivePolicy] = useState('consumer');

    return (
        <div className="min-h-screen font-outfit mx-auto">
            {/* Top red bar */}
            <div className='bg-[#881a1e] h-8 w-full' />
            
            {/* Header section */}
            <div className='bg-[#9b1c20] py-4'>
                <header className="max-w-[1400px] mx-auto px-4">
                    <h1 className="text-2xl md:text-4xl font-semibold text-white">Our Policies</h1>
                    <p className="text-sm text-white">Review our policies for consumer protection, data handling, and more.</p>
                </header>
            </div>
            
            {/* Hero banner with image */}
            <div className='relative'>
                <div className='bg-gradient-to-r absolute from-[#9b1c20]/60 to-[#9b1c20]/20 h-full w-full' />
                <Image 
                    src={'/legal.jpg'} 
                    alt="Policy Information" 
                    width={1920} 
                    height={400} 
                    className="w-full h-[320px] object-cover" 
                />

                <div className="absolute right-[10%] top-[20%] flex items-center">
                    <div className="max-w-[1100px] mx-auto px-4 w-full">
                        <div className="bg-[#9b1c20] px-8 flex flex-col mx-auto text-white py-8">
                            <div className='left-[13%] space-y-4 top-[30%] text-white'>
                                <p className='text-4xl max-w-96 font-semibold'>Transparent Policies for Your Peace of Mind</p>
                                <p className='text-sm font-light'>We&apos;re committed to clear communication about how we protect your rights and data.</p>
                            </div>
                            
                            <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
                                <label className="sr-only">Select Policy</label>
                                <select
                                    value={activePolicy}
                                    onChange={(e) => setActivePolicy(e.target.value)}
                                    className="rounded-full px-4 py-2 min-w-[300px] bg-white border text-gray-800"
                                >
                                    <option value="consumer">Consumer Protection Policy</option>
                                    <option value="cookie">Cookie Policy</option>
                                    <option value="terms">Terms and Conditions</option>
                                    <option value="data">Data Retention Policy</option>
                                    <option value="disclaimer">Disclaimer & Risk Disclosure</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Main content area */}
            <div className='max-w-[1400px] px-4 mt-8 mb-16 space-y-6 mx-auto'>
                <div className="flex justify-between items-center md:flex-row md:items-center gap-4 md:gap-8">
                    <p className='max-w-[800px] text-2xl'>
                        Our policies ensure transparency and protect your rights. All policies are regularly updated in accordance with 
                        <span className="text-[#9b1c20] font-semibold"> Eswatini regulations</span>.
                    </p>
                    <div>
                        <button className='border-[#9b1c20] border text-[#9b1c20] py-2 px-8 rounded-full'>
                            Download All Policies
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Policy tabs and content */}
            <div className="bg-white overflow-hidden">
                <div className='max-w-[1400px] px-4 mt-8 mb-16 space-y-6 mx-auto flex flex-col md:flex-row'>
                    {/* Tab navigation */}
                    <div className='md:w-4/12 mb-6 md:mb-0'>
                        <p className='font-semibold text-3xl'>Our Policies</p>
                        <div className="flex flex-col w-full justify-between py-6">
                            <nav className="flex flex-col gap-2">
                                <button
                                    onClick={() => setActivePolicy('consumer')}
                                    className={`px-4 py-3 rounded-full transition text-left ${activePolicy === 'consumer' ? 'bg-[#9b1c20] text-white' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    Consumer Protection Policy
                                </button>
                                <button
                                    onClick={() => setActivePolicy('cookie')}
                                    className={`px-4 py-3 rounded-full transition text-left ${activePolicy === 'cookie' ? 'bg-[#9b1c20] text-white' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    Cookie Policy
                                </button>
                                <button
                                    onClick={() => setActivePolicy('terms')}
                                    className={`px-4 py-3 rounded-full transition text-left ${activePolicy === 'terms' ? 'bg-[#9b1c20] text-white' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    Terms and Conditions
                                </button>
                                <button
                                    onClick={() => setActivePolicy('data')}
                                    className={`px-4 py-3 rounded-full transition text-left ${activePolicy === 'data' ? 'bg-[#9b1c20] text-white' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    Data Retention Policy
                                </button>
                                <button
                                    onClick={() => setActivePolicy('disclaimer')}
                                    className={`px-4 py-3 rounded-full transition text-left ${activePolicy === 'disclaimer' ? 'bg-[#9b1c20] text-white' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    Disclaimer & Risk Disclosure
                                </button>
                            </nav>
                            <div className="text-sm text-gray-600 mt-6">
                                <span className="font-semibold">Need help?</span> Call 800 1010 or email <a href="mailto:info@united.co.sz" className="text-[#9b1c20] underline">info@united.co.sz</a>
                            </div>
                        </div>
                    </div>

                    {/* Policy content */}
                    <div className='md:w-8/12 md:border-l md:border-gray-400 md:pl-6'>
                        <div className="py-4">
                            {/* Consumer Protection Policy */}
                            {activePolicy === 'consumer' && (
                                <div className="policy-content">
                                    <h2 className="text-2xl font-semibold mb-4 text-[#9b1c20]">United Holdings Consumer Protection Policy</h2>
                                    <p className="text-gray-600 mb-6">Effective Date: October 09, 2025</p>
                                    
                                    <div className="mb-6">
                                        <p className="mb-4">
                                            United Holdings Limited (&quot;United Holdings,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is dedicated to upholding the highest standards of consumer protection in all our electronic communications and transactions. This Consumer Protection Policy (the cPolicy&quot;) outlines your rights and our commitments when using our website (the "Website"), signing up as a client, accessing the client portal, or engaging with our insurance services. It complies with the Electronic Communications (Consumer Protection) Regulations, 2016 ("Regulations"), the Electronic Communications and Transactions Act, 2022 ("ECTA") Part VIII, and oversight by the Eswatini Communications Commission (ESCCOM) and the Financial Services Regulatory Authority (FSRA).
                                        </p>
                                        
                                        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 mb-6">
                                            <p className="text-sm">
                                                <strong>Note:</strong> While insurance services are partially excluded from certain ECTA consumer protections (Section 28), we voluntarily apply these standards to non-insurance elements (e.g., website navigation, inquiries) and ensure full transparency for all interactions to foster trust.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">1. Our Commitment to Fair Practices</h3>
                                            <p className="mb-3">
                                                We adhere to Regulation 7 of the Regulations, prohibiting misleading, deceptive, or unfair conduct. This means:
                                            </p>
                                            <ul className="list-disc pl-6 space-y-2">
                                                <li>All advertising and communications are truthful, substantiated, and clearly distinguishable from other content (Regulation 8).</li>
                                                <li>We avoid aggressive tactics, false urgency, or unsubstantiated claims about our products or AI features (e.g., conversational quote agents).</li>
                                            </ul>
                                            <p className="mt-3">
                                                In insurance, fair practices prevent mis-selling—a global plague where clients buy unsuitable policies, leading to 30% regret rates. By being upfront, we ensure you get value.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">2. Required Disclosures</h3>
                                            <p className="mb-3">
                                                Before any transaction (e.g., client sign-up), we provide clear, accessible information per Regulation 9-11:
                                            </p>
                                            <ul className="list-disc pl-6 space-y-2">
                                                <li><strong>Supplier Details:</strong> Our trade name (United Holdings Limited), physical address ([Insert Address], Mbabane, Eswatini), contact info (email: info@unitedholdings.co.sz; phone: [Insert Number]), and registrations (e.g., FSRA license).</li>
                                                <li><strong>Service Descriptions:</strong> Detailed overviews of insurance products, including coverage, exclusions, premiums, and how AI agents enhance experiences (e.g., personalized quotes).</li>
                                                <li><strong>Pricing and Terms:</strong> All costs in lilangeni (SZL), itemized (e.g., premiums, fees, taxes). No hidden charges; delivery terms for digital access (immediate for portal).</li>
                                                <li><strong>Payment Methods:</strong> Secure options (e.g., credit card, bank transfer) with error correction prompts.</li>
                                            </ul>
                                            <p className="mt-3">
                                                These disclosures empower you—like reading the fine print on a policy to avoid surprises during claims.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">3. Electronic Contracts and Transactions</h3>
                                            <p className="mb-3">
                                                For sign-ups or purchases, we follow Regulations 10-12 and ECTA Sections 8-15:
                                            </p>
                                            <ul className="list-disc pl-6 space-y-2">
                                                <li>Contracts are valid electronically (e.g., clicking "Accept" as a signature).</li>
                                                <li>You can review, correct errors, and confirm details before completion.</li>
                                                <li>We send prompt confirmations (e.g., email) with full transaction records, retainable for your records.</li>
                                            </ul>
                                            <p className="mt-3">
                                                <strong>Cooling-Off Period:</strong> For non-insurance digital services (e.g., portal subscriptions), a 7-day cooling-off applies (Regulation 13). Cancel without penalty by notifying us; we'll refund promptly. For insurance, standard policy cancellation rules apply, but we honor fair withdrawals.
                                            </p>
                                            <p className="mt-2">
                                                In the industry, cooling-off prevents buyer's remorse—use it wisely to reassess risks.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">4. Payment and Security</h3>
                                            <p className="mb-3">
                                                Payments are handled securely per Regulation 15:
                                            </p>
                                            <ul className="list-disc pl-6 space-y-2">
                                                <li>We use encrypted systems to protect details; no storage of sensitive card info without consent.</li>
                                                <li>Refunds for errors or cancellations processed within [X] days.</li>
                                                <li>If issues arise (e.g., overcharges), contact us for swift correction.</li>
                                            </ul>
                                            <p className="mt-3">
                                                Security is paramount in insurance—data breaches cost firms billions; our measures (detailed in Privacy Policy) keep you safe.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">5. Your Rights as a Consumer</h3>
                                            <p className="mb-3">
                                                You have robust rights under the Regulations and ECTA:
                                            </p>
                                            <ul className="list-disc pl-6 space-y-2">
                                                <li><strong>Access and Correction:</strong> View and update your info via the portal (Data Protection Act Sections 19-20).</li>
                                                <li><strong>Cancellation and Refunds:</strong> As above, plus rights to terminate services with notice.</li>
                                                <li><strong>Non-Discrimination:</strong> Fair treatment regardless of background.</li>
                                                <li><strong>Data Privacy:</strong> See our Privacy Policy for handling personal info.</li>
                                                <li><strong>Complaints:</strong> Submit via our Complaints Policy; we resolve promptly (Regulation 17).</li>
                                            </ul>
                                            <p className="mt-3">
                                                Exercising these rights strengthens the insurer-client bond—empowered clients are loyal ones.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">6. Limitations for Insurance Services</h3>
                                            <p>
                                                While we strive for full protections, insurance is exempt from some ECTA rules (e.g., automatic cancellations for financial products). Refer to policy terms for specifics, and consult FSRA if needed.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">7. Changes to This Policy</h3>
                                            <p>
                                                We may update for legal or service changes; check the Website. Continued use accepts revisions.
                                            </p>
                                        </div>
                                        
                                 
                                    </div>
                                </div>
                            )}
                            
                            {/* Cookie Policy */}
                            {activePolicy === 'cookie' && (
                                <div className="policy-content">
                                    <h2 className="text-2xl font-semibold mb-4 text-[#9b1c20]">United Holdings Cookie Policy</h2>
                                    <p className="text-gray-600 mb-6">Effective Date: October 09, 2025</p>
                                    
                                    <div className="mb-6">
                                        <p className="mb-4">
                                            United Holdings Limited (&quot;United Holdings,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and similar tracking technologies on our website (the &quot;Website&quot;) to enhance user experience, analyze usage, and support our services. This Cookie Policy explains what cookies are, how we use them, and your choices regarding their use. It should be read alongside our Privacy Policy and Terms and Conditions.
                                        </p>
                                        <p>
                                            This Policy complies with the Data Protection Act, 2022 (Act No. 5 of 2022) of the Kingdom of Eswatini, particularly Sections 9 (processing of personal information) and 14 (security measures), as well as the Electronic Communications and Transactions Act, 2022 (ECTA) and the Electronic Communications (Consumer Protection) Regulations, 2016 (Regulation 14 on privacy).
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">1. What Are Cookies?</h3>
                                            <p className="mb-3">
                                                Cookies are small text files placed on your device (computer, smartphone, or tablet) when you visit a website. They store information about your browsing preferences and activities. Similar technologies include web beacons, pixels, and local storage.
                                            </p>
                                            <p className="mb-3">Cookies can be:</p>
                                            <ul className="list-disc pl-6 space-y-2">
                                                <li><strong>Session Cookies:</strong> Temporary and deleted when you close your browser.</li>
                                                <li><strong>Persistent Cookies:</strong> Remain on your device until expired or deleted.</li>
                                                <li><strong>First-Party Cookies:</strong> Set by our Website.</li>
                                                <li><strong>Third-Party Cookies:</strong> Set by external services (e.g., analytics providers).</li>
                                            </ul>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">2. How We Use Cookies</h3>
                                            <p className="mb-4">
                                                We use cookies for the following purposes, ensuring compliance with purpose limitation under Section 12 of the Data Protection Act:
                                            </p>
                                            
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="font-semibold text-lg mb-2">2.1 Essential Cookies</h4>
                                                    <p className="mb-2">These are necessary for the Website to function properly and cannot be disabled. They enable core features like:</p>
                                                    <ul className="list-disc pl-6 space-y-1">
                                                        <li>User authentication for client sign-up and portal access.</li>
                                                        <li>Security measures to protect against unauthorized access.</li>
                                                        <li>Remembering your preferences (e.g., language settings).</li>
                                                    </ul>
                                                    <p className="mt-2">No consent is required for these, as they are essential for service delivery.</p>
                                                </div>
                                                
                                                <div>
                                                    <h4 className="font-semibold text-lg mb-2">2.2 Analytics and Performance Cookies</h4>
                                                    <p className="mb-2">These help us understand how visitors interact with the Website, including:</p>
                                                    <ul className="list-disc pl-6 space-y-1">
                                                        <li>Tracking pages visited, time spent, and referral sources.</li>
                                                        <li>Measuring performance metrics (e.g., load times) to improve mobile-friendliness, as per our product roadmap.</li>
                                                        <li>Anonymized data for statistical purposes, potentially exempt under Section 31 of the Data Protection Act for research.</li>
                                                    </ul>
                                                    <p className="mt-2">We use tools like Google Analytics (or similar), with data processed securely and not shared without safeguards.</p>
                                                </div>
                                                
                                                <div>
                                                    <h4 className="font-semibold text-lg mb-2">2.3 Functionality Cookies</h4>
                                                    <p className="mb-2">These enhance usability, such as:</p>
                                                    <ul className="list-disc pl-6 space-y-1">
                                                        <li>Remembering your login details for easier portal access.</li>
                                                        <li>Personalizing content based on your interactions (e.g., product recommendations).</li>
                                                    </ul>
                                                </div>
                                                
                                                <div>
                                                    <h4 className="font-semibold text-lg mb-2">2.4 Marketing and Targeting Cookies</h4>
                                                    <p className="mb-2">These track your browsing to provide tailored content:</p>
                                                    <ul className="list-disc pl-6 space-y-1">
                                                        <li>Displaying relevant insurance products or offers.</li>
                                                        <li>Supporting AI agents for conversational quotes and inquiries.</li>
                                                        <li>Retargeting ads on third-party sites (if applicable).</li>
                                                    </ul>
                                                    <p className="mt-2">
                                                        Sensitive personal information is not processed via cookies without explicit consent, per Section 22 of the Data Protection Act.
                                                    </p>
                                                    <p className="mt-1">
                                                        Your data from cookies may be used to improve services over time, such as offering better products, while ensuring security (encrypted and backed up per our policies).
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">3. Third-Party Cookies</h3>
                                            <p>
                                                We may use third-party services (e.g., analytics or advertising partners) that set their own cookies. These are subject to their privacy policies, but we ensure they comply with Eswatini data protection laws through contracts (as data processors under Section 15 of the Data Protection Act).
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">4. Your Choices and Consent</h3>
                                            <p className="mb-3">
                                                Upon visiting the Website, we display a cookie banner for consent to non-essential cookies, in line with Regulation 14 of the Consumer Protection Regulations (requiring explicit consent for data collection).
                                            </p>
                                            <ul className="list-disc pl-6 space-y-2">
                                                <li><strong>Manage Preferences:</strong> You can accept all, reject non-essential, or customize via the banner or settings link in the footer.</li>
                                                <li><strong>Browser Settings:</strong> Block or delete cookies through your browser (e.g., Chrome, Firefox). Note: Disabling essential cookies may impair Website functionality.</li>
                                                <li><strong>Opt-Out Tools:</strong> For advertising, use tools like the Digital Advertising Alliance's opt-out page (if applicable globally).</li>
                                                <li><strong>Do Not Track (DNT):</strong> We honor DNT signals where feasible.</li>
                                            </ul>
                                            <p className="mt-3">
                                                Withdrawing consent does not affect prior lawful processing. For data access or deletion related to cookies, refer to our Privacy Policy (Sections 19–20 of the Data Protection Act).
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">5. Security and Retention</h3>
                                            <p className="mb-3">
                                                Cookies containing personal information are secured per Section 14 of the Data Protection Act, with encryption and access controls. We retain cookie data only as needed (e.g., session cookies expire immediately; persistent ones up to 2 years), then delete or anonymize it (Section 13).
                                            </p>
                                            <p>
                                                In case of a breach affecting cookie data, we notify you and ESCCOM under Section 17.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">6. Changes to This Policy</h3>
                                            <p>
                                                We may update this Policy to reflect changes in technology or law. Updates will be posted with the new effective date. Continued use constitutes acceptance.
                                            </p>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                            )}
                            
                            {/* Terms and Conditions */}
                            {activePolicy === 'terms' && (
                                <div className="policy-content">
                                    <h2 className="text-2xl font-semibold mb-4 text-[#9b1c20]">United Holdings Terms and Conditions</h2>
                                    <p className="text-gray-600 mb-6">Effective Date: October 09, 2025</p>
                                    
                                    <div className="mb-6">
                                        <p className="mb-4">
                                            These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the United Holdings Limited (&quot;United Holdings,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) website (the &quot;Website&quot;), including any content, functionality, and services offered on or through the Website, such as user registration, client sign-up, access to the client portal, and related features. By accessing or using the Website, you agree to be bound by these Terms. If you do not agree, please do not use the Website.
                                        </p>
                                        <p>
                                            These Terms are drafted in compliance with applicable Eswatini laws, including the Electronic Communications and Transactions Act, 2022 (&quot;ECTA&quot;), the Electronic Communications (Consumer Protection) Regulations, 2016 (&quot;Consumer Protection Regulations&quot;), the Data Protection Act, 2022, and oversight by the Eswatini Communications Commission (ESCCOM) and the Financial Services Regulatory Authority (FSRA).
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">1. Acceptance of Terms</h3>
                                            <p>
                                                By using the Website, you confirm that you are at least 18 years old or have the legal capacity to enter into contracts under Eswatini law. You agree to these Terms, our Privacy Policy, and any other policies linked on the Website. We may update these Terms from time to time, and continued use constitutes acceptance of changes. We will notify you of material changes via the Website or email.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">2. User Accounts and Registration</h3>
                                            <p className="mb-3">
                                                To access certain features, such as the client portal, you must register an account by providing accurate personal information as requested. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized use.
                                            </p>
                                            <p className="mb-3">
                                                In line with Regulation 12 of the Consumer Protection Regulations, we will provide mechanisms for you to review, correct, and confirm your information before completing registration. Electronic signatures or acceptances (e.g., clicking &quot;I Agree&quot;) are valid under ECTA for forming contracts.
                                            </p>;
                                            <p>
                                                Upon sign-up, you become a client and gain access to your service account information. You may modify your details via the portal, subject to verification.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">3. Use of the Website and Services</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <h4 className="font-semibold">Permitted Use:</h4>
                                                    <p>You may use the Website for personal, non-commercial purposes, such as viewing information, requesting quotes, signing up as a client, and accessing your portal.</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">Prohibited Use:</h4>
                                                    <p>You may not use the Website for unlawful purposes, to transmit harmful content, or to interfere with its operation. This includes no hacking, data mining, or unauthorized access.</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">AI Features:</h4>
                                                    <p>As per our product roadmap, we may use AI agents for conversational quotes, inquiry handling, and sign-up assistance. These are provided &quot;as is,&quot; and you agree to their use for enhancing your experience.</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">Data Usage:</h4>
                                                    <p>Your data may be used to improve services and offer better products, as detailed in our Privacy Policy, in compliance with the Data Protection Act.</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">4. Electronic Contracts and Transactions</h3>
                                            <p className="mb-3">
                                                Under ECTA Sections 8-15, electronic contracts formed via the Website (e.g., client sign-up) are valid and enforceable. We will provide:
                                            </p>
                                            <ul className="list-disc pl-6 space-y-2">
                                                <li>Clear terms distinguishable from advertising (Regulation 10, Consumer Protection Regulations).</li>
                                                <li>Opportunity to review, correct errors, and retain records (Regulation 12).</li>
                                                <li>Prompt confirmation via email or durable medium, including all transaction details (Regulation 12).</li>
                                            </ul>
                                            <p className="mt-3">
                                                For digital services, a 7-day cooling-off period applies under Regulation 13, allowing cancellation without penalty, unless you consent to immediate performance and acknowledge loss of cancellation rights.
                                            </p>
                                            <p className="mt-2">
                                                All costs will be disclosed in lilangeni (SZL), itemized where possible, including any additional fees (Regulation 11).
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">5. Fair Business Practices and Advertising</h3>
                                            <p>
                                                We commit to fair practices under Regulation 7 of the Consumer Protection Regulations, prohibiting misleading conduct, false representations, or unfair tactics. Advertising will be clearly identifiable, and claims substantiated (Regulation 8).
                                            </p>
                                            <p className="mt-2">
                                                Supplier information, including our trade name, address, contacts, and registrations, is provided in the footer and Privacy Policy (Regulation 9).
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">6. Intellectual Property</h3>
                                            <p>
                                                All content on the Website (text, logos, images) is owned by United Holdings or licensed to us and protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without permission.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">7. Privacy and Data Protection</h3>
                                            <p>
                                                Your personal information is handled per our Privacy Policy, incorporating Regulations 14 (Privacy) of the Consumer Protection Regulations and the Data Protection Act. We collect data only with consent or for legitimate purposes, disclose purposes upfront, and delete when no longer needed. Data is secured, encrypted, and backed up as described.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">8. Payment and Security</h3>
                                            <p>
                                                Payments are processed securely via third-party providers. We comply with Regulation 15 (Payment and Security) of the Consumer Protection Regulations, ensuring secure systems and prompt refunds where applicable. You are responsible for any return costs during cooling-off, as notified.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">9. Limitations of Liability and Disclaimers</h3>
                                            <p className="mb-3">
                                                The Website is provided &quot;as is&quot; without warranties. We are not liable for indirect, consequential, or punitive damages arising from use, including data loss or service interruptions, except where prohibited by law.
                                            </p>
                                            <p>
                                                We disclaim liability for third-party links or content. Insurance products are subject to separate policy terms; the Website does not provide financial advice.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">10. Termination and Suspension</h3>
                                            <p>
                                                We may terminate or suspend your access for violations of these Terms, with notice where feasible. Upon termination, your account data may be retained per retention policies.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">11. Complaints and Dispute Resolution</h3>
                                            <p className="mb-3">
                                                Per Regulations 17-29 of the Consumer Protection Regulations, submit complaints via [email/phone]. We will resolve within 5 days or escalate to alternative dispute resolution (ADR) or the ESCCOM Appeals Board. This does not affect your court rights.
                                            </p>
                                            <p>
                                                Contact our complaints officer at: privacy@unitedholdings.co.sz or [phone/address].
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">12. Governing Law</h3>
                                            <p>
                                                These Terms are governed by the laws of the Kingdom of Eswatini. Disputes shall be resolved in Eswatini courts.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">13. Miscellaneous</h3>
                                            <p>
                                                If any provision is invalid, the remainder remains enforceable. These Terms constitute the entire agreement.
                                            </p>
                                        </div>
                                        
                                     
                                    </div>
                                </div>
                            )}
                            
                            {/* Data Retention Policy - This would be similar in structure to the others */}
                            {activePolicy === 'data' && (
                                <div className="policy-content">
                                    <h2 className="text-2xl font-semibold mb-4 text-[#9b1c20]">United Holdings Data Retention and Backup Policy</h2>
                                    <p className="text-gray-600 mb-6">Effective Date: October 09, 2025</p>
                                    
                                    <div className="mb-6">
                                        <p>
                                            United Holdings Limited (&quot;United Holdings,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to managing personal and business data responsibly, in full compliance with the Data Protection Act, 2022 (Act No. 5 of 2022) of the Kingdom of Eswatini, as overseen by the Eswatini Communications Commission (ESCCOM). This Data Retention and Backup Policy outlines how we retain, store, back up, and dispose of data collected through our website, client sign-ups, portal access, and services. It complements our Privacy Policy and ensures data is handled securely while supporting our product roadmap for personalized services and AI-driven improvements.
                                        </p>
                                    </div>
                                    
                                    {/* Continue with the rest of the Data Retention Policy content */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">1. Purpose</h3>
                                            <p className="mb-3">The purpose of this Policy is to:</p>
                                            <ul className="list-disc pl-6 space-y-2">
                                                <li>Ensure data is retained only as long as necessary for legitimate purposes, per Section 13 of the Data Protection Act</li>
                                                <li>Implement secure backup procedures to maintain data integrity and availability</li>
                                                <li>Protect against data loss, support business continuity, and enable clients to access or request deletion of their information</li>
                                                <li>Use retained data ethically to improve services, such as offering tailored insurance products over time</li>
                                            </ul>
                                            <p className="mt-3">
                                                In insurance, retention prevents "data amnesia"—losing historical claims data could invalidate policies or expose us to fraud. Backups are our safety net, ensuring we can recover from incidents.
                                            </p>
                                        </div>
                                        
                                        {/* Continue with other sections as needed */}
                                        
                                      
                                    </div>
                                </div>
                            )}
                            
                            {/* Disclaimer & Risk Disclosure - This would be similar in structure to the others */}
                            {activePolicy === 'disclaimer' && (
                                <div className="policy-content">
                                    <h2 className="text-2xl font-semibold mb-4 text-[#9b1c20]">United Holdings Disclaimer and Risk Disclosure</h2>
                                    <p className="text-gray-600 mb-6">Effective Date: October 09, 2025</p>
                                    
                                    <div className="mb-6">
                                        <p>
                                            United Holdings Limited (&quot;United Holdings,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides this Disclaimer and Risk Disclosure to ensure transparency regarding the information and services on our website (the "Website"), including client sign-ups, portal access, and insurance products. This document complies with the Financial Services Regulatory Authority (FSRA) oversight for insurance disclosures, the Electronic Communications and Transactions Act, 2022 (ECTA) Sections 29-31 (supplier performance and obligations), and the Electronic Communications (Consumer Protection) Regulations, 2016 (fair practices under Regulation 7).
                                        </p>
                                        <p className="mt-3">
                                            By using the Website or our services, you acknowledge these disclaimers and risks. If you do not agree, please do not proceed.
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3 text-[#881a1e]">1. General Disclaimer</h3>
                                            <p className="mb-3">
                                                The information on this Website, including descriptions of insurance products, quotes, and educational content, is provided for general informational purposes only. It is not intended as, and should not be construed as, financial, legal, tax, or insurance advice tailored to your specific circumstances.
                                            </p>
                                            
                                            <div className="space-y-3">
                                                <div>
                                                    <h4 className="font-semibold">No Personalized Advice</h4>
                                                    <p>We do not provide individualized recommendations. Any tools, such as AI agents for quotes or inquiries, generate general outputs based on inputted data. Consult a qualified professional for advice suited to your needs.</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">Accuracy and Completeness</h4>
                                                    <p>While we strive for accuracy, information may contain errors, omissions, or become outdated. We disclaim liability for reliance on such content. In insurance, this is key—policy terms evolve, and site info doesn't replace official documents.</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">Third-Party Content</h4>
                                                    <p>Links to external sites are for convenience; we do not endorse or control them and assume no responsibility for their content or privacy practices.</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">No Guarantees</h4>
                                                    <p>Availability of services or products is subject to change without notice. Quotes are estimates and not binding until a policy is issued.</p>
                                                </div>
                                            </div>
                                            <p className="mt-3">
                                                In the insurance business, disclaimers like this prevent advisory &quot;liability&quot;—where firms get sued for perceived bad advice. Always cross-reference with policy wordings.
                                            </p>
                                        </div>
                                        
                                        {/* Continue with other sections as needed */}
                                        
                                        
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}