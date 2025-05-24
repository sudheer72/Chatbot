import { ReactNode } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: ReactNode;
  iconColor?: string;
  isLoading?: boolean;
}

const StatCard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  iconColor = 'bg-primary/10 text-primary',
  isLoading = false,
}: StatCardProps) => {
  return (
    <div className="card p-5 transition-all hover:border-primary/20">
      {isLoading ? (
        <div className="space-y-3">
          <div className="h-6 w-24 bg-background-tertiary animate-pulse rounded"></div>
          <div className="h-8 w-16 bg-background-tertiary animate-pulse rounded"></div>
          <div className="h-5 w-20 bg-background-tertiary animate-pulse rounded"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">{title}</p>
            {icon && (
              <div className={`rounded-full p-2 ${iconColor}`}>
                {icon}
              </div>
            )}
          </div>
          <p className="mt-2 text-2xl font-bold">{value}</p>
          {change && (
            <div 
              className={`mt-1 flex items-center text-xs ${
                changeType === 'positive' 
                  ? 'text-success' 
                  : changeType === 'negative' 
                  ? 'text-error' 
                  : 'text-text-secondary'
              }`}
            >
              {changeType === 'positive' ? (
                <ArrowUp size={14} className="mr-1" />
              ) : changeType === 'negative' ? (
                <ArrowDown size={14} className="mr-1" />
              ) : null}
              <span>{change} from last period</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StatCard;