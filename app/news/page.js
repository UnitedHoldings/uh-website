"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  IoNewspaperOutline,
  IoCalendarOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoShareSocialOutline,
  IoBookmarkOutline,
  IoBookmark,
  IoChevronForwardOutline,
  IoSearchOutline,
  IoFilterOutline,
  IoPlayOutline,
  IoImageOutline
} from "react-icons/io5";

// Mock news data
const newsData = [
  {
    id: 1,
    title: "United Group Announces Record Growth in 2024",
    excerpt: "The United Group of Companies reports unprecedented growth across all three subsidiaries, with a 35% increase in combined revenue.",
    content: `
      <p>The United Group of Companies, comprising United General Insurance (UGI), United Life Assurance (ULA), and United Pay (UP), has announced record-breaking financial results for the 2024 fiscal year. The group achieved a combined revenue growth of 35% compared to the previous year, marking one of the most successful periods in its 80-year history.</p>
      
      <p>Key highlights from the announcement include:</p>
      
      <ul>
        <li>United General Insurance saw a 28% increase in policy subscriptions</li>
        <li>United Life Assurance expanded its funeral cover reach by 45%</li>
        <li>United Pay disbursed over E50 million in micro-loans</li>
        <li>Combined customer base grew to over 75,000 clients</li>
      </ul>
      
      <p>CEO Dr. Mandla Dlamini attributed the success to the group's commitment to innovation and customer-centric services. "Our focus on digital transformation and community engagement has positioned us for sustained growth in the evolving Eswatini market," he stated.</p>
    `,
    category: "Corporate",
    company: "Group",
    author: "Sarah Mamba",
    date: "2024-01-20",
    readTime: "3 min read",
    image: "/images/news/record-growth.jpg",
    featured: true,
    tags: ["Financial Results", "Growth", "Corporate"]
  },
  {
    id: 2,
    title: "United Pay Launches New Digital Loan Platform",
    excerpt: "United Pay introduces a revolutionary mobile app for instant loan applications and approvals, making financial services more accessible.",
    content: `
      <p>United Pay has launched a groundbreaking digital platform that revolutionizes how Eswatini residents access financial services. The new mobile application allows customers to apply for micro-loans, track applications, and receive approvals within hours.</p>
      
      <p>The platform features:</p>
      
      <ul>
        <li>Instant loan application processing</li>
        <li>Real-time application tracking</li>
        <li>Digital document submission</li>
        <li>Secure online payments</li>
        <li>24/7 customer support</li>
      </ul>
      
      <p>"This digital transformation represents our commitment to making financial services accessible to every Emaswati," said United Pay Managing Director, James Kunene. "We're eliminating barriers and streamlining the borrowing process."</p>
      
      <p>The app is available for download on both Android and iOS platforms, with special introductory offers for early adopters.</p>
    `,
    category: "Innovation",
    company: "UP",
    author: "David Dlamini",
    date: "2024-01-18",
    readTime: "4 min read",
    image: "/images/news/digital-platform.jpg",
    featured: true,
    tags: ["Digital", "Technology", "Loans"]
  },
  {
    id: 3,
    title: "Tinkhundla Funeral Cover Reaches 10,000 Members",
    excerpt: "United Life Assurance's affordable funeral cover program achieves a major milestone, providing protection to thousands of families.",
    content: `
      <p>United Life Assurance's Tinkhundla Funeral Cover program has reached a significant milestone, enrolling over 10,000 members across Eswatini's communities. The E11 per month coverage plan has become a vital safety net for families seeking affordable funeral protection.</p>
      
      <p>The program's success highlights:</p>
      
      <ul>
        <li>10,234 active members enrolled</li>
        <li>Coverage extended to 45 Tinkhundla regions</li>
        <li>E5.9 million in claims paid to date</li>
        <li>98% customer satisfaction rate</li>
      </ul>
      
      <p>"This achievement demonstrates our commitment to making life assurance accessible to all Emaswati," said ULA Director, Nomvula Maseko. "We're proud to provide financial security during difficult times."</p>
      
      <p>The program continues to expand, with plans to reach 15,000 members by mid-2024.</p>
    `,
    category: "Community",
    company: "ULA",
    author: "Lindiwe Shongwe",
    date: "2024-01-15",
    readTime: "3 min read",
    image: "/images/news/tinkhundla-milestone.jpg",
    featured: false,
    tags: ["Funeral Cover", "Community", "Milestone"]
  },
  {
    id: 4,
    title: "UGI Introduces Comprehensive Cyber Insurance",
    excerpt: "United General Insurance launches specialized cyber insurance coverage to protect businesses from digital threats.",
    content: `
      <p>In response to growing digital threats, United General Insurance has introduced comprehensive cyber insurance coverage for businesses in Eswatini. The new product addresses the increasing risk of cyber attacks and data breaches faced by local enterprises.</p>
      
      <p>The cyber insurance coverage includes:</p>
      
      <ul>
        <li>Data breach response and recovery</li>
        <li>Business interruption coverage</li>
        <li>Cyber extortion protection</li>
        <li>Digital asset restoration</li>
        <li>Legal and regulatory support</li>
      </ul>
      
      <p>"As businesses digitize, they face new vulnerabilities," explained UGI Product Manager, Thabo Nkosi. "Our cyber insurance provides the safety net companies need to innovate with confidence."</p>
      
      <p>The product is available for businesses of all sizes, with customizable coverage options based on specific risk profiles.</p>
    `,
    category: "Products",
    company: "UGI",
    author: "Michael Dube",
    date: "2024-01-12",
    readTime: "5 min read",
    image: "/images/news/cyber-insurance.jpg",
    featured: false,
    tags: ["Cyber Insurance", "Business", "Innovation"]
  },
  {
    id: 5,
    title: "United Group Wins Corporate Social Responsibility Award",
    excerpt: "The United Group recognized for outstanding community engagement and corporate social responsibility initiatives.",
    content: `
      <p>The United Group has been honored with the prestigious Eswatini Corporate Social Responsibility Award for 2024, recognizing the company's exceptional commitment to community development and social impact.</p>
      
      <p>Key initiatives that contributed to the award include:</p>
      
      <ul>
        <li>Financial literacy programs reaching 5,000+ students</li>
        <li>Small business support and mentorship</li>
        <li>Disaster relief and community support</li>
        <li>Environmental sustainability projects</li>
        <li>Employee volunteer programs</li>
      </ul>
      
      <p>"This award reflects our belief that businesses have a responsibility to contribute positively to society," said Group CSR Manager, Zanele Mamba. "We're committed to creating shared value for all our stakeholders."</p>
      
      <p>The award ceremony was attended by government officials, business leaders, and community representatives.</p>
    `,
    category: "Awards",
    company: "Group",
    author: "Sarah Mamba",
    date: "2024-01-10",
    readTime: "4 min read",
    image: "/images/news/csr-award.jpg",
    featured: false,
    tags: ["Award", "CSR", "Community"]
  },
  {
    id: 6,
    title: "Road Safety Campaign Reaches 20 Schools Nationwide",
    excerpt: "United General Insurance's road safety initiative educates thousands of students about responsible driving.",
    content: `
      <p>United General Insurance's comprehensive road safety campaign has successfully reached 20 schools across Eswatini, educating over 5,000 students about responsible driving and road safety practices.</p>
      
      <p>The campaign features:</p>
      
      <ul>
        <li>Interactive safety demonstrations</li>
        <li>Defensive driving workshops</li>
        <li>Road sign recognition activities</li>
        <li>Simulated driving experiences</li>
        <li>Safety equipment distribution</li>
      </ul>
      
      <p>"Investing in road safety education is investing in our future," said UGI Marketing Director, Peter Vilakati. "We're building a culture of safety among young drivers."</p>
      
      <p>The program has received support from the Ministry of Education and the Royal Eswatini Police Service.</p>
    `,
    category: "Community",
    company: "UGI",
    author: "David Dlamini",
    date: "2024-01-08",
    readTime: "3 min read",
    image: "/images/news/road-safety.jpg",
    featured: false,
    tags: ["Road Safety", "Education", "Community"]
  },
  {
    id: 7,
    title: "United Life Assurance Expands Group Life Coverage",
    excerpt: "Enhanced group life insurance products now available for businesses of all sizes with flexible premium options.",
    content: `
      <p>United Life Assurance has expanded its group life insurance offerings, introducing new coverage options and flexible premium structures designed for businesses of all sizes in Eswatini.</p>
      
      <p>The enhanced products include:</p>
      
      <ul>
        <li>Customizable coverage tiers</li>
        <li>Flexible payment options</li>
        <li>Extended family coverage</li>
        <li>Critical illness benefits</li>
        <li>Digital administration portal</li>
      </ul>
      
      <p>"We understand that every business has unique needs," explained ULA Product Development Manager, Nomsa Dlamini. "Our expanded offerings provide the flexibility employers need to protect their teams effectively."</p>
      
      <p>The new products are available immediately, with special introductory rates for new corporate clients.</p>
    `,
    category: "Products",
    company: "ULA",
    author: "Lindiwe Shongwe",
    date: "2024-01-05",
    readTime: "4 min read",
    image: "/images/news/group-life.jpg",
    featured: false,
    tags: ["Group Life", "Business", "Insurance"]
  },
  {
    id: 8,
    title: "United Pay Partners with Local Retailers",
    excerpt: "New partnership program allows United Pay customers to access loans directly through participating retail stores.",
    content: `
      <p>United Pay has launched an innovative partnership program with major retail chains across Eswatini, enabling customers to apply for and access micro-loans directly through participating stores.</p>
      
      <p>The partnership benefits include:</p>
      
      <ul>
        <li>Instant loan applications at partner stores</li>
        <li>Same-day approval and disbursement</li>
        <li>Special interest rates for retail purchases</li>
        <li>Integrated payment systems</li>
        <li>Extended repayment terms</li>
      </ul>
      
      <p>"This partnership makes financial services more accessible and convenient," said United Pay Partnerships Manager, Sipho Mthembu. "Customers can now access funds exactly when and where they need them."</p>
      
      <p>Initial partners include major supermarkets, furniture stores, and electronics retailers across all regions.</p>
    `,
    category: "Partnerships",
    company: "UP",
    author: "Michael Dube",
    date: "2024-01-03",
    readTime: "3 min read",
    image: "/images/news/retail-partnership.jpg",
    featured: false,
    tags: ["Partnership", "Retail", "Loans"]
  }
];

