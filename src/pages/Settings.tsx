import { useState } from 'react';
import { 
  Save, User, Building, Bell, Shield, Bot, MessageSquare, 
  Zap, Upload, HelpCircle, Info
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  const tabs = [
    { id: 'general', label: 'General', icon: <Building size={16} /> },
    { id: 'profile', label: 'Your Profile', icon: <User size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'security', label: 'Security', icon: <Shield size={16} /> },
    { id: 'ai', label: 'AI Assistant', icon: <Bot size={16} /> },
    { id: 'chatbot', label: 'Chatbot', icon: <MessageSquare size={16} /> },
    { id: 'integrations', label: 'Integrations', icon: <Zap size={16} /> },
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'ai':
        return <AiSettings />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <HelpCircle size={48} className="text-text-tertiary mb-4" />
            <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
            <p className="text-text-secondary max-w-md">
              This section is currently under development and will be available soon.
            </p>
          </div>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-background-secondary rounded-lg border border-border overflow-hidden">
            <nav className="flex flex-col">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center px-4 py-3 text-sm ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'hover:bg-background-tertiary text-text-primary'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="mr-3">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Content */}
        <div className="md:col-span-3">
          <div className="bg-background-primary rounded-lg border border-border p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const GeneralSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Company Details</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="company-name" className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <input
              id="company-name"
              type="text"
              className="input w-full"
              defaultValue="BeyondChats"
            />
          </div>
          
          <div>
            <label htmlFor="website" className="block text-sm font-medium mb-1">
              Website URL
            </label>
            <input
              id="website"
              type="url"
              className="input w-full"
              defaultValue="https://beyondchats.com"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="industry" className="block text-sm font-medium mb-1">
                Industry
              </label>
              <select id="industry" className="input w-full">
                <option>Software & Technology</option>
                <option>E-commerce</option>
                <option>Education</option>
                <option>Healthcare</option>
                <option>Financial Services</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="size" className="block text-sm font-medium mb-1">
                Company Size
              </label>
              <select id="size" className="input w-full">
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option>51-200 employees</option>
                <option>201-500 employees</option>
                <option>501+ employees</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-medium mb-4">Branding</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Company Logo
            </label>
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-md bg-background-tertiary flex items-center justify-center">
                <span className="text-lg font-bold text-primary">BC</span>
              </div>
              <button className="btn btn-outline">
                <Upload size={16} className="mr-2" />
                Upload New Logo
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="primary-color" className="block text-sm font-medium mb-1">
              Primary Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                id="primary-color"
                defaultValue="#387CFF"
                className="h-10 w-10 rounded border-none"
              />
              <input
                type="text"
                defaultValue="#387CFF"
                className="input w-32"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-medium mb-4">Widget Settings</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="welcome-message" className="block text-sm font-medium mb-1">
              Welcome Message
            </label>
            <textarea
              id="welcome-message"
              className="input w-full min-h-[80px]"
              defaultValue="👋 Hi there! How can we help you today?"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="offline-support"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                defaultChecked
              />
              <label htmlFor="offline-support" className="ml-2 block text-sm">
                Show widget when offline
              </label>
            </div>
            <Info size={16} className="text-text-tertiary" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="auto-messages"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                defaultChecked
              />
              <label htmlFor="auto-messages" className="ml-2 block text-sm">
                Enable automatic messages
              </label>
            </div>
            <Info size={16} className="text-text-tertiary" />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <button className="btn btn-primary">
          <Save size={16} className="mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

const AiSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">AI Assistant Configuration</h3>
          <span className="badge badge-primary">Active</span>
        </div>
        
        <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <Bot size={20} className="text-secondary mt-1 mr-3" />
            <div>
              <h4 className="font-medium mb-1">Your AI assistant is fully configured</h4>
              <p className="text-sm text-text-secondary">
                Your AI assistant is ready to handle customer inquiries. It has been trained on your knowledge base and company information.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="ai-name" className="block text-sm font-medium mb-1">
              Assistant Name
            </label>
            <input
              id="ai-name"
              type="text"
              className="input w-full"
              defaultValue="BeyondChats AI"
            />
          </div>
          
          <div>
            <label htmlFor="ai-personality" className="block text-sm font-medium mb-1">
              Personality
            </label>
            <select id="ai-personality" className="input w-full">
              <option>Professional</option>
              <option>Friendly</option>
              <option>Casual</option>
              <option>Technical</option>
              <option>Custom</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="ai-language" className="block text-sm font-medium mb-1">
              Primary Language
            </label>
            <select id="ai-language" className="input w-full">
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Japanese</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-medium mb-4">Conversation Handling</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">AI First Response</h4>
              <p className="text-sm text-text-secondary">
                Allow AI to respond to new conversations before human agents
              </p>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                id="ai-first"
                className="sr-only"
                defaultChecked
              />
              <label
                htmlFor="ai-first"
                className="flex h-6 w-11 cursor-pointer rounded-full bg-background-tertiary p-1 transition-colors duration-200 ease-in-out focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
              >
                <span
                  className="h-4 w-4 translate-x-0 transform rounded-full bg-white transition duration-200 ease-in-out"
                  style={{ transform: 'translateX(20px)' }}
                />
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Human Handoff</h4>
              <p className="text-sm text-text-secondary">
                Automatically transfer complex conversations to human agents
              </p>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                id="human-handoff"
                className="sr-only"
                defaultChecked
              />
              <label
                htmlFor="human-handoff"
                className="flex h-6 w-11 cursor-pointer rounded-full bg-background-tertiary p-1 transition-colors duration-200 ease-in-out focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
              >
                <span
                  className="h-4 w-4 translate-x-0 transform rounded-full bg-white transition duration-200 ease-in-out"
                  style={{ transform: 'translateX(20px)' }}
                />
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="confidence-threshold" className="block text-sm font-medium mb-1">
              Confidence Threshold
            </label>
            <div className="flex items-center space-x-3">
              <input 
                type="range" 
                id="confidence-threshold" 
                min="0" 
                max="100" 
                defaultValue="75"
                className="w-full h-2 bg-background-tertiary rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium w-8">75%</span>
            </div>
            <p className="text-xs text-text-tertiary mt-1">
              AI will only respond when it's at least 75% confident in its answer
            </p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-medium mb-4">Knowledge Base</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                <span className="text-primary">KB</span>
              </div>
              <div>
                <h4 className="font-medium">Main Knowledge Base</h4>
                <p className="text-xs text-text-tertiary">28 articles · Last updated 2 days ago</p>
              </div>
            </div>
            <button className="btn btn-outline py-1 px-3 text-xs">
              Manage
            </button>
          </div>
          
          <button className="flex items-center justify-center w-full p-4 border border-dashed border-border rounded-lg hover:bg-background-secondary transition-colors">
            <PlusCircle size={16} className="mr-2" />
            <span>Add New Knowledge Base</span>
          </button>
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <button className="btn btn-primary">
          <Save size={16} className="mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;