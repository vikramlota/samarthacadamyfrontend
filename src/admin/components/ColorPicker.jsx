import { cn } from '@/lib/utils';

const PALETTE = [
  { label: 'Red',    value: 'red' },
  { label: 'Orange', value: 'orange' },
  { label: 'Gray',   value: 'gray' },
  { label: 'Green',  value: 'green' },
  { label: 'Blue',   value: 'blue' },
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
      </div>
    </div>
  );
}
