import { useState, useMemo } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 20;

export default function DataTable({
  columns = [],
  data = [],
  isLoading = false,
  emptyMessage = 'No records found.',
  searchable = true,
  searchKeys,
  actions,
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const keys = searchKeys || columns.filter(c => !c.render).map(c => c.key);

  const filtered = useMemo(() => {
    let rows = [...data];
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(row =>
        keys.some(k => String(row[k] ?? '').toLowerCase().includes(q))
      );
    }
    if (sortKey) {
      rows.sort((a, b) => {
        const av = a[sortKey] ?? '';
        const bv = b[sortKey] ?? '';
        const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return rows;
  }, [data, search, sortKey, sortDir, keys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  }

  function SortIcon({ colKey }) {
    if (sortKey !== colKey) return <FaSort className="text-gray-300 text-xs ml-1" />;
    return sortDir === 'asc'
      ? <FaSortUp className="text-red-400 text-xs ml-1" />
      : <FaSortDown className="text-red-400 text-xs ml-1" />;
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {(searchable || actions) && (
        <div className="px-4 py-3 border-b border-gray-100 flex flex-wrap items-center gap-3">
          {searchable && (
            <div className="relative flex-1 min-w-48">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="search"
                placeholder="Search…"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400"
              />
            </div>
          )}
          {actions && <div className="flex gap-2">{actions}</div>}
          <span className="text-xs text-gray-400 ml-auto">
            {filtered.length} record{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className={cn(col.sortable && 'cursor-pointer select-none hover:bg-gray-100')}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <span className="inline-flex items-center">
                    {col.label}
                    {col.sortable && <SortIcon colKey={col.key} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-16 text-gray-400 text-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pageData.map((row, i) => (
                <tr key={row._id || i}>
                  {columns.map(col => (
                    <td key={col.key} className={col.className}>
                      {col.render ? col.render(row) : String(row[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
