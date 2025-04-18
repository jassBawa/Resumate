import { useState } from 'react';
import { Loader2, Send, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  resumeText: string;
  onResumeUpdate: (resumseString: string) => void;
}

export function ChatInterface({ resumeText, onResumeUpdate }: ChatInterfaceProps) {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    const messageToSend = chatInput;
    
    setChatMessages((prev) => [
      ...prev,
      { role: 'user', content: messageToSend },
    ]);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend,
          resumeText: resumeText,
          conversationHistory: chatMessages,
        }),
      });
      const data = await response.json();

      if (!response.body) throw new Error('No response body returned');

      
      const rawText: string = data.response;
      
      try {
          const responseMatch = rawText.match(/"response"\s*:\s*"([^"]*)"/);
          // @ts-expect-error regex
          const resumeMatch = rawText.match(/"resume"\s*:\s*"(.*)"/s); 
          // 2. Handle edge cases
          const parsedResponse = responseMatch ? responseMatch[1] : "";
          let parsedResume = resumeMatch ? resumeMatch[1] : "";
          
        
        if (parsedResume) {
          parsedResume = parsedResume.replace(/\\"/g, '"').replace(/\\n/g, '\n');
          onResumeUpdate(parsedResume);
        }

        if (parsedResponse) {
          setChatMessages((prev) => [
            ...prev,
            { role: 'assistant', content: parsedResponse },
          ]);
        }
      } catch (error) {
        console.error('Error parsing chat response:', error);
        setChatMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Sorry, there was an error processing the response.' },
        ]);
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, there was an error processing your request.' },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border dark:border-zinc-700 rounded-xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
      <div className="space-y-4 h-96 overflow-y-auto border-b border-gray-200 dark:border-gray-600 pb-4">
        {chatMessages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                msg.role === 'user'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-gray-100'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {msg.role === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
                <span className="text-xs font-medium">
                  {msg.role === 'user' ? 'You' : 'Assistant'}
                </span>
              </div>
              <p className="text-sm">{msg.content}</p>
            </div>
          </motion.div>
        ))}
        {chatLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 dark:bg-zinc-700 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask about your resume..."
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-200"
          disabled={chatLoading}
          onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
        />
        <button
          onClick={handleChatSend}
          disabled={chatLoading || !chatInput.trim()}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
        >
          <Send className="h-5 w-5" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
}
