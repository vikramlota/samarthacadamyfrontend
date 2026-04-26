import React from 'react';
import { cn } from '../../lib/utils';
import { useScrollReveal } from '../../hooks';

/**
 * SectionHeader — animated section title block.
 *
 * Props:
 *   eyebrow      — small uppercase label above the title
 *   title        — required heading text (rendered as h2)
 *   description  — optional subtext paragraph
 *   align        — 'center' (default) | 'left'
 *   titleAccent  — substring of `title` to render in red-500
 *   className
 */
const SectionHeader = ({
  eyebrow,
  title,
  description,
  align       = 'center',
  titleAccent,
  className,
}) => {
  const [ref, isVisible] = useScrollReveal();
  const isCentered = align === 'center';

  const renderTitle = () => {
    if (!titleAccent || !title.includes(titleAccent)) return title;
    const [before, after] = title.split(titleAccent);
    return (
      <>
        {before}
        <span className="text-red-500">{titleAccent}</span>
        {after}
      </>
    );
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
        isCentered ? 'text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
      )}

      <h2 className={cn(
        'heading-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-balance',
        isCentered && 'max-w-3xl mx-auto',
      )}>
        {renderTitle()}
      </h2>

      {description && (
        <p className={cn(
          'mt-4 text-base md:text-lg text-gray-600 text-pretty leading-relaxed',
          isCentered && 'max-w-2xl mx-auto',
        )}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
