import { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Menu } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isDetailView?: boolean;
}

const Layout = ({ children, currentPage, setCurrentPage, isDetailView = false }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close sidebar on mobile when navigating to detail view
  useEffect(() => {
    if (isMobile && isDetailView) {
      setSidebarOpen(false);
    }
  }, [isMobile, isDetailView]);

  return (
    <div className="flex h-screen overflow-hidden bg-background-primary text-text-primary">
      {/* Sidebar - with transition */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={(page) => {
            setCurrentPage(page);
            if (isMobile) {
              setSidebarOpen(false);
            }
          }} 
        />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          title={currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} 
          showBackButton={isDetailView}
          onBack={() => setCurrentPage(currentPage)}
        >
          {!isDetailView && (
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-background-tertiary"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
          )}
        </Header>
        
        <main className={`flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300 ${
          isDetailView ? 'fade-in' : ''
        }`}>
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;