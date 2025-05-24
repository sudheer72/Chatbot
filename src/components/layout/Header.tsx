import { ReactNode } from 'react';
import { ArrowLeft, Bell, Search } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  title: string;
  children?: ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
}

const Header = ({ title, children, showBackButton = false, onBack }: HeaderProps) => {
  const { theme } = useTheme();
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border bg-background-primary/80 backdrop-blur-sm px-4">
      <div className="flex items-center space-x-4 flex-1">
        {children}
        
        {showBackButton && (
          <button
            onClick={onBack}
            className="mr-2 flex items-center text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span className="text-sm font-medium">Back</span>
          </button>
        )}
        
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <input
            type="search"
            placeholder="Search..."
            className="input h-9 w-64 pl-9 text-sm focus:w-80 transition-all"
          />
        </div>
        
        <button className="relative p-2 rounded-full hover:bg-background-tertiary">
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;