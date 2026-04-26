import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { cn } from '../../lib/utils';

const FAQItem = ({ question, answer, isOpen, onToggle, index, variant }) => {
  const triggerId = `faq-trigger-${index}`;
  const panelId   = `faq-panel-${index}`;

  return (
    <div
      className={cn(
        variant === 'boxed'
          ? 'bg-white rounded-card border border-gray-100 shadow-soft overflow-hidden'
          : 'border-b border-gray-200 last:border-0',
      )}
    >
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          'flex w-full items-center justify-between text-left transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500',
          variant === 'boxed' ? 'px-6 py-5' : 'py-5 md:py-6',
          isOpen ? 'text-red-500' : 'text-gray-900 hover:text-red-500',
        )}
      >
        <span className="text-base md:text-lg font-semibold pr-4">{question}</span>
        {/* Icon rotates 45° to form an × when open */}
        <span
          className={cn(
            'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200',
            isOpen ? 'bg-red-500 text-white rotate-45' : 'bg-gray-100 text-gray-500',
          )}
          aria-hidden="true"
        >
          <FaPlus className="text-xs" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className={cn(
              'text-gray-600 leading-relaxed text-base',
              variant === 'boxed' ? 'px-6 pb-5' : 'pb-5 md:pb-6',
            )}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * FAQ — accessible accordion component.
 *
 * Props:
 *   items         — array of { question, answer }
 *   allowMultiple — allow multiple items open at once (default: false)
 *   defaultOpen   — index of item open by default
 *   variant       — 'default' (dividers) | 'boxed' (card per item)
 */
const FAQ = ({
  items         = [],
  allowMultiple = false,
  defaultOpen,
  variant       = 'default',
  className,
}) => {
  const [openSet, setOpenSet] = useState(
    () => new Set(defaultOpen !== undefined ? [defaultOpen] : []),
  );

  const toggle = (i) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        if (!allowMultiple) next.clear();
        next.add(i);
      }
      return next;
    });
  };

  return (
    <div className={cn(variant === 'boxed' ? 'space-y-3' : '', className)}>
      {items.map((item, i) => (
        <FAQItem
          key={i}
          index={i}
          question={item.question}
          answer={item.answer}
          isOpen={openSet.has(i)}
          onToggle={() => toggle(i)}
          variant={variant}
        />
      ))}
    </div>
  );
};

export default FAQ;
