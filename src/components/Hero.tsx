
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (imageRef.current) {
            imageRef.current.classList.add('animate-fade-in');
          }
        }
      },
      { threshold: 0.1 }
    );
    
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen w-full nectar-gradient rounded-3xl overflow-hidden relative flex items-center justify-center">
      <div className="absolute w-full h-full bg-nectar-light/20 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-6 py-12 z-10 flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 relative opacity-0 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
          <img 
            ref={imageRef}
            src="/lovable-uploads/6b318e29-26dd-4565-a25b-b201908eb946.png" 
            alt="Fruit Fusion Juice" 
            className="w-full h-auto opacity-0"
            style={{ maxWidth: '600px' }}
          />
          
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-leaf/10 rounded-full animate-float"></div>
          <div className="absolute top-1/4 -right-10 w-16 h-16 bg-nectar-light/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="w-full lg:w-1/2 text-left lg:pl-12">
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <span className="text-brown/80 font-display font-medium tracking-wider text-sm uppercase mb-2 block">Nature's Nectar</span>
            
            <h1 className="text-brown font-display font-bold text-5xl md:text-7xl leading-tight mb-6">
              FRUIT<br />FUSION
            </h1>
            
            <div className="w-24 h-1 bg-nectar mb-6"></div>
            
            <p className="text-brown/80 mb-8 max-w-md">
              Indulge in the natural goodness of fresh apples and oranges with our signature apple orange juice. Our juices are hand-pressed and made with the finest ingredients, ensuring a pure and delicious taste with every sip. Quench your thirst with a touch of sweetness and refreshment.
            </p>
            
            <div className="flex gap-4">
              <Link 
                to="/about"
                className="button-hover px-8 py-3 border border-brown/30 text-brown font-medium rounded-full transition-all hover:bg-white/30"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
