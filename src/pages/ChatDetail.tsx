import { useState, useRef, useEffect } from 'react';
import { 
  User, Bot, Send, Paperclip, MoreVertical, 
  UserPlus, Archive, Star, Clock, Trash2, 
  Sparkles, SmilePlus
} from 'lucide-react';

interface Message {
  id: number;
  sender: 'customer' | 'agent' | 'ai';
  content: string;
  timestamp: string;
}

interface Chat {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  status?: string;
  messages: Message[];
}

interface ChatDetailProps {
  chat: Chat;
  onBack: () => void;
}

const ChatDetail = ({ chat, onBack }: ChatDetailProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(chat.messages || []);
  const [isTyping, setIsTyping] = useState(false);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const aiSuggestions = [
    "I understand your concern. Let me check your account details.",
    "Thank you for providing that information. I'll look into this right away.",
    "I apologize for the inconvenience. We'll get this resolved as soon as possible."
  ];
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      sender: 'agent',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate AI typing and response
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        content: "I'm analyzing your message and will provide assistance shortly. Is there anything specific you'd like me to help with?",
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const insertAiSuggestion = (suggestion: string) => {
    setNewMessage(suggestion);
    setShowAiSuggestions(false);
  };
  
  return (
    <div className="flex h-full flex-col bg-background-primary">
      {/* Customer Info Panel */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {chat.customer.avatar ? (
              <img 
                src={chat.customer.avatar} 
                alt={chat.customer.name} 
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                {chat.customer.name.charAt(0)}
              </div>
            )}
            
            <div>
              <h3 className="font-medium">{chat.customer.name}</h3>
              <p className="text-xs text-text-tertiary">{chat.customer.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="btn btn-ghost p-2">
              <UserPlus size={18} />
            </button>
            <button className="btn btn-ghost p-2">
              <Archive size={18} />
            </button>
            <button className="btn btn-ghost p-2">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isFirstMessageOfDay = index === 0 || (
            formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp)
          );
          
          return (
            <div key={message.id}>
              {isFirstMessageOfDay && (
                <div className="flex items-center justify-center my-4">
                  <div className="bg-background-tertiary h-px flex-grow"></div>
                  <span className="px-2 text-xs text-text-tertiary">
                    {formatDate(message.timestamp)}
                  </span>
                  <div className="bg-background-tertiary h-px flex-grow"></div>
                </div>
              )}
              
              <div className={`flex ${message.sender !== 'customer' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[75%] rounded-lg p-3 ${
                    message.sender === 'customer' 
                      ? 'bg-background-tertiary text-text-primary'
                      : message.sender === 'ai'
                      ? 'bg-secondary/10 text-text-primary'
                      : 'bg-primary text-white'
                  } fade-in-up`}
                >
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-medium">
                      {message.sender === 'customer' 
                        ? chat.customer.name 
                        : message.sender === 'ai' 
                        ? 'AI Assistant' 
                        : 'You'}
                    </span>
                    <span className="ml-2 text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-lg p-3 bg-secondary/10">
              <div className="flex items-center mb-1">
                <span className="text-xs font-medium">AI Assistant</span>
              </div>
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-secondary animate-bounce"></div>
                <div className="h-2 w-2 rounded-full bg-secondary animate-bounce delay-100"></div>
                <div className="h-2 w-2 rounded-full bg-secondary animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* AI Suggestions */}
      {showAiSuggestions && (
        <div className="px-4 py-2 border-t border-border bg-background-secondary fade-in">
          <div className="flex items-center mb-2">
            <Sparkles size={16} className="text-primary mr-2" />
            <span className="text-sm font-medium">AI Suggested Responses</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.map((suggestion, index) => (
              <button
                key={index}
                className="bg-background-tertiary hover:bg-background-tertiary/80 text-text-primary text-sm rounded-lg px-3 py-2 transition-colors"
                onClick={() => insertAiSuggestion(suggestion)}
              >
                {suggestion.length > 50 ? suggestion.substring(0, 50) + '...' : suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Message Input */}
      <div className="border-t border-border p-4">
        <div className="flex items-end space-x-2">
          <button 
            className="flex-shrink-0 p-2 rounded-md hover:bg-background-tertiary"
            onClick={() => setShowAiSuggestions(!showAiSuggestions)}
          >
            <Sparkles size={20} className={showAiSuggestions ? 'text-primary' : 'text-text-tertiary'} />
          </button>
          
          <div className="relative flex-1">
            <textarea
              placeholder="Type your message..."
              className="input min-h-[80px] w-full py-3 resize-none"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div className="absolute bottom-2 right-2 flex space-x-1">
              <button className="p-1.5 rounded-md hover:bg-background-tertiary text-text-tertiary">
                <Paperclip size={18} />
              </button>
              <button className="p-1.5 rounded-md hover:bg-background-tertiary text-text-tertiary">
                <SmilePlus size={18} />
              </button>
            </div>
          </div>
          
          <button
            className="btn btn-primary h-10 w-10 p-0 flex-shrink-0 rounded-full"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;