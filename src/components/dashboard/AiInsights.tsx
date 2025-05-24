import { Sparkles, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface AiInsightsProps {
  isLoading?: boolean;
}

const AiInsights = ({ isLoading = false }: AiInsightsProps) => {
  const insights = [
    {
      id: 'ins1',
      title: 'Conversation Volume Increased',
      description: 'There was a 24% increase in conversation volume compared to last week.',
      type: 'info',
      icon: <TrendingUp size={16} className="text-primary" />,
      time: '2 hours ago'
    },
    {
      id: 'ins2',
      title: 'Customer Satisfaction Improving',
      description: 'CSAT scores have improved by 8% over the last 30 days.',
      type: 'positive',
      icon: <TrendingUp size={16} className="text-success" />,
      time: '1 day ago'
    },
    {
      id: 'ins3',
      title: 'Common Issue Detected',
      description: '18 conversations mentioned "payment failure" in the last 24 hours.',
      type: 'warning',
      icon: <AlertTriangle size={16} className="text-warning" />,
      time: '4 hours ago'
    },
    {
      id: 'ins4',
      title: 'Response Time Decreasing',
      description: 'Average first response time decreased by 12% this week.',
      type: 'negative',
      icon: <TrendingDown size={16} className="text-error" />,
      time: '1 day ago'
    }
  ];
  
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'positive':
        return 'border-l-success bg-success/5';
      case 'negative':
        return 'border-l-error bg-error/5';
      case 'warning':
        return 'border-l-warning bg-warning/5';
      default:
        return 'border-l-primary bg-primary/5';
    }
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 rounded-md bg-background-secondary animate-pulse"></div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {insights.map((insight) => (
        <div 
          key={insight.id} 
          className={`p-4 border-l-4 rounded-md ${getTypeStyles(insight.type)} scale-in`}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-background-primary">
              {insight.icon}
            </div>
            <h4 className="font-medium">{insight.title}</h4>
          </div>
          <p className="text-sm text-text-secondary mb-2">{insight.description}</p>
          <p className="text-xs text-text-tertiary">{insight.time}</p>
        </div>
      ))}
      
      <div className="md:col-span-2 flex items-center justify-center py-4 border border-dashed border-border rounded-md bg-background-secondary hover:bg-background-tertiary transition-colors cursor-pointer">
        <Sparkles size={16} className="text-primary mr-2" />
        <span className="text-sm font-medium">Generate More AI Insights</span>
      </div>
    </div>
  );
};

export default AiInsights;