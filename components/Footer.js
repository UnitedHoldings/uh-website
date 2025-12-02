"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { trackEvent } from '@/lib/posthog'
import { 
    PiInstagramLogo,
    PiFacebookLogo,
    PiLinkedinLogo,
    PiYoutubeLogo,
    PiMapPin,
    PiPhone,
    PiEnvelope,
    PiHeart,
    PiShieldCheck,
    PiBriefcase,
    PiMoney,
    PiHouse,
    PiUsersThree,
    PiBriefcaseMetal,
    PiImages,
    PiFolderOpen,
    PiFile,
    PiNewspaper,
    PiCar,
    PiUsers,
    PiUser,
    PiScales,
} from 'react-icons/pi'

function Footer() {
  const [footerData, setFooterData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('https://website.api.united.co.sz/api/footer')
        const data = await response.json()
        
        if (data.success) {
          setFooterData(data.data)
        } else {
          setError('Failed to load footer data')
        }
      } catch (err) {
        setError('Error fetching footer data')
        console.error('Error fetching footer data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFooterData()
  }, [])

  // Map icon strings to React components
  const iconMap = {
    PiInstagramLogo: PiInstagramLogo,
    PiFacebookLogo: PiFacebookLogo,
    PiLinkedinLogo: PiLinkedinLogo,
    PiYoutubeLogo: PiYoutubeLogo,
    PiMapPin: PiMapPin,
    PiPhone: PiPhone,
    PiEnvelope: PiEnvelope,
    PiHouse: PiHouse,
    PiUsersThree: PiUsersThree,
    PiBriefcaseMetal: PiBriefcaseMetal,
    PiImages: PiImages,
    PiFile: PiFile,
    PiNewspaper: PiNewspaper,
    PiCar: PiCar,
    PiUsers: PiUsers,
    PiUser: PiUser,
    PiScales: PiScales,
    PiMoney: PiMoney,
  }

  // Loading state
  if (loading) {
    return (
      <footer className="bg-[#9b1c20] text-white">
        <div className="mx-auto px-4 sm:px-6 max-w-[1800px] py-12">
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="mt-2 text-white">Loading footer...</p>
          </div>
        </div>
      </footer>
    )
  }

  // Error state
  if (error || !footerData) {
    return (
      <footer className="bg-[#9b1c20] text-white">
        <div className="mx-auto px-4 sm:px-6 max-w-[1800px] py-12">
          <div className="text-center py-8">
            <p className="text-white">Failed to load footer. Please try again later.</p>
          </div>
        </div>
      </footer>
    )
  }

  // Sort social links by order
  const sortedSocialLinks = [...footerData.socialLinks].sort((a, b) => a.order - b.order)
  
  // Sort navigation sections by id to maintain order
  const sortedNavigationSections = [...footerData.navigationSections].sort((a, b) => {
    const orderMap = {
      company: 1,
      products: 2,
      resources: 3
    }
    return (orderMap[a.id] || 0) - (orderMap[b.id] || 0)
  })

  // Get contact info
  const { address, phone, email } = footerData.contactInfo
  const accentColor = footerData.styling?.accentColor || '#F7941D'
  const backgroundColor = footerData.styling?.backgroundColor || '#9b1c20'

  return (
    <footer 
      className="text-white"
      style={{ 
        backgroundColor: backgroundColor,
        color: footerData.styling?.textColor || '#ffffff'
      }}
    >
      <div className="mx-auto px-4 sm:px-6 max-w-[1800px] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Contact Section */}
          <div className="flex flex-col items-start space-y-6">
            <Link href="/" className="flex items-center gap-2">
              {/* Fallback to local logo if API logo is not available */}
              <Image 
                src="/Logo-white.svg" 
                alt="United Holdings Logo" 
                width={300} 
                height={50}  
                className="hidden lg:block"
              />
              <Image 
                src="/Logo-white.svg" 
                alt="United Holdings Logo" 
                width={150} 
                height={50} 
                className="lg:hidden"
              />
            </Link>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {/* Address */}
              <div className="flex items-center space-x-3">
                <PiMapPin className="w-5 h-5 text-gray-200" />
                <span className="font-semibold text-gray-100">{address?.label || 'Address'}</span>
              </div>
              
              {/* Phone numbers */}
              {phone?.map((phoneItem, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <PiPhone className="w-5 h-5 text-gray-200" />
                  <a 
                    href={phoneItem?.href || `tel:${phoneItem?.number}`} 
                    className="font-semibold hover:underline transition duration-150"
                    style={{ color: accentColor }}
                  >
                    {phoneItem?.label}: {phoneItem?.number}
                  </a>
                </div>
              ))}
              
              {/* Email */}
              <div className="flex items-center space-x-3">
                <PiEnvelope className="w-5 h-5 text-gray-200" />
                <a 
                  href={`mailto:${email?.address}`} 
                  className="font-semibold hover:underline transition duration-150"
                  style={{ color: accentColor }}
                >
                  {email?.address || 'info@united.co.sz'}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-4">
              {sortedSocialLinks.map((social) => {
                const SocialIcon = social.icon && iconMap[social.icon] ? iconMap[social.icon] : null
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition duration-150 ease-in-out"
                    aria-label={social.name}
                    onClick={() => trackEvent('social_media_clicked', {
                      social_media_chosen: social.name,
                      location: 'footer',
                      page_section: 'footer'
                    })}
                  >
                    {SocialIcon && <SocialIcon className="w-5 h-5 text-white" />}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Navigation Sections - dynamically generated */}
          {sortedNavigationSections.map((section) => (
            <div key={section.id}>
              <h3 className="font-bold text-lg text-white mb-6 font-outfit border-b border-white/20 pb-2">
                {section.heading}
              </h3>
              <ul className="font-outfit font-light space-y-3">
                {[...(section.links || [])]
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((item) => {
                    const ItemIcon = item.icon && iconMap[item.icon] ? iconMap[item.icon] : null
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.path}
                          className="flex items-center space-x-3 hover:text-orange-500 transition-colors duration-150 group"
                          style={{ 
                            '--hover-color': accentColor,
                          }}
                          onClick={() => trackEvent('footer_link_clicked', {
                            link_clicked: item.title,
                            link_category: section.heading,
                            destination_path: item.path,
                            page_section: 'footer'
                          })}
                        >
                          {ItemIcon && (
                            <ItemIcon 
                              className="w-4 h-4 text-gray-200 transition-colors group-hover:text-orange-500" 
                              style={{ '--hover-color': accentColor }}
                            />
                          )}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 my-8 pt-6">
          <div className="flex mb-16 flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <p className="text-sm text-gray-200 text-center lg:text-left">
              © {new Date().getFullYear()} United Holdings Eswatini. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer