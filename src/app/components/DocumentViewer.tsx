import { useEffect } from 'react';

export type DocKey = 'strategy' | 'matrix' | 'brief';

// The worked document examples are the real HTML wireframe, served as a static
// asset from /public. The app's View button opens the relevant one full-screen
// by loading it in an iframe and pointing the URL hash at the matching doc.
const DOC_SRC = '/document-viewer-examples.html';

export default function DocumentViewer({ initialDoc = 'strategy', onBack }: { initialDoc?: DocKey; onBack: () => void }) {
  // The embedded doc posts 'lumos:doc-back' when its "← Documents" link is
  // clicked; bring the user back to the Documents list.
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data === 'lumos:doc-back') onBack();
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [onBack]);

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
      <iframe
        title="Document viewer"
        src={`${DOC_SRC}#${initialDoc}`}
        className="flex-1 w-full border-0"
      />
    </div>
  );
}
