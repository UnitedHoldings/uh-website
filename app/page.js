import Agent from '@/components/Agent';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import WhyChooseUs from '@/components/WhyChooseUs';

export default function Home() {
  
  return (
    <div className='flex  flex-col pb-16 lg:space-y-16  '>
      <Hero />
      <Products />
      <Agent />
      <WhyChooseUs />
     
    </div>
  );
}