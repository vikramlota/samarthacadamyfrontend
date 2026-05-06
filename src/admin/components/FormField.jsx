// Lightweight labelled form field wrapper for edit pages
export default function FormField({ label, required, children, hint }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      {children}
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

// Reusable text, textarea, number, select inputs styled consistently
export function TInput({ value = '', onChange, type = 'text', placeholder, required, ...rest }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400"
      {...rest}
    />
  );
}

export function TTextarea({ value = '', onChange, rows = 3, placeholder, ...rest }) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 resize-none"
      {...rest}
    />
  );
}

export function TSelect({ value = '', onChange, options = [], placeholder }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 bg-white"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => (
        <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
      ))}
    </select>
  );
}

export function TToggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-red-500' : 'bg-gray-200'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
      </button>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}

export function TagInput({ value = [], onChange, placeholder = 'Add tag and press Enter' }) {
  function handleKey(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = e.target.value.trim();
      if (tag && !value.includes(tag)) {
        onChange([...value, tag]);
        e.target.value = '';
      }
    }
  }
  function remove(tag) { onChange(value.filter(t => t !== tag)); }

  return (
    <div className="border border-gray-200 rounded-xl p-2 flex flex-wrap gap-1.5 min-h-[42px]">
      {value.map(tag => (
        <span key={tag} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
          {tag}
          <button type="button" onClick={() => remove(tag)} className="text-gray-400 hover:text-gray-700">×</button>
        </span>
      ))}
      <input
        type="text"
        onKeyDown={handleKey}
        placeholder={value.length === 0 ? placeholder : ''}
        className="flex-1 min-w-24 outline-none text-sm bg-transparent"
      />
    </div>
  );
}
