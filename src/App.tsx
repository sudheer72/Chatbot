import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Inbox from './pages/Inbox';
import Customers from './pages/Customers';
import Settings from './pages/Settings';
import ChatDetail from './pages/ChatDetail';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedChat, setSelectedChat] = useState(null);

  const renderPage = () => {
    if (selectedChat) {
      return (
        <ChatDetail 
          chat={selectedChat} 
          onBack={() => {
            setSelectedChat(null);
          }} 
        />
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'inbox':
        return <Inbox onSelectChat={setSelectedChat} />;
      case 'customers':
        return <Customers onSelectCustomer={(customer) => {
          // Find the customer's most recent chat
          setSelectedChat({
            id: `chat-${customer.id}`,
            customer: customer,
            messages: [
              { id: 1, sender: 'customer', content: 'Hello, I need some help with your product.', timestamp: '2023-05-20T14:30:00' },
              { id: 2, sender: 'ai', content: 'I\'d be happy to help! What specific issue are you experiencing?', timestamp: '2023-05-20T14:31:00' }
            ]
          });
        }} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <Layout 
        currentPage={currentPage} 
        setCurrentPage={(page) => {
          setCurrentPage(page);
          // Reset selected chat when changing pages
          setSelectedChat(null);
        }}
        isDetailView={!!selectedChat}
      >
        {renderPage()}
      </Layout>
    </ThemeProvider>
  );
}

export default App;