import React from 'react';
import { useApiData } from '@/hooks/useApiData';
import { MarqueeStrip } from '@/components/ui';

export default function NotificationStrip() {
  const { data: apiItems, isLoading } = useApiData('/notifications?limit=5', { fallback: [] });

  if (isLoading || !apiItems?.length) return null;

  // Ensure items have an href so they become clickable in the MarqueeStrip
  const items = apiItems.slice(0, 5).map(item => ({
    ...item,
    text: item.text || item.title, // Backend might use text or title
    href: item.href || item.link || (item.slug ? `/notifications/${item.slug}` : '/notifications')
  }));

  return (
    <div className="bg-gray-100 border-b border-gray-200 py-2">
      <MarqueeStrip items={items} variant="gray" />
    </div>
  );
}
