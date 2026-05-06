import { FaPlus, FaTrash, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export default function FieldArray({
  label,
  value = [],
  onChange,
  itemSchema = [],
  emptyItem = {},
  maxItems,
}) {
  function add() {
    if (maxItems && value.length >= maxItems) return;
    onChange([...value, { ...emptyItem }]);
  }

  function remove(i) {
    onChange(value.filter((_, idx) => idx !== i));
  }

  function move(i, dir) {
    const next = [...value];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  function updateItem(i, field, val) {
    const next = [...value];
    next[i] = { ...next[i], [field]: val };
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {label && (
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">{label}</p>
          <span className="text-xs text-gray-400">{value.length} item{value.length !== 1 ? 's' : ''}</span>
        </div>
      )}

      <div className="space-y-2">
        {value.map((item, i) => (
          <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 group">
            <div className="flex items-start gap-2">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {itemSchema.map(field => (
                  <FieldInput
                    key={field.name}
                    field={field}
                    value={item[field.name] ?? ''}
                    onChange={v => updateItem(i, field.name, v)}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-20"
                >
                  <FaChevronUp className="text-xs" />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === value.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-20"
                >
                  <FaChevronDown className="text-xs" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="p-1 text-red-400 hover:text-red-600"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        disabled={maxItems && value.length >= maxItems}
        className={cn(
          'flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border-2 border-dashed w-full justify-center transition-colors',
          'border-gray-300 text-gray-500 hover:border-red-300 hover:text-red-500',
          maxItems && value.length >= maxItems && 'opacity-40 cursor-not-allowed',
        )}
      >
        <FaPlus className="text-xs" />
        Add {label || 'Item'}
      </button>
    </div>
  );
}

function FieldInput({ field, value, onChange }) {
  const base = 'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400';

  switch (field.type) {
    case 'textarea':
      return (
        <label className={field.span === 'full' ? 'sm:col-span-2 lg:col-span-3' : ''}>
          <span className="block text-xs text-gray-500 mb-1">{field.label}</span>
          <textarea
            rows={3}
            value={value}
            onChange={e => onChange(e.target.value)}
            className={base}
            required={field.required}
          />
        </label>
      );
    case 'number':
      return (
        <label>
          <span className="block text-xs text-gray-500 mb-1">{field.label}</span>
          <input type="number" value={value} onChange={e => onChange(Number(e.target.value))} className={base} required={field.required} />
        </label>
      );
    case 'select':
      return (
        <label>
          <span className="block text-xs text-gray-500 mb-1">{field.label}</span>
          <select value={value} onChange={e => onChange(e.target.value)} className={base}>
            {field.options?.map(o => (
              <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
            ))}
          </select>
        </label>
      );
    default:
      return (
        <label>
          <span className="block text-xs text-gray-500 mb-1">{field.label}</span>
          <input type="text" value={value} onChange={e => onChange(e.target.value)} className={base} required={field.required} />
        </label>
      );
  }
}
