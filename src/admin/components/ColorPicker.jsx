import { cn } from '@/lib/utils';

const PALETTE = [
  { label: 'Red', value: 'red', hex: '#ef4444' },
  { label: 'Orange', value: 'orange', hex: '#f97316' },
  { label: 'Gray', value: 'gray', hex: '#6b7280' },
  { label: 'Green', value: 'green', hex: '#22c55e' },
  { label: 'Blue', value: 'blue', hex: '#3b82f6' },
];

export default function ColorPicker({ label, value, onChange }) {
  // 🔥 ensure value is valid
  const safeValue = PALETTE.some(c => c.value === value)
    ? value
    : 'red';

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium text-gray-700">{label}</p>}

      <div className="flex flex-wrap gap-2">
        {PALETTE.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => onChange(color.value)}
            className={cn(
              'w-8 h-8 rounded-full border-2 transition-all duration-200',
              safeValue === color.value
                ? 'border-black scale-110 ring-2 ring-black'
                : 'border-white shadow hover:scale-110'
            )}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </div>
  );
}