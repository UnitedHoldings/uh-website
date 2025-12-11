"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  IoImagesOutline,
  IoBusinessOutline,
  IoPeopleOutline,
  IoCalendarOutline,
  IoLocationOutline,
  IoHeartOutline,
  IoShareSocialOutline,
  IoCloseOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoDownloadOutline,
  IoExpandOutline,
  IoBookmarkOutline,
  IoBookmark
} from "react-icons/io5";
import { trackPageDuration } from '@/lib/posthog';

// Company information
const COMPANY_INFO = {
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
  },
  Group: {
    name: "United Group",
    color: "#1e3a8a",
    bgColor: "bg-[#1e3a8a]"
  }
};

// Category icons mapping from API
const CATEGORY_ICONS = {
  events: IoCalendarOutline,
  offices: IoBusinessOutline,
  team: IoPeopleOutline,
  community: IoHeartOutline
};

// Helper function to get category icon
const getCategoryIcon = (category) => {
  return CATEGORY_ICONS[category] || IoImagesOutline;
};

// Fallback data
const FALLBACK_DATA = {
  success: true,
  data: {
    pageConfig: {
      heroData: {
        title: "Our Gallery",
        subtitle: "Capturing moments that define the United Group journey"
      }
    },
    albums: [
      {
        _id: "fallback-1",
        title: "United Group Gallery",
        description: "Explore our latest events and activities",
        category: "events",
        company: "Group",
        location: "Various Locations",
        date: new Date().toISOString().split('T')[0],
        images: [
          {
            image: {
              asset: {
                url: "/images/placeholder.jpg"
              }
            },
            alt: "United Group Activities",
            caption: "Our team in action",
            featured: true,
            order: 1
          }
        ],
        featured: true
      }
    ],
    categories: [
      {
        slug: "events",
        name: "Events",
        icon: "IoCalendarOutline",
        description: "Company events and special occasions"
      }
    ]
  }
};

export default function GalleryPage() {
  const [galleryData, setGalleryData] = useState({
    albums: [],
    categories: [],
    pageConfig: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeCompany, setActiveCompany] = useState("all");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [view, setView] = useState("grid");

  // Fetch data from API
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/gallery');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setGalleryData({
            albums: data.data.albums || [],
            categories: data.data.categories || [],
            pageConfig: data.data.pageConfig || null
          });
        } else {
          throw new Error(data.message || 'Failed to load gallery data');
        }
      } catch (err) {
      
        setError(err.message);
        // Use fallback data
        setGalleryData({
          albums: FALLBACK_DATA.data.albums,
          categories: FALLBACK_DATA.data.categories,
          pageConfig: FALLBACK_DATA.data.pageConfig
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  // Track page duration
  useEffect(() => {
    const stopTracking = trackPageDuration('about_gallery');
    return () => stopTracking();
  }, []);

  // Filter albums based on selected category and company
  const filteredAlbums = galleryData.albums.filter(album => {
    const categoryMatch = activeCategory === "all" || album.category === activeCategory;
    const companyMatch = activeCompany === "all" || album.company === activeCompany;
    return categoryMatch && companyMatch;
  });

  // Get unique categories and companies for filters
  const categories = ["all", ...new Set(galleryData.albums.map(album => album.category).filter(Boolean))];
  const companies = ["all", ...new Set(galleryData.albums.map(album => album.company).filter(Boolean))];

  // Open album view
  const openAlbum = (album) => {
    setSelectedAlbum(album);
    setSelectedImage(album.images[0]);
    setCurrentImageIndex(0);
  };

  // Close album view
  const closeAlbum = () => {
    setSelectedAlbum(null);
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  // Open image in modal
  const openImageModal = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  // Close image modal
  const closeImageModal = () => {
    setIsModalOpen(false);
  };

  // Navigate to next image
  const nextImage = () => {
    if (selectedAlbum) {
      const nextIndex = (currentImageIndex + 1) % selectedAlbum.images.length;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(selectedAlbum.images[nextIndex]);
    }
  };

  // Navigate to previous image
  const prevImage = () => {
    if (selectedAlbum) {
      const prevIndex = (currentImageIndex - 1 + selectedAlbum.images.length) % selectedAlbum.images.length;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(selectedAlbum.images[prevIndex]);
    }
  };

  // Toggle favorite
  const toggleFavorite = (albumId) => {
    if (favorites.includes(albumId)) {
      setFavorites(favorites.filter(id => id !== albumId));
    } else {
      setFavorites([...favorites, albumId]);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) {
        if (e.key === 'Escape') closeImageModal();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentImageIndex, selectedAlbum]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9b1c20] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-[#9b1c20] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <IoImagesOutline className="text-6xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {galleryData.pageConfig?.heroData?.title || "Our Gallery"}
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              {galleryData.pageConfig?.heroData?.subtitle || "Capturing moments that define the United Group journey"}
            </p>
          </div>
        </div>
        
        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-current text-white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-current text-white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-current text-white"></path>
          </svg>
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

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Explore Our Moments</h2>
            <div className="flex gap-2 text-sm">
              <span className="text-gray-600">{filteredAlbums.length} albums</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">
                {galleryData.albums.reduce((total, album) => total + album.images.length, 0)} photos
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView("grid")}
                className={`px-3 py-1 rounded-md transition-colors ${
                  view === "grid" ? "bg-white" : "text-gray-600"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setView("list")}
                className={`px-3 py-1 rounded-md transition-colors ${
                  view === "list" ? "bg-white" : "text-gray-600"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Category:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => {
                  const IconComponent = category === "all" ? IoImagesOutline : getCategoryIcon(category);
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        activeCategory === category
                          ? 'bg-[#9b1c20] text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      <IconComponent className="text-lg" />
                      <span className="capitalize">{category}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Company:</span>
              <div className="flex flex-wrap gap-2">
                {companies.map(company => (
                  <button
                    key={company}
                    onClick={() => setActiveCompany(company)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      activeCompany === company
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
          </div>
        </div>

        {/* Album Grid */}
        {!selectedAlbum ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredAlbums.map(album => {
              const featuredImage = album.images.find(img => img.featured) || album.images[0];
              const CategoryIcon = getCategoryIcon(album.category);
              
              return (
                <div
                  key={album._id}
                  className="bg-white rounded-2xl overflow-hidden cursor-pointer group border border-gray-200"
                  onClick={() => openAlbum(album)}
                >
                  {/* Album Cover */}
                  <div className="relative h-56 overflow-hidden">
                    {featuredImage?.image?.asset?.url ? (
                      <Image
                        src={featuredImage.image.asset.url}
                        alt={featuredImage.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <IoImagesOutline className="text-4xl text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                    
                    {/* Company Badge */}
                    <div 
                      className="absolute top-3 left-3 px-2 py-1 rounded-full text-white text-xs font-semibold"
                      style={{ backgroundColor: COMPANY_INFO[album.company]?.color || '#9b1c20' }}
                    >
                      {album.company}
                    </div>

                    {/* Featured Badge */}
                    {album.featured && (
                      <div className="absolute top-3 right-3 px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                        Featured
                      </div>
                    )}

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(album._id);
                      }}
                      className="absolute top-12 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      {favorites.includes(album._id) ? (
                        <IoBookmark className="text-yellow-500 text-sm" />
                      ) : (
                        <IoBookmarkOutline className="text-gray-600 text-sm" />
                      )}
                    </button>

                    {/* Image Count */}
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                      {album.images.length} photos
                    </div>
                  </div>

                  {/* Album Info */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CategoryIcon className="text-gray-400" />
                      <span className="text-sm text-gray-500 capitalize">{album.category}</span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {album.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {album.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <IoLocationOutline />
                        <span>{album.location}</span>
                      </div>
                      <span>{formatDate(album.date)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Album Detail View */
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
            {/* Album Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <button
                    onClick={closeAlbum}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                  >
                    <IoChevronBackOutline />
                    <span>Back to Gallery</span>
                  </button>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                      style={{ backgroundColor: COMPANY_INFO[selectedAlbum.company]?.color || '#9b1c20' }}
                    >
                      {COMPANY_INFO[selectedAlbum.company]?.name || selectedAlbum.company}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {(() => {
                        const CategoryIcon = getCategoryIcon(selectedAlbum.category);
                        return <CategoryIcon />;
                      })()}
                      <span className="capitalize">{selectedAlbum.category}</span>
                    </div>
                    {selectedAlbum.featured && (
                      <div className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedAlbum.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4">
                    {selectedAlbum.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <IoLocationOutline />
                      <span>{selectedAlbum.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoCalendarOutline />
                      <span>{formatDate(selectedAlbum.date)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFavorite(selectedAlbum._id)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {favorites.includes(selectedAlbum._id) ? (
                      <IoBookmark className="text-yellow-500" />
                    ) : (
                      <IoBookmarkOutline className="text-gray-600" />
                    )}
                    <span>Favorite</span>
                  </button>
             
                </div>
              </div>
            </div>

            {/* Album Images */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedAlbum.images.map((image, index) => (
                  <div
                    key={image.order || index}
                    className="relative group cursor-pointer rounded-xl overflow-hidden bg-gray-100 aspect-square border border-gray-200"
                    onClick={() => openImageModal(image, index)}
                  >
                    {image.image?.asset?.url ? (
                      <Image
                        src={image.image.asset.url}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <IoImagesOutline className="text-4xl text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                    {image.featured && (
                      <div className="absolute top-3 left-3 px-2 py-1 bg-[#9b1c20] text-white text-xs font-semibold rounded-full">
                        Featured
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white text-sm font-medium truncate">{image.caption}</p>
                    </div>
                    <div className="absolute bottom-3 right-3 p-2 bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <IoExpandOutline />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {isModalOpen && selectedImage && selectedAlbum && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-7xl max-h-full w-full">
              {/* Close Button */}
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <IoCloseOutline className="text-2xl" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <IoChevronBackOutline className="text-2xl" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <IoChevronForwardOutline className="text-2xl" />
              </button>

              {/* Image */}
              <div className="relative flex justify-center items-center h-full">
                {selectedImage.image?.asset?.url ? (
                  <div className="relative w-full max-w-4xl max-h-full">
                    <Image
                      src={selectedImage.image.asset.url}
                      alt={selectedImage.alt}
                      width={3000}
                      height={2000}
                      className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="w-full h-96 md:h-[600px] bg-gray-800 flex items-center justify-center rounded-lg">
                    <IoImagesOutline className="text-6xl text-gray-600" />
                  </div>
                )}
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">
                    {selectedImage.alt}
                  </h3>
                  {selectedImage.caption && (
                    <p className="text-sm text-gray-300 mb-2">
                      {selectedImage.caption}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">
                      {currentImageIndex + 1} of {selectedAlbum.images.length}
                    </span>
                   
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredAlbums.length === 0 && (
          <div className="text-center py-16">
            <IoImagesOutline className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No albums found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn&apos;t find any albums matching your criteria. Try adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setActiveCompany("all");
              }}
              className="px-8 py-3 bg-gradient-to-r from-[#9b1c20] to-[#3d834d] text-white rounded-xl font-semibold hover:from-[#881a1e] hover:to-[#2d6b3d] transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}