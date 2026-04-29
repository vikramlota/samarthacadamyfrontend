import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import { cn } from '../../lib/utils';

/**
 * Select — custom accessible dropdown (not native <select>).
 * A hidden native select is kept for form compatibility.
 *
 * Props:
 *   label, error, containerClassName
 *   options  — array of { value, label }
 *   value    — controlled value
 *   onChange — fires with a synthetic { target: { name, value } } event
 *   placeholder — shown when no value selected
 */
const Select = React.forwardRef(function Select(
  {
    label,
    name,
    value,
    onChange,
    placeholder = 'Select an option',
    error,
    options = [],
    containerClassName,
    disabled,
    id,
    ...rest
  },
  ref,
) {
  const [isOpen, setIsOpen]   = useState(false);
  const containerRef          = useRef(null);
  const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const nativeId = selectId ? `${selectId}-native` : undefined;

  // Close on outside click
  useEffect(() => {
    const close = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const selected = options.find((o) => o.value === value);

  const pick = (v) => {
    onChange?.({ target: { name, value: v } });
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    const idx = options.findIndex((o) => o.value === value);
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsOpen((v) => !v); }
    if (e.key === 'Escape')    setIsOpen(false);
    if (e.key === 'ArrowDown' && isOpen && idx < options.length - 1) pick(options[idx + 1].value);
    if (e.key === 'ArrowUp'   && isOpen && idx > 0)                  pick(options[idx - 1].value);
  };

  return (
    <div className={cn('flex flex-col gap-1.5', containerClassName)} ref={containerRef}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="relative">
        {/* Hidden native select — keeps forms working */}
        <select
          ref={ref}
          id={nativeId}
          name={name}
          value={value}
          onChange={onChange}
          aria-hidden="true"
          tabIndex={-1}
          className="sr-only"
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        {/* Custom visible trigger */}
        <button
          type="button"
          id={selectId}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen((v) => !v)}
          onKeyDown={handleKeyDown}
          className={cn(
            'w-full flex items-center justify-between rounded-input border bg-white px-4 py-2.5 text-base text-left',
            'transition-all duration-150',
            'focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500',
            error    ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300',
            isOpen   && 'border-red-500 ring-2 ring-red-100',
            disabled && 'bg-gray-50 cursor-not-allowed opacity-60',
          )}
        >
          <span className={cn(selected ? 'text-gray-900' : 'text-gray-400')}>
            {selected ? selected.label : placeholder}
          </span>
          <FaChevronDown
            className={cn('text-gray-400 text-xs transition-transform duration-150 flex-shrink-0', isOpen && 'rotate-180')}
            aria-hidden="true"
          />
        </button>

        {/* Dropdown panel */}
        {isOpen && (
          <ul
            role="listbox"
            aria-label={label}
            className="absolute top-full mt-1 left-0 right-0 z-20 bg-white rounded-input border border-gray-200 shadow-card overflow-auto max-h-60"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => pick(opt.value)}
                  className={cn(
                    'flex items-center justify-between px-4 py-2.5 text-base cursor-pointer transition-colors duration-100',
                    isSelected ? 'bg-red-100 text-red-700 font-semibold' : 'text-gray-700 hover:bg-red-50',
                  )}
                >
                  {opt.label}
                  {isSelected && <FaCheck className="text-xs text-red-500 flex-shrink-0" aria-hidden="true" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
