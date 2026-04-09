import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * Individual Slide Component - memoized to prevent unnecessary re-renders
 */
const Slide = React.memo(({ slide, isCurrent }) => (
  <div
    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
      isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0'
    }`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500"></div>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
      <span className="px-4 py-1 mb-6 text-xs font-bold text-red-600 bg-white rounded-full uppercase tracking-widest shadow-sm">
        {slide.type || "Latest Update"}
      </span>
      <h2 className="text-3xl md:text-5xl font-black text-white mb-6 drop-shadow-md max-w-4xl leading-tight">
        {slide.title}
      </h2>
      <Link
        to={`/notifications/${slide.slug}`}
        className="px-8 py-3 mt-4 text-sm font-bold text-red-600 bg-white rounded-lg shadow-lg hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300 uppercase tracking-wide"
        aria-label={`Read more about ${slide.title}`} 
      >
  Check Now
</Link>
    </div>
  </div>
));

Slide.displayName = 'Slide';

/**
 * Navigation Buttons Component - memoized
 */
const NavButtons = React.memo(({ onPrev, onNext }) => (
  <>
    <button
      onClick={onPrev}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
      aria-label="Previous slide"
    >
      <FaChevronLeft size={20} />
    </button>
    <button
      onClick={onNext}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
      aria-label="Next slide"
    >
      <FaChevronRight size={20} />
    </button>
  </>
));

NavButtons.displayName = 'NavButtons';

/**
 * Dots Indicator Component - memoized
 */
const DotsIndicator = React.memo(({ slidesCount, currentIndex, onDotClick }) => (
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
    {Array.from({ length: slidesCount }).map((_, index) => (
      <button
        key={index}
        onClick={() => onDotClick(index)}
        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
          index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
        }`}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
));

DotsIndicator.displayName = 'DotsIndicator';

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await api.get('/notifications');
        const latestUpdates = response.data.slice(0, 5);
        setSlides(latestUpdates);
      } catch (error) {
        console.error("Error fetching slides:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  // Auto-slide effect with useCallback to memoize timer management
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Memoize callbacks to prevent unnecessary re-renders of child components
  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const setCurrentSlide = useCallback((index) => {
    setCurrent(index);
  }, []);

  // Memoize slides to prevent unnecessary recalculations
  const memoizedSlides = useMemo(() => slides, [slides]);

  if (loading) return <div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-2xl"></div>;
  if (memoizedSlides.length === 0) return null;

  return (
    <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden rounded-2xl shadow-xl group mb-12">
      {/* Slides */}
      {memoizedSlides.map((slide, index) => (
        <Slide key={slide._id} slide={slide} isCurrent={index === current} />
      ))}

      {/* Navigation */}
      {memoizedSlides.length > 1 && (
        <>
          <NavButtons onPrev={prevSlide} onNext={nextSlide} />
          <DotsIndicator
            slidesCount={memoizedSlides.length}
            currentIndex={current}
            onDotClick={setCurrentSlide}
          />
        </>
      )}
    </div>
  );
};

export default React.memo(HeroSlider);