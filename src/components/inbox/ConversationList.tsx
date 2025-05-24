import { useState, useEffect } from 'react';
import { User, Bot, AlertCircle } from 'lucide-react';

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
  status: 'active' | 'waiting' | 'resolved';
  lastMessage: Message;
  unread: boolean;
  assignedTo?: string;
  priority?: 'low' | 'medium' | 'high';
  messages: Message[];
}

interface ConversationListProps {
  filter?: string;
  searchQuery?: string;
  onSelectChat: (chat: Chat) => void;
}

const ConversationList = ({ filter = 'all', searchQuery = '', onSelectChat }: ConversationListProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching data
    setIsLoading(true);
    setTimeout(() => {
      const mockChats: Chat[] = [
        {
          id: 'chat-1',
          customer: {
            id: 'cust-1',
            name: 'Emily Johnson',
            email: 'emily@example.com',
          },
          status: 'active',
          lastMessage: {
            id: 1,
            sender: 'customer',
            content: 'I\'m having trouble with my payment. Can you help?',
            timestamp: '2023-05-23T10:25:00',
          },
          unread: true,
          priority: 'high',
          messages: [
            {
              id: 1,
              sender: 'customer',
              content: 'I\'m having trouble with my payment. Can you help?',
              timestamp: '2023-05-23T10:25:00',
            },
          ],
        },
        {
          id: 'chat-2',
          customer: {
            id: 'cust-2',
            name: 'Michael Smith',
            email: 'michael@example.com',
          },
          status: 'waiting',
          lastMessage: {
            id: 2,
            sender: 'ai',
            content: 'I\'ll need a bit more information to help troubleshoot this. Can you tell me what operating system and browser you\'re using?',
            timestamp: '2023-05-23T09:42:00',
          },
          unread: false,
          assignedTo: 'AI Assistant',
          messages: [
            {
              id: 1,
              sender: 'customer',
              content: 'The login page keeps loading indefinitely',
              timestamp: '2023-05-23T09:40:00',
            },
            {
              id: 2,
              sender: 'ai',
              content: 'I\'ll need a bit more information to help troubleshoot this. Can you tell me what operating system and browser you\'re using?',
              timestamp: '2023-05-23T09:42:00',
            },
          ],
        },
        {
          id: 'chat-3',
          customer: {
            id: 'cust-3',
            name: 'Sarah Williams',
            email: 'sarah@example.com',
          },
          status: 'resolved',
          lastMessage: {
            id: 3,
            sender: 'agent',
            content: 'Great! Glad we could resolve this for you. Feel free to reach out if you have any other questions.',
            timestamp: '2023-05-22T16:10:00',
          },
          unread: false,
          assignedTo: 'John Agent',
          messages: [
            {
              id: 1,
              sender: 'customer',
              content: 'I need to change my subscription plan',
              timestamp: '2023-05-22T15:55:00',
            },
            {
              id: 2,
              sender: 'agent',
              content: 'I can help with that. Which plan would you like to switch to?',
              timestamp: '2023-05-22T15:58:00',
            },
            {
              id: 3,
              sender: 'agent',
              content: 'Great! Glad we could resolve this for you. Feel free to reach out if you have any other questions.',
              timestamp: '2023-05-22T16:10:00',
            },
          ],
        },
        {
          id: 'chat-4',
          customer: {
            id: 'cust-4',
            name: 'David Brown',
            email: 'david@example.com',
          },
          status: 'active',
          lastMessage: {
            id: 4,
            sender: 'customer',
            content: 'Thanks for the quick response! I\'ll try that and let you know if it works.',
            timestamp: '2023-05-23T08:15:00',
          },
          unread: true,
          priority: 'medium',
          messages: [
            {
              id: 1,
              sender: 'customer',
              content: 'I can\'t export my data to CSV',
              timestamp: '2023-05-23T08:00:00',
            },
            {
              id: 2,
              sender: 'ai',
              content: 'I understand how frustrating that can be. Let\'s try clearing your browser cache first and then attempt the export again.',
              timestamp: '2023-05-23T08:05:00',
            },
            {
              id: 4,
              sender: 'customer',
              content: 'Thanks for the quick response! I\'ll try that and let you know if it works.',
              timestamp: '2023-05-23T08:15:00',
            },
          ],
        },
        {
          id: 'chat-5',
          customer: {
            id: 'cust-5',
            name: 'Jessica Miller',
            email: 'jessica@example.com',
          },
          status: 'waiting',
          lastMessage: {
            id: 5,
            sender: 'ai',
            content: 'Your account has been successfully upgraded to the Pro plan. You should now have access to all the premium features.',
            timestamp: '2023-05-22T11:30:00',
          },
          unread: false,
          assignedTo: 'AI Assistant',
          messages: [
            {
              id: 1,
              sender: 'customer',
              content: 'I\'d like to upgrade my account to the Pro plan',
              timestamp: '2023-05-22T11:20:00',
            },
            {
              id: 5,
              sender: 'ai',
              content: 'Your account has been successfully upgraded to the Pro plan. You should now have access to all the premium features.',
              timestamp: '2023-05-22T11:30:00',
            },
          ],
        },
      ];
      
      setChats(mockChats);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Filter chats based on filter and search query
  const filteredChats = chats.filter((chat) => {
    // Apply status filter
    if (filter !== 'all') {
      if (filter === 'unassigned' && chat.assignedTo) return false;
      if (filter === 'ai-waiting' && (!chat.assignedTo || !chat.assignedTo.includes('AI') || chat.status !== 'waiting')) return false;
      if (filter === 'resolved' && chat.status !== 'resolved') return false;
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        chat.customer.name.toLowerCase().includes(query) ||
        chat.customer.email.toLowerCase().includes(query) ||
        chat.lastMessage.content.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg border border-border p-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-background-tertiary"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-background-tertiary rounded w-1/3"></div>
                <div className="h-3 bg-background-tertiary rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (filteredChats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
          <AlertCircle size={24} className="text-primary" />
        </div>
        <h3 className="text-lg font-medium mb-2">No conversations found</h3>
        <p className="text-text-secondary max-w-md">
          {searchQuery 
            ? `No conversations matching "${searchQuery}"` 
            : "There are no conversations matching your filter criteria."}
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {filteredChats.map((chat) => (
        <div 
          key={chat.id}
          className={`cursor-pointer rounded-lg border ${
            chat.unread ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/30'
          } p-4 transition-all`}
          onClick={() => onSelectChat(chat)}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
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
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`font-medium truncate ${chat.unread ? 'text-primary' : ''}`}>
                  {chat.customer.name}
                </h3>
                <span className="text-xs text-text-tertiary">
                  {formatTime(chat.lastMessage.timestamp)}
                </span>
              </div>
              
              <div className="flex items-center mb-1 text-xs text-text-tertiary">
                <span className="truncate">{chat.customer.email}</span>
                
                {chat.priority && (
                  <span className={`ml-2 rounded-full px-1.5 py-0.5 text-xs ${
                    chat.priority === 'high' 
                      ? 'bg-error/10 text-error' 
                      : chat.priority === 'medium'
                      ? 'bg-warning/10 text-warning'
                      : 'bg-success/10 text-success'
                  }`}>
                    {chat.priority.charAt(0).toUpperCase() + chat.priority.slice(1)}
                  </span>
                )}
              </div>
              
              <p className="text-sm text-text-secondary line-clamp-2 mb-2">
                <span className="inline-flex mr-1">
                  {chat.lastMessage.sender === 'customer' ? (
                    <User size={14} className="mr-1 mt-0.5" />
                  ) : chat.lastMessage.sender === 'ai' ? (
                    <Bot size={14} className="mr-1 mt-0.5 text-secondary" />
                  ) : (
                    <User size={14} className="mr-1 mt-0.5 text-primary" />
                  )}
                </span>
                {chat.lastMessage.content}
              </p>
              
              <div className="flex items-center text-xs">
                {chat.status === 'active' && (
                  <span className="flex items-center text-success">
                    <span className="mr-1 h-1.5 w-1.5 rounded-full bg-success"></span>
                    Active
                  </span>
                )}
                
                {chat.status === 'waiting' && (
                  <span className="flex items-center text-warning">
                    <span className="mr-1 h-1.5 w-1.5 rounded-full bg-warning"></span>
                    Waiting
                  </span>
                )}
                
                {chat.status === 'resolved' && (
                  <span className="flex items-center text-text-tertiary">
                    <span className="mr-1 h-1.5 w-1.5 rounded-full bg-text-tertiary"></span>
                    Resolved
                  </span>
                )}
                
                {chat.assignedTo && (
                  <span className="ml-4 flex items-center">
                    {chat.assignedTo.includes('AI') ? (
                      <>
                        <Bot size={12} className="mr-1 text-secondary" />
                        <span className="text-secondary">{chat.assignedTo}</span>
                      </>
                    ) : (
                      <>
                        <User size={12} className="mr-1" />
                        <span>{chat.assignedTo}</span>
                      </>
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;