import { useRef, useState } from 'react';
import { FaCloudUploadAlt, FaTrash, FaImage } from 'react-icons/fa';
import { adminApi, TOKEN_KEY } from '../lib/api';
import { cn } from '@/lib/utils';

export default function ImageUpload({
  label,
  value,
  onChange,
  altValue,
  onAltChange,
  className,
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  async function uploadFile(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Only image files allowed'); return; }
    if (file.size > 10 * 1024 * 1024) { setError('Max file size is 10 MB'); return; }

    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await adminApi.post('/upload/image', formData);
      onChange(res.data.url);
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  return (
    <div className={cn('space-y-2', className)}>
      {label && <p className="text-sm font-medium text-gray-700">{label}</p>}

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <img src={value} alt={altValue || label} className="w-full max-h-48 object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="bg-white text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-100"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600"
            >
              <FaTrash className="inline mr-1 text-xs" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-colors',
            dragOver ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-red-300 hover:bg-gray-50',
          )}
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div className="w-8 h-8 border-2 border-red-200 border-t-red-500 rounded-full animate-spin" />
          ) : (
            <>
              <FaCloudUploadAlt className="text-3xl text-gray-300" />
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium">Drop image here or click to upload</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP — max 10 MB</p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => uploadFile(e.target.files?.[0])}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}

      {onAltChange && (
        <input
          type="text"
          placeholder="Alt text (for accessibility & SEO)"
          value={altValue || ''}
          onChange={e => onAltChange(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400"
        />
      )}
    </div>
  );
}
