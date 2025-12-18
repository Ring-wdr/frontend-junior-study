import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const CodeBlock = ({
  code,
  language = 'javascript',
}: {
  code: string;
  language?: string;
}) => (
  <div className="rounded-xl overflow-hidden my-3 text-left shadow-md">
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        margin: 0,
        padding: '1rem',
        fontSize: '0.875rem',
        lineHeight: '1.5',
      }}
    >
      {code}
    </SyntaxHighlighter>
  </div>
);
