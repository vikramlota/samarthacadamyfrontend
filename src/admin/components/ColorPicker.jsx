import { cn } from '@/lib/utils';

const PALETTE = [
  { label: 'Red',    value: '#ef4444' },
  { label: 'Orange', value: '#f97316' },
  { label: 'Gray',   value: '#6b7280' },
  { label: 'Green',  value: '#22c55e' },
  { label: 'Blue',   value: '#3b82f6' },
];

export default function ColorPicker({ label, value, onChange }) {
  return (
    <div className="space-y-2">
      {label && (
        <p className="text-sm font-medium text-gray-700">{label}</p>
      )}

      <div className="flex flex-wrap gap-2">
        {PALETTE.map((color) => (
          <button
            key={color.value}
            type="button"
            title={color.label}
            onClick={() => onChange(color.value)}
            className={cn(
              'w-8 h-8 rounded-full border-2 transition-all duration-200',
              value === color.value
                ? 'border-black scale-110'
                : 'border-white shadow hover:scale-110'
            )}
            style={{ backgroundColor: color.value }}
          />
        ))}
      </div>
    </div>
  );
}