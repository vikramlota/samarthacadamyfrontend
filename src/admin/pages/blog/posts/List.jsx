import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../../lib/api';
import { useApiData } from '../../../hooks/useApiData';
import { useToast } from '../../../components/Toast';
import { useAuth } from '../../../context/AuthContext';
import DataTable from '../../../components/DataTable';
import StatusBadge from '../../../components/StatusBadge';
import ConfirmDialog from '../../../components/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

export default function BlogPostsList() {
  const navigate = useNavigate();
  const toast = useToast();
  const { canDelete } = useAuth();
  const { data, isLoading, refetch } = useApiData('/blog/posts/admin/all');
  const [deleteId, setDeleteId] = useState(null);

  async function handleDelete() {
    try {
      await adminApi.delete(`/blog/posts/admin/${deleteId}`);
      toast.success('Post deleted');
      setDeleteId(null);
      refetch();
    } catch (e) { toast.error(e.message); }
  }

  const columns = [
    { key: 'title', label: 'Title', sortable: true, render: r => <span className="font-medium line-clamp-1">{r.title}</span> },
    { key: 'slug', label: 'Slug', render: r => <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{r.slug}</code> },
    { key: 'status', label: 'Status', render: r => <StatusBadge status={r.status || (r.published ? 'published' : 'draft')} /> },
    { key: 'views', label: 'Views', render: r => r.views || 0 },
    { key: 'publishedAt', label: 'Published', sortable: true, render: r => r.publishedAt ? new Date(r.publishedAt).toLocaleDateString('en-IN') : '—' },
    {
      key: 'actions', label: '',
      render: r => (
        <div className="flex gap-1.5">
          <button onClick={() => navigate(`/blog/posts/${r._id}`)} className="p-1.5 text-blue-500 hover:text-blue-700"><FaEdit /></button>
          {canDelete && <button onClick={() => setDeleteId(r._id)} className="p-1.5 text-red-400 hover:text-red-600"><FaTrash /></button>}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <ConfirmDialog open={!!deleteId} title="Delete this post?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <Button variant="primary" icon={FaPlus} onClick={() => navigate('/blog/posts/new')}>New Post</Button>
      </div>
      <DataTable columns={columns} data={data?.data || []} isLoading={isLoading} emptyMessage="No blog posts yet." searchKeys={['title', 'slug']} />
    </div>
  );
}
