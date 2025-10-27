"use client";
import Agent from "@/components/Agent";
import Hero from "@/components/Hero";
import MotionTextStrip from "@/components/MotionTextStrip";
import Products from "@/components/Products";
import SeoHead from "@/components/SEOhead";
import StartQuote from "@/components/Startqoute";
import WhyChooseUs from "@/components/WhyChooseUs";
import { useEffect, useRef, useState, useMemo } from "react";
import { trackEvent, trackPageDuration } from "@/lib/posthog";

// Department colors and mappings
const DEPARTMENT_COLORS = {
  "Life Assurance": "#3d834d", // Green
  "General Insurance": "#286278", // Blue
  Loans: "#f79620", // Orange
};

const SLIDE_DEPARTMENTS = {
  life: "Life Assurance",
  general: "General Insurance",
  loans: "Loans",
};

const TAB_CONFIG = [
  { name: "Life Assurance", slideId: "life", shortName: "Life" },
  { name: "General Insurance", slideId: "general", shortName: "General" },
  { name: "Loans", slideId: "loans", shortName: "Loans" },
];

const slidesData = [
  {
    id: "life",
    image: "/slide1.jpg",
    imageSM: "/slide1-SM.jpg",
    title1: "United",
    title11: "Life",
    title2: "Assurance",
    description:
      "Protect your loved ones with comprehensive life insurance coverage. From funeral plans to family protection, we have you covered.",
    button: "Learn More",
    url: "https://united.co.sz/life-assurance",
  },
  {
    id: "general",
    image: "/home.jpg",
    imageSM: "/homeSM.jpg",
    title1: "United",
    title11: "General",
    title2: "Insurance",
    description:
      "Comprehensive insurance solutions for your home, motor, and business. Get protected against unexpected events and losses.",
    button: "Get Covered",
    url: "https://united.co.sz/general-insurance",
  },
  {
    id: "loans",
    image: "/micro.jpg",
    imageSM: "/microSM.jpg",
    title1: "United",
    title11: "Loans",
    title2: "Solutions",
    description:
      "We know mid-month crisis is not easy to get over, Umlamleli is there boost you need to get through the month. Umlamleli provides loans from E1, 000.00 – E5,000.00 payable within 3 months.",
    button: "Apply Now",
    url: "https://united.co.sz/loans",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
  const tabCount = TAB_CONFIG.length;

  // Track page duration
  useEffect(() => {
    const stopTracking = trackPageDuration("home_page");
    return () => stopTracking();
  }, []);

  // Use useMemo to prevent recreation of arrays on every render
  const slideMap = useMemo(
    () =>
      TAB_CONFIG.map((tab) =>
        slidesData.findIndex((slide) => slide.id === tab.slideId)
      ),
    [] // Empty dependency array since TAB_CONFIG and slidesData are static
  );

  const tabMap = useMemo(
    () =>
      slidesData.map((slide) =>
        TAB_CONFIG.findIndex((tab) => tab.slideId === slide.id)
      ),
    [] // Empty dependency array since TAB_CONFIG and slidesData are static
  );

  // Get current department color
  const getCurrentDepartmentColor = () => {
    const currentSlideData = slidesData[currentSlide];
    const department = SLIDE_DEPARTMENTS[currentSlideData.id];
    return DEPARTMENT_COLORS[department];
  };

  // Get tab color
  const getTabColor = (tabIndex) => {
    const slideId = TAB_CONFIG[tabIndex].slideId;
    const department = SLIDE_DEPARTMENTS[slideId];
    return DEPARTMENT_COLORS[department];
  };

  // Start the interval when component mounts
  useEffect(() => {
    startInterval();

    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setActiveTab((prev) => {
        const nextTab = (prev + 1) % tabCount;
        const nextSlide = slideMap[nextTab];
        setCurrentSlide(nextSlide);
        return nextTab;
      });
    }, 6000);
  };

  // Sync active tab when currentSlide changes (from carousel interaction)
  useEffect(() => {
    const correspondingTab = tabMap[currentSlide];
    if (correspondingTab !== undefined && correspondingTab !== activeTab) {
      setActiveTab(correspondingTab);
    }
  }, [currentSlide, activeTab, tabMap]); // Now tabMap is stable

  const handleTabClick = (index) => {
    const newSlide = slideMap[index];
    const companyName = TAB_CONFIG[index].name;

    trackEvent("three_pill_navigation_clicked", {
      company_chosen: companyName,
      tab_index: index,
      location: "home_page_hero",
    });

    setActiveTab(index);
    setCurrentSlide(newSlide);
    resetInterval();
  };

  // Handle manual carousel navigation
  const handleCarouselChange = (index) => {
    setCurrentSlide(index);
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startInterval();
  };

  const currentColor = getCurrentDepartmentColor();

  return (
    <>
      <SeoHead
        title="United Holdings | Insurance & Financial Solutions"
        description="United Holdings provides trusted insurance and financial solutions tailored for Eswatini and Southern Africa. Get quotes, manage policies, and connect with our team."
        keywords="United Holdings, Insurance Eswatini, Financial Services, Life Cover, Car Insurance, Business Insurance, Fintech Eswatini"
        image="/logo.png"
        url="https://www.unitedholdings.co.sz"
      />

      <div className="flex flex-col pb-16 lg:space-y-16">
        <div className="relative lg:px-2  mb-4 lg:mb-8 flex flex-col items-center">
          <Hero
            currentSlide={currentSlide}
            setCurrentSlide={handleCarouselChange}
          />

          {/* Tab Navigation */}
          <div className="w-full  ">
            <div className="absolute z-30 lg:bottom-[-4%] bottom-[-5%] w-full flex">
              <div className="mx-auto">
                <ul
                  className="bg-gray-100 p-2 flex h-14 drop--lg rounded-full relative border-2"
                  style={{ borderColor: currentColor }}
                >
                  {/* Animated highlight bar */}
                  <div
                    className="absolute h-9 rounded-full transition-all duration-500 ease-in-out top-2"
                    style={{
                      width: `calc(${100 / tabCount}% - 8px)`,
                      transform: `translateX(calc(${activeTab * 100}% + 4px))`,
                      backgroundColor: currentColor,
                    }}
                  />

                  {/* Tabs */}
                  {TAB_CONFIG.map((tab, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer relative z-10 flex-1 flex items-center justify-center py-1 font-bold lg:text-lg px-4 rounded-full transition-all duration-300 ease-in-out ${
                        index === activeTab
                          ? "text-white"
                          : "hover:bg-opacity-10"
                      }`}
                      style={{
                        color:
                          index === activeTab ? "white" : getTabColor(index),
                        backgroundColor:
                          index === activeTab ? "transparent" : "transparent",
                        minWidth: "100px",
                      }}
                      onClick={() => handleTabClick(index)}
                    >
                      <span className="text-center whitespace-nowrap">
                        {/* Show full name on large screens, short name on small screens */}
                        <span className="">{tab.shortName}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <StartQuote />
        <Products />

        <Agent />
        <WhyChooseUs />
      </div>
    </>
  );
}
