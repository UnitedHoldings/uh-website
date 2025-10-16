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
  IoExpandOutline
} from "react-icons/io5";

// Gallery data with categories
const galleryData = [
  {
    id: 1,
    category: "events",
    company: "UGI",
    title: "Annual Awards Ceremony 2024",
    description: "Celebrating outstanding performance and dedication at our annual awards ceremony in Manzini.",
    date: "2024-01-20",
    location: "Manzini HQ",
    images: [
      {
        id: 1,
        src: "/images/gallery/awards-1.jpg",
        alt: "Team receiving awards",
        featured: true
      },
      {
        id: 2,
        src: "/images/gallery/awards-2.jpg",
        alt: "CEO presenting award",
        featured: false
      },
      {
        id: 3,
        src: "/images/gallery/awards-3.jpg",
        alt: "Group photo of winners",
        featured: false
      }
    ]
  },
  {
    id: 2,
    category: "offices",
    company: "UGI",
    title: "Mbabane Branch Office",
    description: "Our modern Mbabane branch offering comprehensive insurance services to the community.",
    date: "2024-01-15",
    location: "Mbabane",
    images: [
      {
        id: 1,
        src: "/images/gallery/mbabane-office-1.jpg",
        alt: "Mbabane office exterior",
        featured: true
      },
      {
        id: 2,
        src: "/images/gallery/mbabane-office-2.jpg",
        alt: "Customer service area",
        featured: false
      },
      {
        id: 3,
        src: "/images/gallery/mbabane-office-3.jpg",
        alt: "Meeting room",
        featured: false
      }
    ]
  },
  {
    id: 3,
    category: "community",
    company: "ULA",
    title: "Tinkhundla Funeral Cover Launch",
    description: "Launching our affordable funeral cover program in partnership with Tinkhundla communities.",
    date: "2024-01-10",
    location: "Siteki",
    images: [
      {
        id: 1,
        src: "/images/gallery/tinkhundla-1.jpg",
        alt: "Community gathering",
        featured: true
      },
      {
        id: 2,
        src: "/images/gallery/tinkhundla-2.jpg",
        alt: "Signing ceremony",
        featured: false
      },
      {
        id: 3,
        src: "/images/gallery/tinkhundla-3.jpg",
        alt: "Community members",
        featured: false
      }
    ]
  },
  {
    id: 4,
    category: "team",
    company: "UP",
    title: "United Pay Team Building",
    description: "Our United Pay team participating in strategic planning and team building activities.",
    date: "2024-01-08",
    location: "Ezulwini",
    images: [
      {
        id: 1,
        src: "/images/gallery/team-up-1.jpg",
        alt: "Team building exercise",
        featured: true
      },
      {
        id: 2,
        src: "/images/gallery/team-up-2.jpg",
        alt: "Group discussion",
        featured: false
      },
      {
        id: 3,
        src: "/images/gallery/team-up-3.jpg",
        alt: "Strategy session",
        featured: false
      }
    ]
  },
  {
    id: 5,
    category: "events",
    company: "ULA",
    title: "Financial Literacy Workshop",
    description: "Educating community members about financial planning and life assurance benefits.",
    date: "2024-01-05",
    location: "Nhlangano",
    images: [
      {
        id: 1,
        src: "/images/gallery/workshop-1.jpg",
        alt: "Workshop participants",
        featured: true
      },
      {
        id: 2,
        src: "/images/gallery/workshop-2.jpg",
        alt: "Presentation session",
        featured: false
      },
      {
        id: 3,
        src: "/images/gallery/workshop-3.jpg",
        alt: "Group activity",
        featured: false
      }
    ]
  },
  {
    id: 6,
    category: "offices",
    company: "ULA",
    title: "Manzini Headquarters",
    description: "The central hub for United Life Assurance operations and customer service.",
    date: "2024-01-03",
    location: "Manzini HQ",
    images: [
      {
        id: 1,
        src: "/images/gallery/manzini-hq-1.jpg",
        alt: "Headquarters building",
        featured: true
      },
      {
        id: 2,
        src: "/images/gallery/manzini-hq-2.jpg",
        alt: "Reception area",
        featured: false
      },
      {
        id: 3,
        src: "/images/gallery/manzini-hq-3.jpg",
        alt: "Operations center",
        featured: false
      }
    ]
  },
  {
    id: 7,
    category: "community",
    company: "UGI",
    title: "Road Safety Campaign",
    description: "Promoting road safety awareness and responsible driving in partnership with local authorities.",
    date: "2023-12-15",
    location: "Mbabane",
    images: [
      {
        id: 1,
        src: "/images/gallery/roadsafety-1.jpg",
        alt: "Road safety demonstration",
        featured: true
      },
      {
        id: 2,
        src: "/images/gallery/roadsafety-2.jpg",
        alt: "Community engagement",
        featured: false
      },
      {
        id: 3,
        src: "/images/gallery/roadsafety-3.jpg",
        alt: "Safety equipment display",
        featured: false
      }
    ]
  },
  {
    id: 8,
    category: "team",
    company: "UGI",
    title: "Insurance Training Program",
    description: "Professional development session for our insurance agents and sales team.",
    date: "2023-12-10",
    location: "Manzini HQ",
    images: [
      {
        id: 1,
        src: "/images/gallery/training-1.jpg",
        alt: "Training session",
        featured: true
      },
      {
        id: 2,
        src: "/images/gallery/training-2.jpg",
        alt: "Group learning",
        featured: false
      },
      {
        id: 3,
        src: "/images/gallery/training-3.jpg",
        alt: "Certificate ceremony",
        featured: false
      }
    ]
  }
];

