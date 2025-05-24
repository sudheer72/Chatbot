export interface Customer {
  id: string;
  name: string;
  email: string;
  signupDate: string;
  lastActive: string;
  conversations: number;
  status: 'active' | 'inactive' | 'new';
  avatar?: string;
}

export interface Message {
  id: number;
  sender: 'customer' | 'agent' | 'ai';
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  customer: Customer;
  status: 'active' | 'waiting' | 'resolved';
  lastMessage: Message;
  unread: boolean;
  assignedTo?: string;
  priority?: 'low' | 'medium' | 'high';
  messages: Message[];
}

export interface Activity {
  id: string;
  type: 'message' | 'user' | 'status';
  content: string;
  time: string;
}