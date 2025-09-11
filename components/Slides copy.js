import { MdOutlineFamilyRestroom } from "react-icons/md"
import { FaDove, FaHouseDamage, FaCarCrash, FaFire } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";
import { GiReceiveMoney, GiFlatTire } from "react-icons/gi";
import { TbClock24 } from "react-icons/tb";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoThunderstorm } from "react-icons/io5";

const slidesData = [
  {
    slideTitle1: 'United',
    slideTitle11: 'Life',
    slideTitle2: 'Assurance',
    slideDescription:
      'United Life Assurance, a division of United Holdings, specializes in funeral, personal, and group life insurance.',
    slideUrl: 'https://example.com/united-life-assurance',
    slideImg: '/slide1.jpg',
    slideImgSM: '/slide1SM.png',
    greenIcon: {
      info: 'Family Cover for your loved ones',
      icon: <MdOutlineFamilyRestroom className="inline-block mr-2 text-xl align-middle" aria-label="Family Cover for your loved ones" />
    },
    redIcon: {
      info: 'Funeral Products for your loved ones',
      icon: <FaDove className="inline-block mr-2 text-xl align-middle" aria-label="Funeral Products for your loved ones" />
    },
    whiteIcon: {
      info: 'From as little as 15pm',
      icon: <FaMoneyBills className="inline-block mr-2 text-xl align-middle" aria-label="From as little as 15pm" />
    }
  },
  {
    slideTitle1: 'Having',
    slideTitle11: 'Bad Month?',
    slideTitle2: 'Try Shesha Loans',
    slideDescription:
      'United Pay offers Shesha Loans, a fast and convenient product with access to funds almost immediately for emergency expenses.',
    slideUrl: 'https://example.com/shesha-loans',
    slideImg: '/micro.jpg',
    slideImgSM: '/microSM.jpg',
    greenIcon: {
      info: 'Get a quick loan from E100 - E990',
      icon: <GiReceiveMoney className="inline-block mr-2 text-xl align-middle" aria-label="Get a quick loan from E100 - E990" />
    },
    redIcon: {
      info: 'Available within 24 hours',
      icon: <TbClock24 className="inline-block mr-2 text-xl align-middle" aria-label="Available within 24 hours" />
    },
    whiteIcon: {
      info: 'Payable within 30 days',
      icon: <BsCalendar2DateFill className="inline-block mr-2 text-xl align-middle" aria-label="Payable within 30 days" />
    },
  },
  {
    slideTitle1: 'Secure',
    slideTitle11: 'Your Home',
    slideTitle2: 'with Home Cover',
    slideDescription:
      'This insurance product covers fixed buildings, immovable property, fixtures & fittings, outbuildings, walls, gates, and fences on the same premises.',
    slideUrl: 'https://example.com/home-cover',
    slideImg: '/home.jpg',
    slideImgSM: '/homeSM.jpg',
    greenIcon: {
      info: 'Accidental damage to the house',
      icon: <FaHouseDamage className="inline-block mr-2 text-xl align-middle" aria-label="Accidental damage to the house" />
    },
    redIcon: {
      info: 'Natural Disasters Cover',
      icon: <FaHouseDamage className="inline-block mr-2 text-xl align-middle" aria-label="Natural Disasters Cover" />
    },
    whiteIcon: {
      info: 'Covers houses under SNL',
      icon: <IoThunderstorm className="inline-block mr-2 text-xl align-middle" aria-label="Covers houses under SNL" />
    }
  },
  {
    slideTitle1: 'Affordable',
    slideTitle11: 'Motor',
    slideTitle2: 'Insurance',
    slideDescription:
      'Our motor insurance offers comprehensive coverage, third-party only, or third-party with fire and theft protection for your vehicle.',
    slideUrl: 'https://example.com/motor-insurance',
    slideImg: '/car.jpg',
    slideImgSM: '/CarSM.png',
    greenIcon: {
      info: 'Comprehensive Motor Insurance',
      icon: <FaCarCrash className="inline-block mr-2 text-xl align-middle" aria-label="Comprehensive Motor Insurance" />
    },
    redIcon: {
      info: 'Third-Party Only Insurance',
      icon: <GiFlatTire className="inline-block mr-2 text-xl align-middle" aria-label="Third-Party Only Insurance" />
    },
    whiteIcon: {
      info: 'Third Party, Fire and Theft',
      icon: <FaFire className="inline-block mr-2 text-xl align-middle" aria-label="Third Party, Fire and Theft" />
    }
  },
];

export default slidesData;