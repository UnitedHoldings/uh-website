import Agent from '@/components/Agent';
import Products from '@/components/Products';
import Slider from '@/components/Slider';
import WhyChooseUs from '@/components/WhyChooseUs';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  
  return (
    <div className='flex  flex-col space-y-10 '>
      <Slider />
      <Products />
      <Agent />
      <WhyChooseUs />
     
    </div>
  );
}