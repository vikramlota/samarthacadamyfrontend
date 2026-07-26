import React from 'react';
import { useApiData } from '@/hooks/useApiData';
import { MarqueeStrip } from '@/components/ui';

const DUMMY_NOTIFICATIONS = [
  { id: 1, text: 'New Batch for SSC CGL starting from 1st of next month! Enroll now.' },
  { id: 2, text: 'Congratulations to our 50+ students for clearing IBPS PO 2023!' },
  { id: 3, text: 'Special weekend classes for Punjab Police Constable Exam.' }
];

export default function NotificationStrip() {
  const { data: apiItems, isLoading } = useApiData('/notifications', { fallback: [] });

  // Use API items if available, otherwise use dummy data
  const items = apiItems?.length ? apiItems : DUMMY_NOTIFICATIONS;

  if (isLoading) return null;

  return (
    <div className="bg-gray-100 border-b border-gray-200 py-2">
      <MarqueeStrip items={items} variant="gray" />
    </div>
  );
}
