"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  PiLinkedinLogo,
  PiEnvelope,
  PiPhone,
  PiBuildings,
  PiUser,
  PiCrown,
  PiChartLineUp,
  PiShieldCheck,
  PiMoney,
  PiUsersThree,
  PiGraduationCap,
  PiBriefcase,
  PiTrophy,
  PiStar,
  PiQuotes,
} from 'react-icons/pi';

export default function OurTeam() {
  const [activeDepartment, setActiveDepartment] = useState('leadership');

  const leadershipTeam = [
    {
      id: 1,
      name: "Dr. Michael Dlamini",
      position: "Chief Executive Officer",
      image: "/team/ceo.jpg",
      bio: "With over 20 years in the insurance industry, Dr. Dlamini has been instrumental in United Holdings' growth across Eswatini.",
      experience: "25 years",
      education: "PhD in Business Administration, MBA",
      linkedin: "#",
      email: "m.dlamini@united.co.sz",
      phone: "+268 2508 6001",
      achievements: ["Insurance Leader of the Year 2022", "Top CEO Eswatini 2021"]
    },
    {
      id: 2,
      name: "Mrs. Nomvula Mamba",
      position: "Chief Financial Officer",
      image: "/team/cfo.jpg",
      bio: "Certified Public Accountant with 18 years of financial management experience in the financial services sector.",
      experience: "18 years",
      education: "MSc Finance, CPA",
      linkedin: "#",
      email: "n.mamba@united.co.sz",
      phone: "+268 2508 6002",
      achievements: ["Finance Excellence Award 2023", "Women in Finance Leadership"]
    },
    {
      id: 3,
      name: "Mr. Sipho Nkambule",
      position: "Chief Operations Officer",
      image: "/team/coo.jpg",
      bio: "Operations expert with 15 years experience in streamlining insurance processes and customer service excellence.",
      experience: "15 years",
      education: "MSc Operations Management",
      linkedin: "#",
      email: "s.nkambule@united.co.sz",
      phone: "+268 2508 6003",
      achievements: ["Operational Excellence Award", "Customer Service Innovation"]
    }
  ];

  const departmentHeads = [
    {
      id: 1,
      name: "Ms. Thandi Zwane",
      position: "Head of Life Assurance",
      department: "Life Assurance",
      image: "/team/life-head.jpg",
      bio: "15 years specializing in life products and customer protection strategies.",
      teamSize: 45,
      yearsAtCompany: 8
    },
    {
      id: 2,
      name: "Mr. James Khumalo",
      position: "Head of General Insurance",
      department: "General Insurance",
      image: "/team/general-head.jpg",
      bio: "Expert in risk assessment and insurance product development with 12 years experience.",
      teamSize: 38,
      yearsAtCompany: 6
    },
    {
      id: 3,
      name: "Ms. Lindiwe Dlamini",
      position: "Head of United Pay",
      department: "United Pay",
      image: "/team/pay-head.jpg",
      bio: "Financial services specialist focusing on micro-loans and financial inclusion.",
      teamSize: 28,
      yearsAtCompany: 5
    }
  ];

  const teamStats = [
    { number: "150+", label: "Team Members", icon: PiUsersThree },
    { number: "70%", label: "Eswatini Nationals", icon: PiUser },
    { number: "15", label: "Average Years Experience", icon: PiBriefcase },
    { number: "12", label: "Branches Nationwide", icon: PiBuildings }
  ];

  const values = [
    {
      icon: PiShieldCheck,
      title: "Integrity",
      description: "We maintain the highest ethical standards in all our dealings"
    },
    {
      icon: PiUsersThree,
      title: "Customer First",
      description: "Our customers' needs guide every decision we make"
    },
    {
      icon: PiChartLineUp,
      title: "Innovation",
      description: "Continuously improving our services and products"
    },
    {
      icon: PiStar,
      title: "Excellence",
      description: "Striving for the highest quality in everything we do"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e4a7d] to-[#2c5c8a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Leadership Team</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Meet the dedicated professionals driving United Holdings&apos; mission to protect and empower Eswatini families and businesses
            </p>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-3xl text-[#1e4a7d]" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Executive Leadership</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our experienced leadership team guides United Holdings with vision and expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipTeam.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-[#1e4a7d] rounded-full flex items-center justify-center">
                      <PiCrown className="text-white text-xl" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-[#1e4a7d] font-semibold mb-4">{member.position}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <PiBriefcase className="mr-2 text-[#1e4a7d]" />
                      <span>{member.experience} experience</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <PiGraduationCap className="mr-2 text-[#1e4a7d]" />
                      <span>{member.education}</span>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <a href={member.linkedin} className="text-gray-400 hover:text-[#1e4a7d] transition-colors">
                      <PiLinkedinLogo className="text-xl" />
                    </a>
                    <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-[#1e4a7d] transition-colors">
                      <PiEnvelope className="text-xl" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Heads */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Department Leadership</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized leaders driving excellence across our business units
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departmentHeads.map((head) => (
              <div key={head.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-[#1e4a7d] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {head.department}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{head.name}</h3>
                  <p className="text-[#1e4a7d] font-semibold mb-4">{head.position}</p>
                  <p className="text-gray-600 mb-4">{head.bio}</p>
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <PiUsersThree className="mr-1 text-[#1e4a7d]" />
                      <span>{head.teamSize} team members</span>
                    </div>
                    <div className="flex items-center">
                      <PiTrophy className="mr-1 text-[#1e4a7d]" />
                      <span>{head.yearsAtCompany} years with us</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide our team and our business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-[#1e4a7d] rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1e4a7d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Interested in building your career with United Holdings? Explore opportunities to grow with us.
          </p>
          <Link
            href="/about#careers"
            className="bg-white text-[#1e4a7d] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg inline-block"
          >
            View Career Opportunities
          </Link>
        </div>
      </section>
    </div>
  );
}