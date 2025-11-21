"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
  IoImageOutline
} from "react-icons/io5";

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

// Fallback data
const FALLBACK_DATA = {
  success: true,
  data: {
    pageConfig: {
      heroData: {
        title: "News & Updates",
        subtitle: "Stay informed with the latest news, announcements, and insights from United Group"
      },
      newsletterData: {
        title: "Stay Updated",
        description: "Subscribe to our newsletter and never miss important updates from United Group.",
        buttonText: "Subscribe",
        placeholder: "Enter your email"
      }
    },
    articles: [
      {
        _id: "fallback-1",
        title: "United Group - Latest Updates",
        excerpt: "Stay tuned for the latest news and announcements from United Group.",
        content: "<p>Check back soon for the latest updates from United Group and its subsidiaries.</p>",
        category: "Corporate",
        company: "Group",
        author: "United Group",
        publishDate: new Date().toISOString().split('T')[0],
        readTime: "2 min read",
        featured: true
      }
    ],
    categories: []
  }
};

export default function NewsPage() {
  const [newsData, setNewsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageConfig, setPageConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [view, setView] = useState("grid");

  // Fetch data from API
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the local API route
        const response = await fetch('/api/news');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setNewsData(data.data.articles || []);
          setCategories(data.data.categories || []);
          setPageConfig(data.data.pageConfig || null);
        } else {
          throw new Error(data.message || 'Failed to load news data');
        }
      } catch (err) {
        console.error('Error fetching news data:', err);
        setError(err.message);
        // Use fallback data
        setNewsData(FALLBACK_DATA.data.articles);
        setCategories(FALLBACK_DATA.data.categories);
        setPageConfig(FALLBACK_DATA.data.pageConfig);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  // Get featured articles from API data
  const featuredArticles = newsData.filter(article => article.featured).slice(0, 2);

  // Filter articles based on active filter and search term
  const filteredArticles = newsData.filter(article => {
    const companyMatch = activeFilter === "all" || article.company === activeFilter;
    const searchMatch = searchTerm === "" || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    return companyMatch && searchMatch;
  });

  // Get unique companies for filters
  const companies = ["all", ...new Set(newsData.map(article => article.company).filter(Boolean))];

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9b1c20] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={closeArticle}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <IoChevronForwardOutline className="transform rotate-180" />
            <span>Back to News</span>
          </button>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-96 bg-gradient-to-br from-gray-200 to-gray-300">
              {selectedArticle.image?.asset?.url ? (
                <Image
                  src={selectedArticle.image.asset.url}
                  alt={selectedArticle.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <IoImageOutline className="text-6xl text-gray-400" />
                </div>
              )}
              <div 
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold"
                style={{ backgroundColor: COMPANY_INFO[selectedArticle.company]?.color || '#9b1c20' }}
              >
                {COMPANY_INFO[selectedArticle.company]?.name || selectedArticle.company}
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <IoCalendarOutline />
                  <span>{formatDate(selectedArticle.publishDate)}</span>
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

              {selectedArticle.tags && selectedArticle.tags.length > 0 && (
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
              )}

              <div 
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
               
                <div className="text-sm text-gray-500">
                  Published on {formatDate(selectedArticle.publishDate)}
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
                  article._id !== selectedArticle._id && 
                  (article.company === selectedArticle.company || article.category === selectedArticle.category)
                )
                .slice(0, 2)
                .map(article => (
                  <div
                    key={article._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openArticle(article)}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span 
                          className="px-2 py-1 rounded-full text-white text-xs font-semibold"
                          style={{ backgroundColor: COMPANY_INFO[article.company]?.color || '#9b1c20' }}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {pageConfig?.heroData?.title || "News & Updates"}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              {pageConfig?.heroData?.subtitle || "Stay informed with the latest news, announcements, and insights from United Group"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              Using fallback data: {error}
            </p>
          </div>
        )}

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map(article => (
                <div
                  key={article._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
                  onClick={() => openArticle(article)}
                >
                  <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300">
                    {article.image?.asset?.url ? (
                      <Image
                        src={article.image.asset.url}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <IoImageOutline className="text-4xl text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div 
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold"
                      style={{ backgroundColor: COMPANY_INFO[article.company]?.color || '#9b1c20' }}
                    >
                      {COMPANY_INFO[article.company]?.name || article.company}
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
                        <span>{formatDate(article.publishDate)}</span>
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
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    view === "grid" ? "bg-white shadow-sm" : "text-gray-600"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    view === "list" ? "bg-white shadow-sm" : "text-gray-600"
                  }`}
                >
                  List
                </button>
              </div>

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

          <div className="flex flex-wrap gap-2 mb-6">
            {companies.map(company => (
              <button
                key={company}
                onClick={() => setActiveFilter(company)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeFilter === company
                    ? company === 'all' 
                      ? 'bg-gray-800 text-white'
                      : (COMPANY_INFO[company]?.bgColor || 'bg-[#9b1c20]') + ' text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {company === 'all' ? 'All Companies' : (COMPANY_INFO[company]?.name || company)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <div
                key={article._id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
                onClick={() => openArticle(article)}
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
                  {article.image?.asset?.url ? (
                    <Image
                      src={article.image.asset.url}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <IoImageOutline className="text-3xl text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div 
                    className="absolute top-3 left-3 px-2 py-1 rounded-full text-white text-xs font-semibold"
                    style={{ backgroundColor: COMPANY_INFO[article.company]?.color || '#9b1c20' }}
                  >
                    {article.company}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveArticle(article._id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    {savedArticles.includes(article._id) ? (
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
                      <span>{formatDate(article.publishDate)}</span>
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
          <div className="space-y-6">
            {filteredArticles.map(article => (
              <div
                key={article._id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
                onClick={() => openArticle(article)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 h-48 md:h-auto bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0 relative">
                    {article.image?.asset?.url ? (
                      <Image
                        src={article.image.asset.url}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <IoImageOutline className="text-3xl text-gray-400" />
                      </div>
                    )}
                    <div 
                      className="absolute top-3 left-3 px-2 py-1 rounded-full text-white text-xs font-semibold"
                      style={{ backgroundColor: COMPANY_INFO[article.company]?.color || '#9b1c20' }}
                    >
                      {article.company}
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <IoCalendarOutline />
                        <span>{formatDate(article.publishDate)}</span>
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
                      {article.tags && article.tags.length > 0 && (
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
                      )}
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {pageConfig?.newsletterData?.title || "Stay Updated"}
          </h2>
          <p className="text-gray-600 mb-6">
            {pageConfig?.newsletterData?.description || "Subscribe to our newsletter and never miss important updates from United Group."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={pageConfig?.newsletterData?.placeholder || "Enter your email"}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b1c20] focus:border-transparent"
            />
            <button className="px-6 py-3 bg-[#9b1c20] text-white rounded-lg font-semibold hover:bg-[#881a1e] transition-colors">
              {pageConfig?.newsletterData?.buttonText || "Subscribe"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}