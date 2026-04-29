import React from 'react';
import { useApiData } from '@/hooks/useApiData';
import { MarqueeStrip } from '@/components/ui';

export default function NotificationStrip() {
  const { data: items, isLoading } = useApiData('/notifications', { fallback: [] });

  if (isLoading || !items?.length) return null;

  return (
    <div className="bg-gray-100 border-b border-gray-200 py-2">
      <MarqueeStrip items={items} variant="gray" />
    </div>
  );
}
