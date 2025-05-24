import { useState } from 'react';
import { Search, Filter, ArrowUpDown, Inbox as InboxIcon, Star, Clock, CheckCheck } from 'lucide-react';
import ConversationList from '../components/inbox/ConversationList';

interface InboxProps {
  onSelectChat: (chat: any) => void;
}

const Inbox = ({ onSelectChat }: InboxProps) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filters = [
    { id: 'all', label: 'All', icon: <InboxIcon size={16} /> },
    { id: 'unassigned', label: 'Unassigned', icon: <Star size={16} /> },
    { id: 'ai-waiting', label: 'AI Waiting', icon: <Clock size={16} /> },
    { id: 'resolved', label: 'Resolved', icon: <CheckCheck size={16} /> },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Inbox</h2>
        <div className="flex items-center gap-2">
          <button className="btn btn-outline py-1 px-3">
            <Filter size={16} className="mr-2" />
            Filters
          </button>
          <button className="btn btn-outline py-1 px-3">
            <ArrowUpDown size={16} className="mr-2" />
            Sort
          </button>
        </div>
      </div>
      
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
        <input
          type="search"
          placeholder="Search conversations..."
          className="input h-10 w-full pl-9 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? 'bg-primary text-white'
                : 'bg-background-tertiary text-text-secondary hover:bg-background-tertiary/80'
            }`}
            onClick={() => setActiveFilter(filter.id)}
          >
            <span className="mr-1.5">{filter.icon}</span>
            <span>{filter.label}</span>
          </button>
        ))}
      </div>
      
      {/* Conversation list */}
      <ConversationList 
        filter={activeFilter}
        searchQuery={searchQuery} 
        onSelectChat={onSelectChat}
      />
    </div>
  );
};

export default Inbox;