
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Default images if none are provided via props
const defaultImages = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/640px-PNG_transparency_demonstration_1.png",
  "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  "https://images.unsplash.com/photo-1622597467836-f3e6007c6d24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
];

interface HeroProps {
  images?: string[];
}

const Hero = ({ images = defaultImages }: HeroProps) => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Animation for initial container appearance
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (imageContainerRef.current) {
          imageContainerRef.current.classList.add('opacity-100', 'transition-opacity', 'duration-700');
        }
      }
    }, {
      threshold: 0.1
    });
    
    if (imageContainerRef.current) {
      observer.observe(imageContainerRef.current);
    }
    
    return () => {
      if (imageContainerRef.current) {
        observer.unobserve(imageContainerRef.current);
      }
    };
  }, []);

  // Carousel effect to change photos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [images.length]);

  return <div className="min-h-screen w-full nectar-gradient rounded-3xl overflow-hidden relative flex items-center justify-center">
      <div className="absolute w-full h-full bg-nectar-light/20 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-6 py-12 z-10 flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 relative animate-fade-in" style={{
        animationDelay: '300ms',
        animationFillMode: 'forwards'
      }}>
          <div 
            ref={imageContainerRef}
            className="relative overflow-hidden opacity-100" 
            style={{ maxWidth: '600px', height: '400px' }}
          >
            {images.map((src, index) => (
              <img 
                key={index}
                src={src}
                alt={`Fruit Fusion Juice ${index + 1}`}
                className={`w-full h-auto transition-all duration-1000 ease-in-out absolute top-0 left-0 ${
                  currentImageIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                style={{
                  maxWidth: '600px',
                  transform: currentImageIndex === index ? 'scale(1)' : 'scale(1.05)',
                }}
              />
            ))}
          </div>
          
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-leaf/10 rounded-full animate-float"></div>
          <div className="absolute top-1/4 -right-10 w-16 h-16 bg-nectar-light/20 rounded-full animate-float" style={{
          animationDelay: '1s'
        }}></div>
        </div>
        
        <div className="w-full lg:w-1/2 text-left lg:pl-12">
          <div className="opacity-0 animate-fade-in" style={{
          animationDelay: '400ms',
          animationFillMode: 'forwards'
        }}>
            <span className="text-brown/80 font-display font-medium tracking-wider text-sm uppercase mb-2 block">Nature's Nectar</span>
            
            <h1 className="text-brown font-display font-bold text-5xl md:text-7xl leading-tight mb-6">
              FRUIT<br />FUSION
            </h1>
            
            <div className="w-24 h-1 bg-nectar mb-6"></div>
            
            <p className="text-brown/80 mb-8 max-w-md">
              Indulge in the natural goodness of fresh apples and oranges with our signature apple orange juice. Our juices are hand-pressed and made with the finest ingredients, ensuring a pure and delicious taste with every sip. Quench your thirst with a touch of sweetness and refreshment.
            </p>
            
            <div className="flex gap-4">
              <Link to="/about" className="button-hover px-8 py-3 border border-brown/30 text-brown font-medium rounded-full transition-all hover:bg-white/30">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default Hero;
