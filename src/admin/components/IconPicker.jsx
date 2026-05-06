import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const ICON_NAMES = Object.keys(FaIcons).filter(k => k.startsWith('Fa') && k !== 'FaSearch' && k !== 'FaTimes');

export default function IconPicker({ label, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = search
    ? ICON_NAMES.filter(n => n.toLowerCase().includes(search.toLowerCase())).slice(0, 60)
    : ICON_NAMES.slice(0, 60);

  const SelectedIcon = value ? FaIcons[value] : null;

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium text-gray-700">{label}</p>}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm hover:border-red-300 transition-colors bg-white w-full"
      >
        {SelectedIcon ? (
          <>
            <SelectedIcon className="text-lg text-red-500" />
            <span className="text-gray-700">{value}</span>
          </>
        ) : (
          <span className="text-gray-400">Choose an icon…</span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-3">
              <h3 className="font-semibold text-gray-900">Pick an icon</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search icons…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 grid grid-cols-8 gap-1.5">
              {value && (
                <button
                  type="button"
                  onClick={() => { onChange(''); setOpen(false); }}
                  className="flex items-center justify-center p-2.5 rounded-lg border-2 border-dashed border-gray-300 text-gray-400 hover:text-red-400 hover:border-red-300 col-span-1"
                  title="Clear icon"
                >
                  <FaTimes className="text-xs" />
                </button>
              )}
              {filtered.map(name => {
                const Icon = FaIcons[name];
                return (
                  <button
                    key={name}
                    type="button"
                    title={name}
                    onClick={() => { onChange(name); setOpen(false); setSearch(''); }}
                    className={cn(
                      'flex items-center justify-center p-2.5 rounded-lg text-lg hover:bg-red-50 hover:text-red-500 transition-colors',
                      value === name && 'bg-red-100 text-red-600',
                    )}
                  >
                    <Icon />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
