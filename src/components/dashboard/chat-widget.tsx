import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
// import { useResumeStore } from '@/hooks/useResumeStore';
import { Send, Sparkles, Wand2, X, Zap } from 'lucide-react';
import { useState } from 'react';

export function ChatWidget({ threadId }: { threadId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const { updateSection } = useResumeStore();
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Welcome to your AI Resume Assistant! I can help you:\n\n✨ Add projects and experiences\n🎯 Optimize for specific roles\n🚀 Enhance any section\n📝 Improve content quality\n\nTry: 'Add a React project' or 'Optimize for senior developer'",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const currentMessage = message;
    setMessage('');
    setIsLoading(true);

    // Add user message to UI immediately
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        text: currentMessage,
        sender: 'user',
        timestamp: new Date(),
      },
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          threadId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();

      if (data.type === 'edit') {
        console.log(data.parsedResume);
        // updateSection(data.section, data.response);
      }

      // Add AI response to UI
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: data.content,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: "😔 I'm having trouble processing your request. Please try again.",
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    'Add React project',
    'Optimize for senior role',
    'Update skills',
    'Improve summary',
  ];

  const chatSize = isMobile
    ? { width: 'w-[95vw]', height: 'h-[85vh]' }
    : { width: 'w-[450px]', height: 'h-[600px]' };

  return (
    <div className={`fixed ${isMobile ? 'right-4 bottom-4 left-4' : 'right-6 bottom-6'} z-50`}>
      {!isOpen ? (
        <div className="flex flex-col items-end space-y-2">
          {/* Feature badge */}
          <div className="animate-bounce rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-1 text-xs font-medium text-white">
            ✨ AI Assistant
          </div>

          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className={`${isMobile ? 'h-16 w-16' : 'h-16 w-16'} group relative rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-xl transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:shadow-2xl`}
          >
            <div className="relative">
              <Sparkles
                className={`${isMobile ? 'h-7 w-7' : 'h-8 w-8'} transition-transform group-hover:scale-110`}
              />
            </div>
          </Button>
        </div>
      ) : (
        <Card
          className={`${chatSize.width} ${chatSize.height} border-gradient-to-r border-2 bg-gradient-to-br from-purple-200 to-gray-50 p-0 shadow-2xl`}
        >
          <CardHeader className="rounded-t-lg bg-gradient-to-r from-purple-500 to-blue-500 pb-3 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="relative">
                  <Wand2 className="h-6 w-6" />
                  <Sparkles className="absolute -top-1 -right-1 h-3 w-3 animate-pulse" />
                </div>
                AI Resume Assistant
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-1 text-xs text-purple-100">Your intelligent resume companion</p>
          </CardHeader>

          <CardContent className="flex h-full flex-col overflow-y-scroll p-4">
            <div className="flex flex-1 flex-col">
              {/* Messages */}
              <div className="mb-4 flex-1 space-y-4 overflow-y-auto pr-2">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-3 text-sm shadow-md ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                          : 'border bg-white text-gray-800'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {msg.sender === 'bot' && (
                          <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-500" />
                        )}
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 shadow-md">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 animate-spin text-purple-500" />
                        <span>AI is crafting your response...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-7 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 text-xs hover:from-purple-100 hover:to-blue-100"
                      onClick={() => setMessage(action)}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask AI to enhance your resume..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-purple-200 focus:border-purple-400"
                  disabled={isLoading}
                />
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
