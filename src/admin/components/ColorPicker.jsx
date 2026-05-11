import { cn } from '@/lib/utils';

const PALETTE = [
  { label: 'Red', value: 'red', hex: '#ef4444' },
  { label: 'Orange', value: 'orange', hex: '#f97316' },
  { label: 'Gray', value: 'gray', hex: '#6b7280' },
  { label: 'Green', value: 'green', hex: '#22c55e' },
  { label: 'Blue', value: 'blue', hex: '#3b82f6' },
];

export default function ColorPicker({ label, value, onChange }) {
  const safeValue = PALETTE.some(c => c.value === value) ? value : 'red';

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium text-gray-700">{label}</p>}

      <div className="flex flex-wrap gap-3">
        {PALETTE.map((color) => {
          const selected = safeValue === color.value;

          return (
            <button
              key={color.value}
              type="button"
              onClick={() => onChange(color.value)}
              className={cn(
                'w-9 h-9 rounded-full transition-all duration-200 relative',
                'hover:scale-110'
              )}
              style={{ backgroundColor: color.hex }}
            >
              {/* 🔥 STRONG selection indicator */}
              {selected && (
                <span className="absolute inset-0 rounded-full ring-4 ring-black ring-offset-2" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}