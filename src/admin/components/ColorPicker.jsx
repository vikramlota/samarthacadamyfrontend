import { cn } from '@/lib/utils';

const PALETTE = [
  { label: 'Red',    value: '#C4151C' },
  { label: 'Orange', value: '#F27A29' },
  { label: 'Amber',  value: '#F59E0B' },
  { label: 'Green',  value: '#16A34A' },
  { label: 'Blue',   value: '#2563EB' },
  { label: 'Purple', value: '#7C3AED' },
  { label: 'Pink',   value: '#DB2777' },
  { label: 'Gray',   value: '#6B7280' },
  { label: 'Slate',  value: '#475569' },
  { label: 'Black',  value: '#111827' },
];

export default function ColorPicker({ label, value, onChange }) {
  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium text-gray-700">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {PALETTE.map(color => (
          <button
            key={color.value}
            type="button"
            title={color.label}
            onClick={() => onChange(color.value)}
            className={cn(
              'w-8 h-8 rounded-full border-2 transition-transform hover:scale-110',
              value === color.value ? 'border-gray-800 scale-110' : 'border-white shadow',
            )}
            style={{ background: color.value }}
          />
        ))}
        {/* Custom hex input */}
        <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-2 py-1">
          <div className="w-5 h-5 rounded-full border border-gray-200" style={{ background: value || '#000' }} />
          <input
            type="text"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            placeholder="#RRGGBB"
            maxLength={7}
            className="text-xs w-20 outline-none font-mono"
          />
        </div>
      </div>
    </div>
  );
}
