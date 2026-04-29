import React from 'react';

const ALL_FILTER = { value: '', label: 'All Faculty' };

export default function FacultyFilters({ subjects, activeFilter, onFilterChange }) {
  if (!subjects || subjects.length === 0) return null;

  const filters = [ALL_FILTER, ...subjects.map(s => ({ value: s, label: s }))];

  return (
    <div className="py-6 bg-white border-b border-gray-100" role="group" aria-label="Filter faculty by subject">
      <div className="container-custom">
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 ${
                activeFilter === f.value
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
              }`}
              aria-pressed={activeFilter === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
