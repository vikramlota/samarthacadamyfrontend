import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { FaChevronLeft, FaChevronRight, FaTrophy } from 'react-icons/fa';

const SelectionSlider = () => {
  const [selections, setSelections] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchSelections = async () => {
      try {
        // Fetching from your results endpoint
        const response = await api.get('/results'); 
        const data = response.data.data || response.data;
        setSelections(data);
      } catch (error) {
        console.error("Error fetching selections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSelections();
  }, []);

  // Functions to scroll the slider left and right
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  if (loading || selections.length === 0) return null;

  return (
    <div className="w-full py-12">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8 px-4 md:px-0">
        <div>
          <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <FaTrophy className="text-yellow-500" /> 
            Hall of Fame
          </h2>
          <p className="text-gray-500 mt-2 font-medium">Our proud Samarth Academy achievers.</p>
        </div>
        
        {/* Navigation Arrows */}
        <div className="hidden md:flex gap-2">
          <button 
            onClick={scrollLeft} 
            className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow-sm"
          >
            <FaChevronLeft size={16} />
          </button>
          <button 
            onClick={scrollRight} 
            className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow-sm"
          >
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* The Swipeable Slider */}
      {/* 'snap-x' allows it to cleanly snap to cards when swiping on mobile */}
      <div 
        ref={sliderRef}
        className="flex overflow-x-auto gap-6 pb-8 px-4 md:px-0 snap-x snap-mandatory custom-scrollbar"
        style={{ scrollbarWidth: 'none' }} // Hides scrollbar in Firefox
      >
        {selections.map((student) => (
          <div 
            key={student._id} 
            className="min-w-[260px] md:min-w-[300px] bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col overflow-hidden snap-center flex-shrink-0 group hover:-translate-y-2 transition-transform duration-300"
          >
            {/* Student Image */}
            <div className="h-64 bg-gray-100 relative overflow-hidden">
              {student.imageUrl || student.image ? (
                <img 
                  src={student.imageUrl || student.image} 
                  alt={student.name} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                  <FaTrophy size={48} className="opacity-20" />
                </div>
              )}
              
              {/* Exam Badge overlaid on image */}
              <div className="absolute top-4 right-4 bg-brand-red text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-md">
                {student.examCleared || "Selected"}
              </div>
            </div>

            {/* Student Info */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{student.name}</h3>
              <p className="text-brand-orange font-bold text-sm uppercase tracking-wide">
                {student.rank ? `Rank: ${student.rank}` : "Qualified"}
              </p>
              
              {student.year && (
                <p className="text-gray-400 text-xs font-bold mt-2">Batch of {student.year}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile "View All" Button */}
      <div className="mt-4 px-4 md:hidden">
         <Link to="/Selections" className="block w-full text-center py-3 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-brand-red transition-colors">
            View All Selections
         </Link>
      </div>
      
    </div>
  );
};

export default SelectionSlider;