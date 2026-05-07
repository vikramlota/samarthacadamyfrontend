import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaTrash } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import ConfirmDialog from './ConfirmDialog';

export default function FormBuilder({
  title,
  tabs = [],
  data,
  onChange,
  onSubmit,
  onDelete,
  isLoading = false,
  isSaving = false,
  backUrl,
  extra,
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');
  const [dirty, setDirty] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!dirty) return;
    const handler = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  function update(path, value) {
    setDirty(true);
    const keys = path.split('.');
    onChange(prev => {
      const next = { ...prev };
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(data);
      setDirty(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setShowDeleteConfirm(false);
    await onDelete?.();
  }

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48" />
        <div className="h-48 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  const activeTabObj = tabs.find(t => t.id === activeTab);

  return (
    <>
      <ConfirmDialog
        open={showDeleteConfirm}
        title="Delete this record?"
        message="This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {backUrl && (
              <button
                type="button"
                onClick={() => navigate(backUrl)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
              >
                <FaArrowLeft />
              </button>
            )}
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            {dirty && (
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                Unsaved
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {extra}
            {onDelete && (
              <Button
                type="button"
                variant="ghost"
                icon={FaTrash}
                onClick={() => setShowDeleteConfirm(true)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                Delete
              </Button>
            )}
            <Button type="submit" variant="primary" icon={FaSave} loading={saving || isSaving}>
              Save
            </Button>
          </div>
        </div>

        {/* Tabs */}
        {tabs.length > 1 && (
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Tab content */}
        {activeTabObj && (
          <div className="admin-form-section">
            {activeTabObj.render({ data, update })}
          </div>
        )}

        {/* Bottom save bar */}
        {dirty && (
          <div className="sticky bottom-4 flex justify-end">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-3">
              <span className="text-sm text-gray-600">You have unsaved changes</span>
              <Button type="submit" variant="primary" icon={FaSave} loading={saving || isSaving} size="sm">
                Save now
              </Button>
            </div>
          </div>
        )}
      </form>
    </>
  );
}
