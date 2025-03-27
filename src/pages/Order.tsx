
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import OrderForm from '../components/OrderForm';

const Order = () => {
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
        <div className="min-h-screen w-full nectar-gradient rounded-3xl overflow-hidden relative flex items-center justify-center">
          <div className="absolute w-full h-full bg-nectar-light/20 mix-blend-overlay"></div>
          <Navbar />
          <OrderForm />
        </div>
      </div>
    </main>
  );
};

export default Order;
