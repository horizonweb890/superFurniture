import React from 'react';
import { 
  BarChart as ChartBar, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Clock, 
  ClipboardList 
} from 'lucide-react';

const Dashboard = () => {
  const statistics = {
    totalUsers: 120,
    activeUsers: 98,
    totalRevenue: 15000,
    newOrders: 32,
    monthlyVisitors: 1200,
    conversionRate: 5.6,
    supportTickets: 48
  };

  const cardsData = [
    {
      title: 'Total Users',
      value: statistics.totalUsers,
      icon: Users,
      bgColor: 'bg-blue-600',
      textColor: 'text-blue-100'
    },
    {
      title: 'Active Users',
      value: statistics.activeUsers,
      icon: ChartBar,
      bgColor: 'bg-green-600',
      textColor: 'text-green-100'
    },
    {
      title: 'Total Revenue',
      value: `$${statistics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      bgColor: 'bg-yellow-600',
      textColor: 'text-yellow-100'
    },
    {
      title: 'New Orders',
      value: statistics.newOrders,
      icon: ShoppingCart,
      bgColor: 'bg-red-600',
      textColor: 'text-red-100'
    }
  ];

  const activities = [
    {
      description: 'User "Abhishek" updated their profile',
      time: '3 hours ago',
      icon: Users
    },
    {
      description: 'Order #213 has been shipped',
      time: '5 hours ago',
      icon: ShoppingCart
    },
    {
      description: 'New user "John Doe" registered',
      time: '1 day ago',
      icon: Users
    },
    {
      description: 'Support ticket #102 was resolved',
      time: '2 days ago',
      icon: ClipboardList
    }
  ];

  return (
    <div className="min-h-screen lg:ml-64 my-8 bg-gray-50 p-4 md:p-8">
      <div className="container mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Overview of your latest statistics and performance
          </p>
        </header>

        {/* Statistics Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cardsData.map((card, index) => (
            <div 
              key={index} 
              className={`${card.bgColor} ${card.textColor} rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105`}
            >
              <div className="p-6 flex items-center justify-between">
                <div className="p-3 rounded-full bg-white/20">
                  <card.icon className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium uppercase tracking-wider opacity-75">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Additional Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { 
              title: 'Monthly Visitors', 
              value: statistics.monthlyVisitors,
              icon: Clock 
            },
            { 
              title: 'Conversion Rate', 
              value: `${statistics.conversionRate}%`,
              icon: ChartBar 
            },
            { 
              title: 'Support Tickets', 
              value: statistics.supportTickets,
              icon: ClipboardList 
            }
          ].map((metric, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <metric.icon className="w-8 h-8 text-gray-500" />
                <p className="text-xl font-bold text-gray-800">{metric.value}</p>
              </div>
              <h3 className="text-base font-semibold text-gray-600">{metric.title}</h3>
            </div>
          ))}
        </section>

        {/* Latest Activities */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Latest Activities
          </h3>
          <ul className="space-y-4">
            {activities.map((activity, index) => (
              <li 
                key={index} 
                className="flex items-center justify-between py-4 border-b last:border-b-0 border-gray-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <activity.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-gray-700">{activity.description}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;