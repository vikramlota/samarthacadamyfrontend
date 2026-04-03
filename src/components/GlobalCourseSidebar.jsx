import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const GlobalCourseSidebar = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        const data = response.data.data || response.data;
        // Grab the top 8 courses
        setCourses(data.slice(0, 8));
      } catch (error) {
        console.error("Error fetching global sidebar courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading || courses.length === 0) return null;

  return (
    <aside className="sticky top-0 h-screen overflow-y-auto p-6 bg-white border-r border-gray-100 w-80 flex-shrink-0 hidden lg:flex flex-col custom-scrollbar shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 relative">
      
      {/* Sleek Header with a subtle red accent */}
      <div className="mb-6 flex items-center gap-3">
        <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
        <h3 className="text-[13px] font-black text-gray-800 uppercase tracking-[0.2em]">
          Trending Now
        </h3>
      </div>
      
      {/* The "Leaderboard" List */}
      <div className="space-y-1 flex-1">
        {courses.map((course, index) => {
          // Format number as 01, 02, 03...
          const rank = (index + 1).toString().padStart(2, '0');

          return (
            <Link 
              to={`/courses/${course.slug}`} 
              key={course._id}
              className="group relative flex items-start gap-4 p-3 rounded-xl hover:bg-red-50 transition-all duration-300 border border-transparent hover:border-red-100"
            >
              {/* Giant Faint Number that lights up on hover */}
              <span className="text-3xl font-black text-red-300 italic group-hover:text-red-200 group-hover:-translate-y-1 transition-all duration-300 leading-none mt-1">
                {rank}
              </span>
              
              {/* Title & subtle category tag */}
              <div className="flex flex-col">
                <h4 className="text-sm font-bold text-gray-600 leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
                  {course.title}
                </h4>
                <span className="text-[10px] uppercase font-bold text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wider">
                  View Course &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Upgraded Browse Button */}
      <div className="pt-6 mt-4 border-t border-gray-100">
        <Link 
          to="/courses" 
          className="group flex items-center justify-between w-full p-4 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <span>Explore Catalog</span>
          <span className="bg-white/20 px-2 py-1 rounded-md group-hover:bg-white/30 transition-colors">
            &rarr;
          </span>
        </Link>
      </div>

    </aside>
  );
};

export default GlobalCourseSidebar;