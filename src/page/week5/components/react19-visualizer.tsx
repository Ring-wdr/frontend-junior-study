import { CheckCircle2, Clock } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';
import { cn } from '../../../lib/utils';

type Message = {
  id: number;
  text: string;
  status: 'sending' | 'sent' | 'error';
};

// Simulation of a server action delay
const sendMessageToServer = async (text: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(text);
    }, 2000);
  });
};

export const React19Visualizer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isPending, setIsPending] = useState(false);

  // To simulate optimistic UI, we manage a separate "optimistic" state list
  // In real React 19, this would be cleaner with useOptimistic
  const [optimisticMessages, setOptimisticMessages] = useState<Message[]>([]);

  const handleSendStandard = async () => {
    if (!inputValue.trim()) return;
    const text = inputValue;
    setInputValue('');
    setIsPending(true);

    // Standard: Wait for server response before showing message
    await sendMessageToServer(text);

    setMessages((prev) => [...prev, { id: Date.now(), text, status: 'sent' }]);
    setIsPending(false);
  };

  const handleSendOptimistic = async () => {
    if (!inputValue.trim()) return;
    const text = inputValue;
    setInputValue('');

    // Optimistic: Add immediately with 'sending' status
    const tempId = Date.now();
    const optimisticMsg: Message = { id: tempId, text, status: 'sending' };

    setOptimisticMessages((prev) => [...prev, optimisticMsg]);

    // Simulate Server Request in background
    await sendMessageToServer(text);

    // Once done, remove optional from optimistic list and add to real list
    // (In real React 19, useOptimistic handles the reversion automatically)
    setOptimisticMessages((prev) => prev.filter((m) => m.id !== tempId));
    setMessages((prev) => [...prev, { id: tempId, text, status: 'sent' }]);
  };

  // Combine real and optimistic messages for display
  const displayMessages = [...messages, ...optimisticMessages].sort(
    (a, b) => a.id - b.id,
  );

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm my-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              React 19 Optimistic UI
            </span>
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Send messages to see the difference between standard and optimistic
            updates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* DEMO AREA */}
        <div className="border rounded-xl overflow-hidden bg-gray-50 flex flex-col h-[400px]">
          <div className="bg-white p-3 border-b flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">
              Chat Preview
            </span>
            <button
              type="button"
              onClick={() => {
                setMessages([]);
                setOptimisticMessages([]);
              }}
              className="text-xs text-red-500 hover:underline"
            >
              Clear
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {displayMessages.length === 0 && (
              <div className="text-center text-gray-400 text-sm mt-10 italic">
                No messages yet.
              </div>
            )}
            {displayMessages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'max-w-[80%] p-3 rounded-2xl text-sm animate-in zoom-in-95 duration-200',
                  msg.status === 'sending'
                    ? 'bg-blue-100 text-blue-800 ml-auto rounded-tr-sm border-2 border-blue-200 border-dashed opacity-80'
                    : 'bg-blue-600 text-white ml-auto rounded-tr-sm shadow-sm',
                )}
              >
                <div className="flex items-center gap-2">
                  {msg.status === 'sending' && (
                    <Clock className="w-3 h-3 animate-pulse" />
                  )}
                  {msg.status === 'sent' && (
                    <CheckCircle2 className="w-3 h-3" />
                  )}
                  {msg.text}
                </div>
                {msg.status === 'sending' && (
                  <div className="text-[10px] opacity-70 mt-1 text-right">
                    Sending... (Optimistic)
                  </div>
                )}
              </div>
            ))}
            {isPending && (
              <div className="flex justify-center py-4">
                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t space-y-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing) return;
                if (e.key === 'Enter') handleSendOptimistic(); // Default to optimistic for better UX demo
              }}
            />
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleSendStandard}
                disabled={isPending || !inputValue}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                Standard Send (Slow)
              </button>
              <button
                onClick={handleSendOptimistic}
                disabled={!inputValue}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50"
              >
                <ZapIcon className="w-3 h-3" />
                Optimistic Send (Fast)
              </button>
            </div>
          </div>
        </div>

        {/* CODE EXPLANATION */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-900 text-sm mb-2">
              How useOptimistic Works
            </h4>
            <p className="text-xs text-blue-800 leading-relaxed">
              React 19's <code>useOptimistic</code> allows you to show a
              different state while an async action is pending. Instead of
              waiting for the server, you immediately show the expected result.
              If the server fails, React automatically reverts the state.
            </p>
          </div>

          <h4 className="text-sm font-semibold text-gray-700 mt-4">
            Code Pattern (React 19)
          </h4>
          <CodeBlock
            code={`import { useOptimistic } from 'react';

function Chat({ messages, sendMessage }) {
  // 1. Define optimistic state
  const [optimisticMessages, addOptimisticMessage] = 
    useOptimistic(messages, (state, newMessage) => [
      ...state,
      { text: newMessage, sending: true }
    ]);

  async function formAction(formData) {
    const text = formData.get('message');
    
    // 2. Add optimistic update immediately
    addOptimisticMessage(text);
    
    // 3. Perform actual server action
    await sendMessage(text);
  }

  return (
    <div>
      {optimisticMessages.map((msg, i) => (
         <div key={i} className={msg.sending ? 'opacity-50' : ''}>
            {msg.text}
         </div>
      ))}
      <form action={formAction}>
        <input name="message" />
      </form>
    </div>
  );
}`}
            className="text-xs"
          />
        </div>
      </div>
    </div>
  );
};

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor" // Changed to fill for solid icon
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
