
import { useEffect } from 'react';
import Hero from '../components/Hero';

const Index = () => {
  useEffect(() => {
    // Smooth scroll to top on page load
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <div className="pt-16 p-6">
        <Hero />
      </div>
    </main>
  );
};

export default Index;
