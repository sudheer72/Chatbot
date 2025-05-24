import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut, 
  Sun, 
  Moon,
  BarChart,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Sidebar = ({ currentPage, setCurrentPage }: SidebarProps) => {
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'inbox', label: 'Inbox', icon: <MessageSquare size={20} />, badge: 12 },
    { id: 'customers', label: 'Customers', icon: <Users size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    { id: 'help', label: 'Help & Support', icon: <HelpCircle size={20} /> },
  ];

  const toggleSection = (sectionId: string) => {
    setCollapsed(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="flex h-full flex-col border-r border-border bg-background-secondary">
      {/* Logo and company name */}
      <div className="flex h-16 items-center px-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-lg font-bold text-white">BC</span>
          </div>
          <span className="text-lg font-semibold">BeyondChats</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-primary text-white'
                    : 'text-text-primary hover:bg-background-tertiary'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    currentPage === item.id
                      ? 'bg-white text-primary'
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-border pt-6">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-background-tertiary"
          >
            <span className="mr-3">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </span>
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>
      </nav>

      {/* User profile */}
      <div className="border-t border-border p-4">
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-medium">JS</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">John Smith</p>
            <p className="text-xs text-text-tertiary">Admin</p>
          </div>
          <button className="ml-auto p-1 hover:bg-background-tertiary rounded">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;