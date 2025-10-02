import { useState, useRef, useEffect } from "react";
import WaveDividerTop from "./WaveDividerTop";
import HeroBat from "@/assets/Campa_gallery3.jpg";
import Forest from "@/assets/Campa_gallery1.jpg";
import Lake from "@/assets/Campa_gallery2.jpg";
import River from "@/assets/Campa_gallery4.jpg";
import Tent from "@/assets/hero-boat.jpg";

const Information = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      id: 1,
      image: HeroBat,
      title: "Smooth Sailing to TiriTiri Matangi",
      description: "With clear weather and gentle westerly breezes forecasted, we headed out, enjoying stunning views of TiriTiri Matangi directly on the horizon. Along the way, we glimpsed Little Blue Penguins and Gannets diving—nature’s spectacles in motion. Navigating was a breeze with the island just a sighting away, and the water’s clarity made maneuvering between anchored boats and rocky outcrops enjoyable."
    },
    {
      id: 2,
      image: Forest,
      title: "Approaching Hobbs Bay",
      description: "Our camper’s shallow catamaran hull (drawing only 250mm) allowed us to get close to shore and anchor effortlessly. Thanks to tide charts on my phone, we knew the camper could safely stay for about three hours, giving us ample time for a scenic walk to the Lighthouse and back."
    },
    {
      id: 3,
      image: Lake,
      title: "Discovering TiriTiri Matangi",
      description: "This island is a haven for native birdlife and ecological restoration—truly a must-visit. After a refreshing walk, we returned to enjoy local wildlife attractions, like curious Snapper surfacing near the boat while we relaxed with lunch."
    },
    {
      id: 4,
      image: River,
      title: "Overnight at the Bay",
      description: "As evening fell, we moved the boat to a calm, sheltered spot near the shore. Watching the sunset and listening to the dawn chorus was magical—even though we missed the sunrise, the bird sounds more than compensated. "
    },
    {
      id: 5,
      image: Tent,
      title: "Exploring the Island",
      description: "The next morning, we enjoyed breakfast aboard before heading ashore at low tide. A walk through pristine, regenerating native forest along accessible boardwalks revealed incredible birdlife and sweeping Gulf views. We indulged in our picnic lunch, soaking in the tranquility and natural beauty."
    },
    {
      id: 6,
      image: HeroBat,
      title: "Return Journey & Sunset at Shakespeare Bay",
      description: "After a relaxed afternoon, we headed back to Shakespeare Bay, where calm waters and scenic cliffs provided a peaceful anchor spot away from busy day-trippers. With the sun setting, we enjoyed a quiet evening overlooking the water—an unforgettable way to end a perfect trip."
    }
  ];

  const getVisibleCards = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1900) return 5; // xl: 5 cards
      if (window.innerWidth >= 1440) return 4; // lg: 4 cards
      if (window.innerWidth >= 1024) return 3; // md: 3 cards
      if (window.innerWidth > 425) return 2;  // sm: 2 cards
      return 1; // mobile: 1 card
    }
    return 4; // default for SSR
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards);

  // Calculate button positions based on card layout
  const getButtonPositions = () => {
    if (typeof window === 'undefined') return { left: '2rem', right: '2rem' };
    
    const containerPadding = window.innerWidth >= 640 ? 40 : 32; // px-8 sm:px-10 in pixels
    const gap = visibleCards === 1 ? 16 : 
                visibleCards === 2 ? 12 : 
                visibleCards === 3 ? 16 : 
                visibleCards === 4 ? 20 : 16; // gap in pixels
    
    // Calculate card width based on visible cards and gaps
    const availableWidth = window.innerWidth - (containerPadding * 2);
    const totalGapWidth = (visibleCards - 1) * gap;
    const cardWidth = (availableWidth - totalGapWidth) / visibleCards;
    
    // Left button should be at the left edge of the leftmost visible card
    const leftButtonPos = containerPadding;
    
    // Right button should be at the right edge of the rightmost visible card
    const rightButtonPos = containerPadding + (cardWidth * visibleCards) + totalGapWidth;
    
    return {
      left: `${leftButtonPos}px`,
      right: `${window.innerWidth - rightButtonPos}px`
    };
  };

  const maxIndex = Math.max(0, experiences.length - visibleCards);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
  };

  const toggleCardExpansion = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newVisibleCards = getVisibleCards();
      setVisibleCards(newVisibleCards);
      // Reset current index if it's now out of bounds
      const newMaxIndex = Math.max(0, experiences.length - newVisibleCards);
      if (currentIndex > newMaxIndex) {
        setCurrentIndex(0);
      }
      // Force re-render to update button positions
      setCurrentIndex(prev => prev);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, experiences.length]);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 12000); // Slide every 12 seconds

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <>
      <section className="py-8 sm:py-12 md:py-16 bg-background mt-10">
        <div className=" mx-auto px-4">
          {/* Header */}
          <div className="mx-auto mb-8 sm:mb-12 ">
            <p className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
               Experience the Ultimate Water Camping Adventure
            </p>
            <h2 className="mx-auto text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl  font-bold pt-10">
              Murrays Bay to TiriTiri Matangi
            </h2>
          </div>

          {/* Cards Container */}
          <div className="relative px-8 sm:px-10">
            {/* Viewport container - shows only exact number of cards */}
            <div className="overflow-hidden mx-auto" style={{
              width: visibleCards === 1 
                ? 'calc(100% - 0rem)' 
                : visibleCards === 2 
                  ? 'calc(100% - 0.75rem)' 
                  : visibleCards === 3 
                    ? 'calc(100% - 2rem)' 
                    : visibleCards === 4
                      ? 'calc(100% - 3rem)'
                      : 'calc(100% - 3.2rem)'
            }}>
              <div 
                ref={cardsRef}
                className={`flex transition-transform duration-500 ease-in-out ${
                  visibleCards === 1 
                    ? 'gap-4' 
                    : visibleCards === 2 
                      ? 'gap-3' 
                      : visibleCards === 3 
                        ? 'gap-4' 
                        : visibleCards === 4 
                          ? 'gap-5' 
                          : 'gap-4'
                }`}
                style={{ 
                  transform: visibleCards === 1 
                    ? `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 1}rem))` 
                    : `translateX(calc(-${currentIndex * (100 / visibleCards)}% - ${currentIndex * (visibleCards === 2 ? 0.75 : visibleCards === 3 ? 1 : visibleCards === 4 ? 1.25 : 1)}rem))`
                }}
              >
                {experiences.map((experience) => (
                  <div 
                    key={experience.id}
                    className={`flex-none relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${
                      visibleCards === 1 
                        ? 'w-full' 
                        : visibleCards === 2 
                          ? 'w-[calc(50%-0.75rem)]' 
                          : visibleCards === 3 
                            ? 'w-[calc(33.333%-1rem)]' 
                            : visibleCards === 4
                              ? 'w-[calc(25%-1.125rem)]'
                              : 'w-[calc(20%-1.2rem)]'
                    }`}
                    style={{ aspectRatio: '9 / 19' }}
                  >
                    {/* Full Card Background Image */}
                    <div className="absolute inset-0">
                      <img 
                        src={experience.image} 
                        alt={experience.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        style={{ aspectRatio: '9 / 19' }}
                      />
                    </div>
                    
                    {/* Collapsed State - Title Bar at Bottom */}
                    {expandedCard !== experience.id && (
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm text-white p-3 sm:p-4 md:p-5 lg:p-6"
                        style={{
                          transform: 'translateY(0)',
                          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold flex-1 pr-2 truncate">
                            {experience.title}
                          </h3>
                          <button
                            onClick={() => toggleCardExpansion(experience.id)}
                            className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center"
                            style={{
                              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                            aria-label="Expand text"
                          >
                            <svg 
                              className="w-3 h-3 sm:w-4 sm:h-4" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                              style={{
                                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                              }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Expanded State - Full Text Panel */}
                    {expandedCard === experience.id && (
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-sm text-white"
                        style={{
                          transform: 'translateY(0) scale(1)',
                          transformOrigin: 'bottom center',
                          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                          opacity: 1
                        }}
                      >
                        <div 
                          className="p-4 sm:p-6 md:p-8 max-h-[70vh] overflow-y-auto"
                          style={{
                            transform: 'translateY(0)',
                            transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                            transitionDelay: '0.1s'
                          }}
                        >
                          <div 
                            className="flex items-start justify-between mb-4"
                            style={{
                              transform: 'translateY(0)',
                              opacity: 1,
                              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                              transitionDelay: '0.2s'
                            }}
                          >
                            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold pr-4">
                              {experience.title}
                            </h3>
                            <button
                              onClick={() => toggleCardExpansion(experience.id)}
                              className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center"
                              style={{
                                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                transform: 'scale(1)'
                              }}
                              aria-label="Collapse text"
                            >
                              <svg 
                                className="w-4 h-4 sm:w-5 sm:h-5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                style={{
                                  transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                }}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                          <p 
                            className="text-xs sm:text-sm md:text-base leading-relaxed opacity-90"
                            style={{
                              transform: 'translateY(0)',
                              opacity: 0.9,
                              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                              transitionDelay: '0.3s'
                            }}
                          >
                            {experience.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons - positioned at viewport edges */}
            {maxIndex > 0 && (
              <>
                {/* Previous Button - Left edge of viewport */}
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black border-2 border-white rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl flex items-center justify-center transition-all duration-200 z-10"
                  style={{
                    left: typeof window !== 'undefined' && window.innerWidth >= 640 ? '2.5rem' : '2rem',
                    transform: 'translateY(-50%)'
                  }}
                  aria-label="Previous slide"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Next Button - Right edge of viewport */}
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black border-2 border-white rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl flex items-center justify-center transition-all duration-200 z-10"
                  style={{
                    right: typeof window !== 'undefined' && window.innerWidth >= 640 ? '2.5rem' : '2rem',
                    transform: 'translateY(-50%)'
                  }}
                  aria-label="Next slide"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </section>
      
      <div className="relative">
        <WaveDividerTop fill="hsla(202, 84%, 65%, 1.00)" />
      </div>
    </>
  );
};

export default Information;
