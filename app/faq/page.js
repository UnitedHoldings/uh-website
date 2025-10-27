'use client';

import { useState } from 'react';
import { BsChevronUp } from 'react-icons/bs';

export default function FAQ() {
  const [openSections, setOpenSections] = useState({});
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const toggleQuestion = (questionId) => {
    setOpenQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const faqData = [
    {
      id: 'general',
      title: 'General Insurance Questions',
      icon: '📋',
      questions: [
        {
          id: 'gen-1',
          question: 'What types of insurance does United Holdings offer?',
          answer: 'United Holdings offers a comprehensive range of insurance products through our subsidiaries: United General Insurance (motor, home, legal, personal accident), United Life Assurance (funeral covers, credit life, group life), and specialized business insurance (multimark policies, professional indemnity, engineering policies).'
        },
        {
          id: 'gen-2',
          question: 'How do I get a quote for insurance?',
          answer: 'You can get a quote by visiting our website and using our online quote tool, contacting our call center at 2404 8993/4, visiting any of our branches, or speaking with one of our authorized agents. Online quotes are typically instant for most products.'
        },
        {
          id: 'gen-3',
          question: 'What payment methods do you accept?',
          answer: 'We accept various payment methods including debit orders, bank transfers, mobile money, credit cards, and cash payments at our branches. Payment frequency options include monthly, quarterly, semi-annual, and annual payments.'
        },
        {
          id: 'gen-4',
          question: 'Are there discounts for bundling multiple policies?',
          answer: 'Yes, we offer multi-policy discounts when you insure multiple assets or take multiple insurance products with us. Contact our sales team for specific discount information tailored to your needs.'
        }
      ]
    },
    {
      id: 'claims',
      title: 'Claims Process',
      icon: '📄',
      questions: [
        {
          id: 'claim-1',
          question: 'How do I file an insurance claim?',
          answer: 'You can file a claim by: 1) Calling our 24/7 claims hotline at 2404 8993, 2) Visiting any of our branches with your policy documents, 3) Using our online claims portal in the Client Area, or 4) Contacting your insurance advisor directly.'
        },
        {
          id: 'claim-2',
          question: 'What documents do I need to submit a claim?',
          answer: 'Required documents vary by claim type but generally include: completed claim form, policy documents, ID copy, proof of loss/damage (photos, police reports), and any other supporting documentation relevant to your specific claim.'
        },
        {
          id: 'claim-3',
          question: 'How long does the claims process take?',
          answer: 'Simple claims are typically processed within 5-7 working days. More complex claims may take 14-30 working days depending on the required investigations and documentation. We provide regular updates throughout the process.'
        },
        {
          id: 'claim-4',
          question: 'What is the claims satisfaction rate?',
          answer: 'United Holdings maintains a 98% claims satisfaction rate, with most clients praising our efficient processing and supportive claims handling approach.'
        }
      ]
    },
    {
      id: 'proof',
      title: 'Proof of Insurance & Documents',
      icon: '📑',
      questions: [
        {
          id: 'proof-1',
          question: 'How do I get proof of insurance?',
          answer: 'You can download policy schedules and certificates instantly from the Policyholder Client Area after logging in. If you don\'t have online access, contact our support team at info@unitedholdings.co.sz or call 2404 8993/4 and we\'ll email or courier documents after verification.'
        },
        {
          id: 'proof-2',
          question: 'How do I register for the Client Area?',
          answer: 'New users can register using their policy number and ID document at our client portal. If you experience difficulties, contact our support team for immediate assistance with registration.'
        },
        {
          id: 'proof-3',
          question: 'Can I get duplicate policy documents?',
          answer: 'Yes, duplicate documents can be requested through the Client Area or by contacting our support team. A small administrative fee may apply for physical duplicate documents.'
        }
      ]
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      icon: '💳',
      questions: [
        {
          id: 'pay-1',
          question: 'What payment methods are available?',
          answer: 'We accept: Debit orders, EFT/bank transfers, Mobile money (MTN Mobile Money, EziCash), Credit cards (Visa, MasterCard), Cash deposits at our branches, and Salary deductions for corporate clients.'
        },
        {
          id: 'pay-2',
          question: 'Can I change my payment method?',
          answer: 'Yes, you can update your payment method through the Client Area or by completing a payment method change form at any of our branches. Changes typically take effect from your next premium due date.'
        },
        {
          id: 'pay-3',
          question: 'What happens if I miss a payment?',
          answer: 'We provide a 15-day grace period for premium payments. If payment isn\'t received, we\'ll send reminders and may temporarily suspend coverage. Restoring coverage requires payment of outstanding amounts plus any applicable reinstatement fees.'
        },
        {
          id: 'pay-4',
          question: 'Are payment receipts available online?',
          answer: 'Yes, you can view your payment history and download receipts instantly from the Client Area. All receipts from the past 5 years are available in your digital account.'
        }
      ]
    },
    {
      id: 'policies',
      title: 'Policy Management',
      icon: '📊',
      questions: [
        {
          id: 'policy-1',
          question: 'How do I update my policy details?',
          answer: 'Policy updates can be made through the Client Area, by visiting our branches, or by contacting your insurance advisor. Common updates include address changes, vehicle details, beneficiary changes, and coverage adjustments.'
        },
        {
          id: 'policy-2',
          question: 'Can I cancel my policy?',
          answer: 'Yes, policies can be cancelled by submitting a written cancellation request. Refunds are calculated based on the unused portion of your premium, minus any administrative fees and short-period rates as per our cancellation policy.'
        },
        {
          id: 'policy-3',
          question: 'What is the process for policy renewal?',
          answer: 'We send renewal notices 30 days before your policy expiry date. You can renew online through the Client Area, via email, at our branches, or through your insurance advisor. Early renewal discounts are often available.'
        },
        {
          id: 'policy-4',
          question: 'How do I add additional coverage?',
          answer: 'Additional coverage can be added by contacting our sales team. Endorsements are typically processed within 24-48 hours, and premium adjustments are calculated pro-rata based on your policy term.'
        }
      ]
    },
    {
      id: 'support',
      title: 'Customer Support',
      icon: '📞',
      questions: [
        {
          id: 'support-1',
          question: 'What are your contact details and operating hours?',
          answer: 'Head Office: 2404 8993/4 | Branches: Mbabane, Manzini, Siteki, Nhlangano | Email: info@unitedholdings.co.sz | Operating Hours: Mon-Fri 8:00-17:00, Sat 8:00-13:00. Emergency claims line operates 24/7.'
        },
        {
          id: 'support-2',
          question: 'Do you have mobile app support?',
          answer: 'Yes, we have a mobile app available for download on iOS and Android devices. The app allows you to manage policies, submit claims, make payments, and access your insurance documents on the go.'
        },
        {
          id: 'support-3',
          question: 'How do I provide feedback or make a complaint?',
          answer: 'Feedback and complaints can be submitted through: 1) Our website contact form, 2) Email to complaints@unitedholdings.co.sz, 3) Visiting any branch, or 4) Calling our dedicated complaints line. We aim to resolve all complaints within 5 working days.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-outfit">
     <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-31DS0EN7P0"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-31DS0EN7P0');
            `,
          }}
        />
      </Head>
      {/* Header */}
      <div className="bg-[#9b1c20] text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Find answers to common questions about our insurance products, claims process, and customer support.
          </p>
        </div>
      </div>

      {/* Quick Help Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#9b1c20] text-white p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Need Immediate Help?</h3>
                <p className="text-gray-600 text-sm">Contact our support team for urgent assistance</p>
              </div>
            </div>
            <div className="flex gap-4">
              <a
                href="tel:8001010"
                className="bg-[#9b1c20] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#881a1e] transition-colors"
              >
                Call 800 1010
              </a>
              <a
                href="mailto:info@unitedholdings.co.sz"
                className="border border-[#9b1c20] text-[#9b1c20] px-6 py-3 rounded-lg font-semibold hover:bg-[#9b1c20] hover:text-white transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full px-6 py-4 pl-14 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent text-lg"
              onChange={(e) => {
                // Implement search functionality here
                const searchTerm = e.target.value.toLowerCase();
                // You can filter questions based on search term
              }}
            />
            <svg
              className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {faqData.map((section) => (
            <div key={section.id} className="bg-white  border-gray-200 overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-[#9b1c20]">{section.title}</h2>
                    
                  </div>
                </div>
                {openSections[section.id] ? (
                  <BsChevronUp className="w-6 h-6 text-gray-500" />
                ) : (
                  <BsChevronUp className="w-6 h-6 text-gray-500" />
                )}
              </button>

              {/* Questions */}
              {openSections[section.id] && (
                <div className="border-t border-gray-200">
                  {section.questions.map((item) => (
                    <div key={item.id} className="border-b border-gray-100 last:border-b-0">
                      <button
                        onClick={() => toggleQuestion(item.id)}
                        className="w-full px-6 py-4 text-left flex items-start justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg pr-8">{item.question}</h3>
                        </div>
                        {openQuestions[item.id] ? (
                          <BsChevronUp className="w-6 h-6 text-gray-500" />
                        ) : (
                          <BsChevronUp className="w-6 h-6 text-gray-500" />
                        )}
                      </button>
                      {openQuestions[item.id] && (
                        <div className="px-6 pb-4">
                          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

     
      </div>
    </div>
  );
}