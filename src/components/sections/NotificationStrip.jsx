import React, { useState, useEffect } from 'react';
import api from '@/utils/api';
import { MarqueeStrip } from '@/components/ui';

export default function NotificationStrip() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    let isMounted = true;
    api.get('/notifications')
      .then(res => {
        if (!isMounted) return;
        const data = res?.data;
        const apiItems = Array.isArray(data) ? data : (data?.data || []);
        setNotifications(apiItems);
      })
      .catch(err => {
        console.warn('Could not fetch notifications for strip:', err?.message);
      });
    return () => { isMounted = false; };
  }, []);

  const activeItems = notifications.filter(item => item && item.active !== false && (item.title || item.text));

  if (!activeItems.length) return null;

  const items = activeItems.slice(0, 10).map(item => ({
    ...item,
    text: item.text || item.title,
    href: item.href || item.linkUrl || (item.slug ? `/notifications/${item.slug}` : '/notifications')
  }));

  return (
    <div className="bg-gray-100 border-b border-gray-200 py-2">
      <MarqueeStrip items={items} variant="gray" />
    </div>
  );
}
