import React from 'react';
import { MarqueeStrip } from '../ui';
import { useApiData } from '../../utils/customHooks';

export default function NotifBar() {
  const { data } = useApiData('/notifications');
  const items = (data?.data ?? [])
    .filter(n => n.active)
    .map(n => ({ text: n.text, href: n.href }));

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