// Company information
const COMPANY_INFO = {
  Group: {
    name: "United Group",
    color: "#9b1c20",
    bgColor: "bg-[#9b1c20]"
  },
  UGI: {
    name: "United General Insurance",
    color: "#9b1c20",
    bgColor: "bg-[#9b1c20]"
  },
  ULA: {
    name: "United Life Assurance",
    color: "#3d834d",
    bgColor: "bg-[#3d834d]"
  },
  UP: {
    name: "United Pay",
    color: "#f79620",
    bgColor: "bg-[#f79620]"
  }
};

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [view, setView] = useState("grid"); // 'grid' or 'list'

  // Get featured articles (first two featured ones)
  const featuredArticles = newsData.filter(article => article.featured).slice(0, 2);

  // Filter articles based on active filter and search term
  const filteredArticles = newsData.filter(article => {
    const companyMatch = activeFilter === "all" || article.company === activeFilter;
    const searchMatch = searchTerm === "" || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return companyMatch && searchMatch;
  });

  // Get unique companies for filters
  const companies = ["all", ...new Set(newsData.map(article => article.company))];

  // Toggle save article
  const toggleSaveArticle = (articleId) => {
    if (savedArticles.includes(articleId)) {
      setSavedArticles(savedArticles.filter(id => id !== articleId));
    } else {
      setSavedArticles([...savedArticles, articleId]);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Open article detail
  const openArticle = (article) => {
    setSelectedArticle(article);
    window.scrollTo(0, 0);
  };

  // Close article detail
  const closeArticle = () => {
    setSelectedArticle(null);
  };

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Article Detail View */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button
            onClick={closeArticle}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <IoChevronForwardOutline className="transform rotate-180" />
            <span>Back to News</span>
          </button>

          {/* Article Header */}
          <div className="bg-white rounded-lg -lg overflow-hidden">
            {/* Article Image */}
            <div className="relative h-96 bg-gradient-to-br from-gray-200 to-gray-300">
              <div className="w-full h-full flex items-center justify-center">
                <IoImageOutline className="text-6xl text-gray-400" />
              </div>
              <div 
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold"
                style={{ backgroundColor: COMPANY_INFO[selectedArticle.company].color }}
              >
                {COMPANY_INFO[selectedArticle.company].name}
              </div>
            </div>

            {/* Article Content */}
            <div className="p-8">
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <IoCalendarOutline />
                  <span>{formatDate(selectedArticle.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <IoTimeOutline />
                  <span>{selectedArticle.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <IoPersonOutline />
                  <span>By {selectedArticle.author}</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {selectedArticle.title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedArticle.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div 
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />

              {/* Article Actions */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleSaveArticle(selectedArticle.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                  >
                    {savedArticles.includes(selectedArticle.id) ? (
                      <IoBookmark className="text-yellow-500" />
                    ) : (
                      <IoBookmarkOutline />
                    )}
                    <span>{savedArticles.includes(selectedArticle.id) ? 'Saved' : 'Save Article'}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <IoShareSocialOutline />
                    <span>Share</span>
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  Published on {formatDate(selectedArticle.date)}
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsData
                .filter(article => 
                  article.id !== selectedArticle.id && 
                  (article.company === selectedArticle.company || article.category === selectedArticle.category)
                )
                .slice(0, 2)
                .map(article => (
                  <div
                    key={article.id}
                    className="bg-white rounded-lg -md overflow-hidden cursor-pointer hover:-lg transition-"
                    onClick={() => openArticle(article)}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span 
                          className="px-2 py-1 rounded-full text-white text-xs font-semibold"
                          style={{ backgroundColor: COMPANY_INFO[article.company].color }}
                        >
                          {article.company}
                        </span>
                        <span className="text-xs text-gray-500">{article.readTime}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#9b1c20] to-[#3d834d] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <IoNewspaperOutline className="text-6xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Updates</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Stay informed with the latest news, announcements, and insights from United Group
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map(article => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg -lg overflow-hidden cursor-pointer group hover:-xl transition-all duration-300"
                  onClick={() => openArticle(article)}
                >
                  <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300">
                    <div className="w-full h-full flex items-center justify-center">
                      <IoImageOutline className="text-4xl text-gray-400" />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div 
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold"
                      style={{ backgroundColor: COMPANY_INFO[article.company].color }}
                    >
                      {COMPANY_INFO[article.company].name}
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-black/70 text-white px-2 py-1 rounded text-sm">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <IoCalendarOutline />
                        <span>{formatDate(article.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IoTimeOutline />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#9b1c20] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {article.author}</span>
                      <button className="text-[#9b1c20] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More
                        <IoChevronForwardOutline />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    view === "grid" ? "bg-white -sm" : "text-gray-600"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    view === "list" ? "bg-white -sm" : "text-gray-600"
                  }`}
                >
                  List
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
                />
                <IoSearchOutline className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Company Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {companies.map(company => (
              <button
                key={company}
                onClick={() => setActiveFilter(company)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeFilter === company
                    ? company === 'all' 
                      ? 'bg-gray-800 text-white'
                      : COMPANY_INFO[company].bgColor + ' text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {company === 'all' ? 'All Companies' : COMPANY_INFO[company].name}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid/List */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <IoNewspaperOutline className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters to see more content.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveFilter("all");
              }}
              className="px-6 py-3 bg-[#9b1c20] text-white rounded-lg hover:bg-[#881a1e] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : view === "grid" ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <div
                key={article.id}
                className="bg-white rounded-lg -md overflow-hidden cursor-pointer group hover:-lg transition-all duration-300"
                onClick={() => openArticle(article)}
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
                  <div className="w-full h-full flex items-center justify-center">
                    <IoImageOutline className="text-3xl text-gray-400" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div 
                    className="absolute top-3 left-3 px-2 py-1 rounded-full text-white text-xs font-semibold"
                    style={{ backgroundColor: COMPANY_INFO[article.company].color }}
                  >
                    {article.company}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveArticle(article.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    {savedArticles.includes(article.id) ? (
                      <IoBookmark className="text-yellow-500 text-sm" />
                    ) : (
                      <IoBookmarkOutline className="text-gray-600 text-sm" />
                    )}
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <IoCalendarOutline />
                      <span>{formatDate(article.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoTimeOutline />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#9b1c20] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">By {article.author}</span>
                    <button className="text-xs text-[#9b1c20] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read
                      <IoChevronForwardOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-6">
            {filteredArticles.map(article => (
              <div
                key={article.id}
                className="bg-white rounded-lg -md overflow-hidden cursor-pointer group hover:-lg transition-all duration-300"
                onClick={() => openArticle(article)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 h-48 md:h-auto bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0 relative">
                    <div className="w-full h-full flex items-center justify-center">
                      <IoImageOutline className="text-3xl text-gray-400" />
                    </div>
                    <div 
                      className="absolute top-3 left-3 px-2 py-1 rounded-full text-white text-xs font-semibold"
                      style={{ backgroundColor: COMPANY_INFO[article.company].color }}
                    >
                      {article.company}
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <IoCalendarOutline />
                        <span>{formatDate(article.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IoTimeOutline />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IoPersonOutline />
                        <span>By {article.author}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#9b1c20] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <button className="text-[#9b1c20] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More
                        <IoChevronForwardOutline />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredArticles.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-[#9b1c20] text-[#9b1c20] rounded-lg font-semibold hover:bg-[#9b1c20] hover:text-white transition-colors">
              Load More Articles
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <IoNewspaperOutline className="text-4xl text-[#9b1c20] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter and never miss important updates from United Group.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
            />
            <button className="px-6 py-3 bg-[#9b1c20] text-white rounded-lg font-semibold hover:bg-[#881a1e] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}