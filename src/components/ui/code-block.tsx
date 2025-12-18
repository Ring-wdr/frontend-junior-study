import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '../../lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock = ({
  code,
  language = 'javascript',
  className,
  showLineNumbers = false,
}: CodeBlockProps) => {
  return (
    <div className={cn('rounded-lg overflow-hidden bg-[#1e1e1e]', className)}>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          fontSize: '0.85rem',
          lineHeight: '1.5',
          background: 'transparent',
        }}
        wrapLongLines={true}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};
