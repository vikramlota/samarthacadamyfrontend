import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaTimes } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export default function MultiSelect({
  label,
  options = [],
  value = [],
  onChange,
  placeholder = 'Select...',
  getLabel = o => o.label ?? o.name ?? o,
  getValue = o => o._id ?? o.value ?? o,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    function close(e) {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const selected = new Set(value.map(v => getValue(v) ?? v));

  const filtered = options.filter(o =>
    getLabel(o).toLowerCase().includes(search.toLowerCase())
  );

  function toggle(opt) {
    const v = getValue(opt);
    if (selected.has(v)) {
      onChange(value.filter(x => (getValue(x) ?? x) !== v));
    } else {
      onChange([...value, opt]);
    }
  }

  function removeById(v) {
    onChange(value.filter(x => (getValue(x) ?? x) !== v));
  }

  return (
    <div ref={containerRef} className="space-y-1.5">
      {label && <p className="text-sm font-medium text-gray-700">{label}</p>}

      <div
        className="min-h-[42px] border border-gray-200 rounded-xl px-3 py-2 flex flex-wrap gap-1.5 cursor-pointer focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-400 bg-white"
        onClick={() => setOpen(o => !o)}
      >
        {value.length === 0 && !open && (
          <span className="text-gray-400 text-sm self-center">{placeholder}</span>
        )}
        {value.map(v => {
          const id = getValue(v) ?? v;
          const lbl = getLabel(v) ?? v;
          return (
            <span key={id} className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {lbl}
              <button
                type="button"
                onClick={e => { e.stopPropagation(); removeById(id); }}
                className="hover:text-red-900"
              >
                <FaTimes className="text-[10px]" />
              </button>
            </span>
          );
        })}
        <FaChevronDown className={cn('ml-auto self-center text-gray-400 text-xs transition-transform', open && 'rotate-180')} />
      </div>

      {open && (
        <div className="border border-gray-200 rounded-xl bg-white shadow-lg z-10 max-h-56 overflow-auto">
          <div className="p-2 border-b border-gray-100">
            <input
              autoFocus
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full text-sm px-2 py-1 outline-none"
              onClick={e => e.stopPropagation()}
            />
          </div>
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">No options</p>
          ) : (
            filtered.map(opt => {
              const v = getValue(opt);
              const isSelected = selected.has(v);
              return (
                <button
                  key={v}
                  type="button"
                  onClick={e => { e.stopPropagation(); toggle(opt); }}
                  className={cn(
                    'w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2',
                    isSelected && 'text-red-600 font-medium',
                  )}
                >
                  <span className={cn(
                    'w-4 h-4 border rounded flex-shrink-0 flex items-center justify-center',
                    isSelected ? 'bg-red-500 border-red-500 text-white' : 'border-gray-300',
                  )}>
                    {isSelected && <span className="text-[10px]">✓</span>}
                  </span>
                  {getLabel(opt)}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