// Company colors and information
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
  }
};

// Category icons
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

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeCompany, setActiveCompany] = useState("all");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Filter albums based on selected category and company
  const filteredAlbums = galleryData.filter(album => {
    const categoryMatch = activeCategory === "all" || album.category === activeCategory;
    const companyMatch = activeCompany === "all" || album.company === activeCompany;
    return categoryMatch && companyMatch;
  });

  // Get unique categories and companies for filters
  const categories = ["all", ...new Set(galleryData.map(album => album.category))];
  const companies = ["all", ...new Set(galleryData.map(album => album.company))];

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-[#9b1c20] via-[#3d834d] to-[#f79620]">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="text-center">
            <IoImagesOutline className="text-6xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Capturing moments that define the United Group journey
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Explore Our Moments</h2>
            <div className="flex gap-2 text-sm">
              <span className="text-gray-600">{filteredAlbums.length} albums</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{galleryData.reduce((total, album) => total + album.images.length, 0)} photos</span>
            </div>
          </div>

          {/* Category Filters */}
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

          {/* Company Filters */}
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
                          : COMPANY_INFO[company].bgColor + ' text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {company === 'all' ? 'All Companies' : COMPANY_INFO[company].name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Album Grid */}
        {!selectedAlbum ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAlbums.map(album => {
              const featuredImage = album.images.find(img => img.featured) || album.images[0];
              const CompanyIcon = getCategoryIcon(album.category);
              
              return (
                <div
                  key={album.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => openAlbum(album)}
                >
                  {/* Album Cover */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <IoImagesOutline className="text-4xl text-gray-400" />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                    
                    {/* Company Badge */}
                    <div 
                      className="absolute top-3 left-3 px-2 py-1 rounded-full text-white text-xs font-semibold"
                      style={{ backgroundColor: COMPANY_INFO[album.company].color }}
                    >
                      {album.company}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(album.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <IoHeartOutline 
                        className={`text-lg ${
                          favorites.includes(album.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                        }`}
                      />
                    </button>

                    {/* Image Count */}
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                      {album.images.length} photos
                    </div>
                  </div>

                  {/* Album Info */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CompanyIcon className="text-gray-400" />
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
                      <span>{new Date(album.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Album Detail View */
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                      style={{ backgroundColor: COMPANY_INFO[selectedAlbum.company].color }}
                    >
                      {COMPANY_INFO[selectedAlbum.company].name}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {(() => {
                        const CategoryIcon = getCategoryIcon(selectedAlbum.category);
                        return <CategoryIcon />;
                      })()}
                      <span className="capitalize">{selectedAlbum.category}</span>
                    </div>
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
                      <span>{new Date(selectedAlbum.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFavorite(selectedAlbum.id)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <IoHeartOutline 
                      className={`${
                        favorites.includes(selectedAlbum.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                      }`}
                    />
                    <span>Favorite</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <IoShareSocialOutline />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Album Images */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedAlbum.images.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-100 aspect-square"
                    onClick={() => openImageModal(image, index)}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <IoImagesOutline className="text-4xl text-gray-400" />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                    <div className="absolute bottom-3 right-3 p-2 bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <IoExpandOutline />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedImage && selectedAlbum && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
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
            <div className="relative">
              <div className="w-full h-96 md:h-[600px] bg-gray-800 flex items-center justify-center">
                <IoImagesOutline className="text-6xl text-gray-600" />
              </div>
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">
                  {selectedImage.alt}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">
                    {currentImageIndex + 1} of {selectedAlbum.images.length}
                  </span>
                  <button className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                    <IoDownloadOutline />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredAlbums.length === 0 && (
        <div className="text-center py-12">
          <IoImagesOutline className="text-6xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No albums found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters to see more content.
          </p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setActiveCompany("all");
            }}
            className="px-6 py-3 bg-[#9b1c20] text-white rounded-lg hover:bg-[#881a1e] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}