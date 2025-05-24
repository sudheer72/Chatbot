import { useState, useEffect } from 'react';
import { BarChart, MessageSquare, Users, TrendingUp, ArrowUpRight, HelpCircle } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import LineChart from '../components/charts/LineChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import AiInsights from '../components/dashboard/AiInsights';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      title: 'Active Conversations',
      value: '28',
      change: '+12%',
      changeType: 'positive',
      icon: <MessageSquare size={20} />,
      iconColor: 'text-primary bg-primary/10',
    },
    {
      title: 'Total Customers',
      value: '3,942',
      change: '+5.2%',
      changeType: 'positive',
      icon: <Users size={20} />,
      iconColor: 'text-secondary bg-secondary/10',
    },
    {
      title: 'AI Resolutions',
      value: '67%',
      change: '+8.4%',
      changeType: 'positive',
      icon: <TrendingUp size={20} />,
      iconColor: 'text-accent bg-accent/10',
    },
    {
      title: 'Avg. Response Time',
      value: '1.4m',
      change: '-16%',
      changeType: 'positive',
      icon: <BarChart size={20} />,
      iconColor: 'text-success bg-success/10',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <select className="input py-1 px-3 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
          <button className="btn btn-primary">
            <ArrowUpRight size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            iconColor={stat.iconColor}
            isLoading={isLoading}
          />
        ))}
      </div>
      
      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation Trends Chart */}
        <div className="lg:col-span-2 card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Conversation Trends</h3>
            <button className="p-1 rounded hover:bg-background-tertiary">
              <HelpCircle size={16} />
            </button>
          </div>
          {isLoading ? (
            <div className="h-[300px] flex items-center justify-center bg-background-secondary animate-pulse rounded-md"></div>
          ) : (
            <LineChart />
          )}
        </div>
        
        {/* Recent Activity */}
        <div className="card">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <RecentActivity isLoading={isLoading} />
        </div>
      </div>
      
      {/* AI Insights */}
      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">AI Insights</h3>
          <button className="btn btn-outline py-1 px-3 text-xs">View All</button>
        </div>
        <AiInsights isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Dashboard;