import { useRef, useMemo } from 'react';
import JoditReact from 'jodit-react';
import { TOKEN_KEY } from '../lib/api';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export default function JoditEditor({ value = '', onChange, label, height = 400 }) {
  const editorRef = useRef(null);

  const config = useMemo(() => ({
    readonly: false,
    height,
    toolbarAdaptive: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', '|',
      'h1', 'h2', 'h3', '|',
      'outdent', 'indent', '|',
      'link', 'image', '|',
      'align', '|',
      'hr', 'table', '|',
      'undo', 'redo', '|',
      'source',
    ],
    uploader: {
      url: `${API_BASE}/upload/image`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
      filesVariableName: 'image',
      isSuccess: (resp) => resp.success,
      process: (resp) => ({
        files: resp.data ? [resp.data.url] : [],
        path: resp.data ? resp.data.url : '',
        error: resp.success ? 0 : 1,
        msg: resp.error || ''
      }),
      defaultHandlerSuccess: function (data) {
        if (data.files && data.files.length) {
          this.selection.insertImage(data.files[0]);
        }
      }
    },
    style: { fontFamily: 'inherit', fontSize: '15px' },
  }), [height]);

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium text-gray-700">{label}</p>}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <JoditReact
          ref={editorRef}
          value={value}
          config={config}
          onChange={content => onChange(content)}
        />
      </div>
    </div>
  );
}
