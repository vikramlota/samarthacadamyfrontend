import React from 'react';
import { MarqueeStrip } from '../ui';
import { useApiData } from '../../utils/customHooks';

export default function NotifBar() {
  const { data } = useApiData('/notifications');
  const rawList = Array.isArray(data) ? data : (data?.data || []);
  const items = rawList
    .filter(n => n.active !== false)
    .map(n => ({
      text: n.text || n.title,
      href: n.href || n.linkUrl || (n.slug ? `/notifications/${n.slug}` : '/notifications')
    }))
    .filter(n => n.text);

  if (!items.length) return null;

  return (
    <MarqueeStrip
      items={items}
      variant="gray"
      speed="normal"
      pauseOnHover
      className="border-b border-gray-200"
    />
  );
}
