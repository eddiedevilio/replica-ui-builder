
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const Index = () => {
  useEffect(() => {
    // Smooth scroll to top on page load
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Custom images could be passed to Hero like this:
  // const customImages = [
  //   "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  //   "https://images.unsplash.com/photo-1622597467836-f3e6007c6d24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
  // ];

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      <div className="pt-16 p-6">
        <Hero />
        {/* To use custom images: <Hero images={customImages} /> */}
      </div>
    </main>
  );
};

export default Index;
