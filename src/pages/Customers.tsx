import { useState, useEffect } from 'react';
import { Search, Filter, ArrowUpDown, UserPlus, MoreHorizontal, PlusCircle } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  signupDate: string;
  lastActive: string;
  conversations: number;
  status: 'active' | 'inactive' | 'new';
  avatar?: string;
}

interface CustomersProps {
  onSelectCustomer: (customer: Customer) => void;
}

const Customers = ({ onSelectCustomer }: CustomersProps) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('lastActive');
  const [sortOrder, setSortOrder] = useState('desc');
  
  useEffect(() => {
    // Simulate fetching customers
    setIsLoading(true);
    setTimeout(() => {
      const mockCustomers: Customer[] = [
        {
          id: 'cust-1',
          name: 'Emily Johnson',
          email: 'emily@example.com',
          signupDate: '2023-02-15T10:30:00',
          lastActive: '2023-05-23T10:25:00',
          conversations: 8,
          status: 'active',
        },
        {
          id: 'cust-2',
          name: 'Michael Smith',
          email: 'michael@example.com',
          signupDate: '2023-01-20T14:15:00',
          lastActive: '2023-05-23T09:42:00',
          conversations: 5,
          status: 'active',
        },
        {
          id: 'cust-3',
          name: 'Sarah Williams',
          email: 'sarah@example.com',
          signupDate: '2022-11-05T09:20:00',
          lastActive: '2023-05-22T16:10:00',
          conversations: 12,
          status: 'active',
        },
        {
          id: 'cust-4',
          name: 'David Brown',
          email: 'david@example.com',
          signupDate: '2023-04-12T11:45:00',
          lastActive: '2023-05-23T08:15:00',
          conversations: 2,
          status: 'new',
        },
        {
          id: 'cust-5',
          name: 'Jessica Miller',
          email: 'jessica@example.com',
          signupDate: '2022-09-30T16:20:00',
          lastActive: '2023-05-22T11:30:00',
          conversations: 7,
          status: 'active',
        },
        {
          id: 'cust-6',
          name: 'Thomas Wilson',
          email: 'thomas@example.com',
          signupDate: '2023-03-05T13:10:00',
          lastActive: '2023-05-20T15:45:00',
          conversations: 3,
          status: 'inactive',
        },
        {
          id: 'cust-7',
          name: 'Olivia Davis',
          email: 'olivia@example.com',
          signupDate: '2023-05-01T10:00:00',
          lastActive: '2023-05-23T14:30:00',
          conversations: 1,
          status: 'new',
        },
        {
          id: 'cust-8',
          name: 'James Taylor',
          email: 'james@example.com',
          signupDate: '2022-08-15T09:30:00',
          lastActive: '2023-05-15T11:20:00',
          conversations: 15,
          status: 'inactive',
        },
      ];
      
      setCustomers(mockCustomers);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Filter and sort customers
  const filteredCustomers = customers
    .filter((customer) => {
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'signupDate') {
        comparison = new Date(a.signupDate).getTime() - new Date(b.signupDate).getTime();
      } else if (sortBy === 'lastActive') {
        comparison = new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime();
      } else if (sortBy === 'conversations') {
        comparison = a.conversations - b.conversations;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 30) {
      return `${diffDays}d ago`;
    } else {
      return formatDate(dateString);
    }
  };
  
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
        <button className="btn btn-primary">
          <UserPlus size={16} className="mr-2" />
          Add Customer
        </button>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <input
            type="search"
            placeholder="Search customers..."
            className="input h-10 w-full pl-9 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <button className="btn btn-outline py-1 px-3">
            <Filter size={16} className="mr-2" />
            Filters
          </button>
          <button className="btn btn-outline py-1 px-3">
            <ArrowUpDown size={16} className="mr-2" />
            Sort
          </button>
        </div>
      </div>
      
      {/* Customers table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-background-secondary border-b border-border">
              <th className="py-3 px-4 text-left font-medium text-text-secondary">
                <button 
                  className="flex items-center"
                  onClick={() => handleSort('name')}
                >
                  Name
                  {sortBy === 'name' && (
                    <ArrowUpDown size={14} className="ml-1" />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-left font-medium text-text-secondary">Email</th>
              <th className="py-3 px-4 text-left font-medium text-text-secondary">
                <button 
                  className="flex items-center"
                  onClick={() => handleSort('signupDate')}
                >
                  Signup Date
                  {sortBy === 'signupDate' && (
                    <ArrowUpDown size={14} className="ml-1" />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-left font-medium text-text-secondary">
                <button 
                  className="flex items-center"
                  onClick={() => handleSort('lastActive')}
                >
                  Last Active
                  {sortBy === 'lastActive' && (
                    <ArrowUpDown size={14} className="ml-1" />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-left font-medium text-text-secondary">
                <button 
                  className="flex items-center"
                  onClick={() => handleSort('conversations')}
                >
                  Conversations
                  {sortBy === 'conversations' && (
                    <ArrowUpDown size={14} className="ml-1" />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-left font-medium text-text-secondary">Status</th>
              <th className="py-3 px-4 text-left font-medium text-text-secondary"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Loading skeleton
              Array(5).fill(0).map((_, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-background-tertiary animate-pulse"></div>
                      <div className="h-4 w-24 bg-background-tertiary animate-pulse rounded"></div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-32 bg-background-tertiary animate-pulse rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-20 bg-background-tertiary animate-pulse rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-16 bg-background-tertiary animate-pulse rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-8 bg-background-tertiary animate-pulse rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-16 bg-background-tertiary animate-pulse rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-4 bg-background-tertiary animate-pulse rounded"></div>
                  </td>
                </tr>
              ))
            ) : filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-text-secondary">
                  No customers found.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr 
                  key={customer.id} 
                  className="border-b border-border hover:bg-background-secondary cursor-pointer transition-colors"
                  onClick={() => onSelectCustomer(customer)}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {customer.avatar ? (
                        <img 
                          src={customer.avatar} 
                          alt={customer.name} 
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {customer.name.charAt(0)}
                        </div>
                      )}
                      <span className="font-medium">{customer.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">{customer.email}</td>
                  <td className="py-3 px-4 text-text-secondary">{formatDate(customer.signupDate)}</td>
                  <td className="py-3 px-4 text-text-secondary">{getTimeAgo(customer.lastActive)}</td>
                  <td className="py-3 px-4 text-text-secondary">{customer.conversations}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      customer.status === 'active' 
                        ? 'bg-success/10 text-success' 
                        : customer.status === 'new'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-text-tertiary/10 text-text-tertiary'
                    }`}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="p-1 rounded hover:bg-background-tertiary">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-text-secondary">
          Showing <span className="font-medium">{filteredCustomers.length}</span> of <span className="font-medium">{customers.length}</span> customers
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            className="btn btn-outline py-1 px-3"
            disabled={true}
          >
            Previous
          </button>
          <button 
            className="btn btn-outline py-1 px-3 bg-primary text-white"
          >
            1
          </button>
          <button 
            className="btn btn-outline py-1 px-3"
          >
            2
          </button>
          <button 
            className="btn btn-outline py-1 px-3"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customers;