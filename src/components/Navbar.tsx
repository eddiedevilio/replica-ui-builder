
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
        scrolled ? 'bg-nectar/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 animate-fade-in"
        >
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <div className="w-4 h-4 rounded-full nectar-gradient" />
          </div>
          <span className="text-white font-display font-semibold text-lg">Nectar Nation</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Our Juices', 'About Us', 'Contact'].map((item, index) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
              className={`nav-link text-white font-medium hover:opacity-90 transition-opacity animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
