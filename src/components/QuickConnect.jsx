import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const QuickConnect = () => {
  // We start with it true (visible), and if they click X, it hides for that session
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 shadow-2xl rounded-2xl">
      
      {/* The Permanently Floating Card */}
      <div className="bg-white text-gray-800 rounded-2xl border border-gray-100 w-72 md:w-80 overflow-hidden flex flex-col">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 font-bold flex justify-between items-center shadow-md z-10">
          <span className="flex items-center gap-2">
            {/* Pulsing Green "Online" Indicator */}
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
            Quick Connect
          </span>
          <button 
            onClick={() => setIsVisible(false)} 
            className="text-gray-400 hover:text-white transition-colors text-xl leading-none px-1"
            title="Dismiss"
          >
            &times;
          </button>
        </div>
        
        {/* Content Section */}
        <div className="p-5 space-y-5 text-sm bg-white">
          <p className="text-gray-500 font-medium leading-relaxed">
            Need help choosing the right course? Talk directly to our experts.
          </p>
          
          <div className="space-y-4 pt-1">
            <a href="tel:+919988949969" className="group flex items-center gap-4 font-bold text-gray-800 hover:text-red-600 transition-colors">
              <span className="bg-red-50 text-red-600 p-2.5 rounded-xl group-hover:scale-110 group-hover:bg-red-100 transition-all">
                📞
              </span>
              <span className="text-base">+91 99889 49969</span>
            </a>
            
            <a href="mailto:samarth.academy2006@gmail.com" className="group flex items-center gap-4 font-bold text-gray-800 hover:text-red-600 transition-colors">
              <span className="bg-red-50 text-red-600 p-2.5 rounded-xl group-hover:scale-110 group-hover:bg-red-100 transition-all">
                ✉️
              </span>
              <span className="text-base">Email Support</span>
            </a>
          </div>

          {/* Call to Action Button */}
          <Link 
            to="/book-demo" 
            onClick={() => setIsVisible(false)}
            className="mt-6 flex items-center justify-center w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-wider text-xs"
          >
            Book Demo Class
          </Link>
        </div>
      </div>

    </div>
  );
};

export default QuickConnect;