import { useRef, useMemo } from 'react';
import JoditReact from 'jodit-react';

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
    uploader: { insertImageAsBase64URI: true },
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
