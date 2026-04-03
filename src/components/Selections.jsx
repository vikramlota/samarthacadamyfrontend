import React, { useState, useEffect } from 'react';
import { FaTrophy, FaCalendarAlt } from 'react-icons/fa';
import { useScrollReveal } from '../hooks';
import api from '../utils/api'; 

const Selections = () => {
  const [students, setStudents] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null); // ⭐ NEW
  const [ref, isVisible] = useScrollReveal();

  useEffect(() => {
    const fetchSelections = async () => {
      try {
        const response = await api.get('/results');
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching selections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSelections();
  }, []);
  useEffect(() => {
  const handleEsc = (e) => {
    if (e.key === "Escape") setSelectedStudent(null);
  };

  window.addEventListener("keydown", handleEsc);
  return () => window.removeEventListener("keydown", handleEsc);
}, []);

  return (
    <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden min-h-screen">
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
          </div>
        )}

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          
          {students.map((student, idx) => (
            <div 
              key={student._id}
              onClick={() => setSelectedStudent(student)} // ⭐ CLICK HANDLER
              className={`cursor-pointer group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 flex flex-col transition-all duration-500 hover:-translate-y-2 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >

              {/* Image */}
              <div className="relative h-72 sm:h-80 overflow-hidden bg-gray-100">
                <img 
                  src={student.imageUrl || "https://placehold.co/600x800"} 
                  alt={student.studentName} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

                {/* Name + Tags */}
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="font-black text-3xl text-white mb-2">
                    {student.studentName}
                  </h3>

                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-brand-red text-white text-xs px-3 py-1.5 rounded-md font-bold">
                      {student.examName}
                    </span>

                    {student.rank && (
                      <span className="bg-brand-orange text-white text-xs px-3 py-1.5 rounded-md flex items-center gap-1">
                        <FaTrophy /> {student.rank}
                      </span>
                    )}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {selectedStudent && (
  <div 
    className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300"
    onClick={() => setSelectedStudent(null)}
  >
    <div 
      className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-500 scale-100 animate-[fadeIn_0.4s_ease]"
      onClick={(e) => e.stopPropagation()}
    >

      {/* Close Button */}
      <button 
        onClick={() => setSelectedStudent(null)}
        className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition"
      >
        ✕
      </button>

      {/* Scrollable Content */}
      <div className="overflow-y-auto max-h-[90vh]">

        {/* Image */}
        <div className="h-80 overflow-hidden relative group">
          <img 
            src={selectedStudent.imageUrl} 
            alt={selectedStudent.studentName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          {/* Name Overlay */}
          <div className="absolute bottom-0 left-0 p-6">
            <h2 className="text-4xl font-black text-white drop-shadow-lg">
              {selectedStudent.studentName}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-5">

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="bg-brand-red text-white px-3 py-1 rounded-md text-xs font-bold">
              {selectedStudent.examName}
            </span>

            {selectedStudent.rank && (
              <span className="bg-brand-orange text-white px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                <FaTrophy /> {selectedStudent.rank}
              </span>
            )}
          </div>

          {/* Year */}
          {selectedStudent.year && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <FaCalendarAlt /> Selected in {selectedStudent.year}
            </div>
          )}

          {/* Divider */}
          <div className="h-[1px] bg-gray-200"></div>

          {/* Testimonial */}
          {selectedStudent.testimonial ? (
            <p className="text-gray-700 leading-relaxed text-lg italic hover:text-gray-900 transition">
              "{selectedStudent.testimonial}"
            </p>
          ) : (
            <p className="text-gray-400 italic">
              No testimonial provided.
            </p>
          )}

        </div>
      </div>
    </div>
  </div>
)}

    </section>
  );
};

export default Selections;