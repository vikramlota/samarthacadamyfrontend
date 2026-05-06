import { cn } from '@/lib/utils';

const STYLES = {
  active:    'bg-green-100 text-green-700',
  inactive:  'bg-gray-100 text-gray-600',
  published: 'bg-green-100 text-green-700',
  draft:     'bg-yellow-100 text-yellow-700',
  new:       'bg-blue-100 text-blue-700',
  contacted: 'bg-orange-100 text-orange-700',
  converted: 'bg-green-100 text-green-700',
  spam:      'bg-red-100 text-red-700',
  featured:  'bg-purple-100 text-purple-700',
  admin:     'bg-red-100 text-red-700',
  editor:    'bg-blue-100 text-blue-700',
};

export default function StatusBadge({ status, className }) {
  const key = status?.toLowerCase() || 'inactive';
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize',
      STYLES[key] || 'bg-gray-100 text-gray-600',
      className,
    )}>
      {status}
    </span>
  );
}
