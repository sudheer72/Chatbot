import { User, MessageSquare, UserPlus, Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'message' | 'user' | 'status';
  content: string;
  time: string;
}

interface RecentActivityProps {
  isLoading?: boolean;
}

const RecentActivity = ({ isLoading = false }: RecentActivityProps) => {
  const activities: Activity[] = [
    {
      id: 'act1',
      type: 'message',
      content: 'New message from Sarah Johnson',
      time: '5 minutes ago'
    },
    {
      id: 'act2',
      type: 'user',
      content: 'Jane Smith signed up',
      time: '12 minutes ago'
    },
    {
      id: 'act3',
      type: 'status',
      content: 'AI resolved support ticket #4528',
      time: '25 minutes ago'
    },
    {
      id: 'act4',
      type: 'message',
      content: 'Alex replied to a conversation',
      time: '1 hour ago'
    },
    {
      id: 'act5',
      type: 'user',
      content: 'Marcus Weber signed up',
      time: '2 hours ago'
    }
  ];
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare size={16} className="text-primary" />;
      case 'user':
        return <UserPlus size={16} className="text-secondary" />;
      case 'status':
        return <Clock size={16} className="text-accent" />;
      default:
        return <MessageSquare size={16} />;
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-background-tertiary animate-pulse"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-background-tertiary animate-pulse rounded w-3/4"></div>
              <div className="h-3 bg-background-tertiary animate-pulse rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 fade-in-up">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background-tertiary">
            {getIcon(activity.type)}
          </div>
          <div>
            <p className="text-sm">{activity.content}</p>
            <p className="text-xs text-text-tertiary">{activity.time}</p>
          </div>
        </div>
      ))}
      <button className="w-full py-2 text-center text-sm text-primary hover:underline">
        View all activity
      </button>
    </div>
  );
};

export default RecentActivity;