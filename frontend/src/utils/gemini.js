// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: "text/plain",
  };
  const model = "gemini-2.5-pro-preview-06-05";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `
Generate a complete React project with modern best practices. Create multiple components organized in logical folders using .js extensions.

STYLING & DESIGN:
- Use Tailwind CSS exclusively for styling (loaded via CDN)
- Create beautiful, modern, production-ready designs with proper spacing and typography
- Use gradients, shadows, and animations for visual appeal
- Implement responsive design for mobile and desktop
- Add hover effects and smooth transitions

COMPONENTS & STRUCTURE:
- Create reusable components in separate files
- Use React hooks (useState, useEffect, useContext, etc.) appropriately
- Implement proper component composition and props passing
- Add error boundaries where needed

ICONS & IMAGES:
- Use lucide-react icons when needed: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, ArrowRight
- Import icons like: import { Heart } from "lucide-react"
- Use emojis for additional visual elements
- For images, use Unsplash URLs or placeholder: https://archive.org/download/placeholder-image/placeholder-image.jpg

AVAILABLE PACKAGES (use only when needed):
- lucide-react (icons)
- react-router-dom (routing)
- date-fns (date manipulation)
- react-chartjs-2 & chart.js (charts)
- firebase (backend)
- @google/generative-ai (AI integration)
- tailwind-merge (class merging)
- uuid4 (unique IDs)

REQUIRED FILES:
- /src/index.js (React entry point)
- /src/App.js (Main app component)  
- /src/App.css (Custom styles)

RESPONSE FORMAT:
{
  "projectTitle": "Descriptive project name",
  "explanation": "One paragraph explaining the project structure, purpose, and key features",
  "files": {
    "/src/App.js": { "code": "..." },
    "/src/index.js": { "code": "..." },
    "/src/App.css": { "code": "..." },
    "/src/components/ComponentName.js": { "code": "..." }
  },
  "generatedFiles": ["/src/App.js", "/src/index.js", ...]
}

Make the application fully functional with proper state management, event handling, and user interactions. Focus on creating something that feels polished and production-ready.
`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `**Developing the Project Scope**

I'm currently fleshing out the scope for "AuraDash," a modern dashboard application. The idea is to demonstrate React's capabilities by integrating state management, charts, and a responsive layout. The core functionalities are taking shape, and I'm aiming for a professional feel.


**Planning the React Structure**

I'm now laying out the React project's foundation. "AuraDash" will feature a dashboard interface and state management, responsive design, and professional UI. Tailwind CDN will be integrated for styling, emphasizing a dark theme with gradients and shadows. I'm focusing on responsiveness and hover effects.


**Outlining Project Components**

I'm making headway on the structure of "AuraDash." I've finalized the component breakdown, with separate folders for layout, UI, and dashboard-specific elements. I'll include React Context for managing sidebar state and custom hooks for window size. I've also added a pages folder, though I won't use react-router-dom, at least for now. I'm focusing on layout first, and will then implement the mock data.


**Structuring AuraDash Project**

I'm now diving deep into the project's architecture for "AuraDash." I'll define component folders, starting with \`layout\`, \`ui\`, and \`dashboard\` components. Context for sidebar state management is planned. I'll include React Context for sidebar state and hooks for window size. Although routing isn't explicitly requested, I'm planning for future expansion with a pages directory. Mock data files will be added to test components and functionalities.


**Designing AuraDash's Structure**

I'm now fully immersed in the creation of "AuraDash." I've meticulously laid out the project structure, including key folders and components like \`layout\`, \`ui\`, and \`dashboard\`. My focus is on creating a comprehensive architecture that seamlessly integrates Tailwind CSS, a dark, gradient-rich theme, and responsive design principles. I'm focusing on responsiveness and hover effects. This ensures a visually appealing and user-friendly dashboard application. I will create a simple \`AppContext\` for the sidebar's state management, and will add mock data.


**Building AuraDash's Framework**

I'm now fully immersed in the creation of "AuraDash." I've meticulously laid out the project structure, including key folders and components like \`layout\`, \`ui\`, and \`dashboard\`. My focus is on creating a comprehensive architecture that seamlessly integrates Tailwind CSS, a dark, gradient-rich theme, and responsive design principles. I'm focusing on responsiveness and hover effects. This ensures a visually appealing and user-friendly dashboard application. I will create a simple \`AppContext\` for the sidebar's state management, and will add mock data.


**Commencing Project Implementation**

I'm now in the process of building "AuraDash." I've meticulously crafted the file structure and added the necessary mock data. I'm focusing on responsiveness, a dark, gradient-rich theme, and subtle hover effects to create a visually appealing dashboard application. I will create the layout, ui, and dashboard components, and then hook everything up!


**Implementing the AuraDash Structure**

I've successfully structured the project and included necessary mock data and utilities. I've begun crafting the layout, UI, and dashboard components. I'm focusing on responsiveness, a sleek dark theme, and subtle hover effects. I'm building a simple \`AppContext\` to manage sidebar state.


**Initiating the Component Build**

I've transitioned to the implementation phase. I'm focusing on crafting the essential React components, including the \`AppProvider\`, \`Sidebar\`, \`Header\`, and fundamental UI elements. Tailwind CSS will be integrated for styling, and I'll include a simple \`AppContext\` for the sidebar's state.


**Building Dashboard Components**

I've initiated the building of core components, including \`AppProvider\`, \`Sidebar\`, \`Header\`, and fundamental UI elements. Tailwind CSS will provide the styling, and a simple context will manage the sidebar. I'm focusing on responsiveness and smooth animations for a modern user experience.


`,
        },
        {
          text: `\`\`\`json
{
  "projectTitle": "AuraDash - Modern React Dashboard",
  "explanation": "AuraDash is a fully functional, production-ready dashboard application built with React and styled exclusively with Tailwind CSS. The project demonstrates modern React best practices, including component-based architecture, hooks for state management (useState, useContext), and component composition. It features a responsive, dark-themed UI with gradients, shadows, and smooth animations for a polished user experience. The codebase is organized into logical folders for layout, UI components, and dashboard widgets, promoting reusability and maintainability. Key features include a collapsible sidebar managed by a global context, interactive charts using \`react-chartjs-2\`, a dynamic activity feed, and an error boundary to ensure application stability.",
  "files": {
    "/public/index.html": {
      "code": "<!DOCTYPE html>\\n<html lang=\\"en\\">\\n  <head>\\n    <meta charset=\\"utf-8\\" />\\n    <link rel=\\"icon\\" href=\\"%PUBLIC_URL%/favicon.ico\\" />\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1\\" />\\n    <meta name=\\"theme-color\\" content=\\"#000000\\" />\\n    <meta\\n      name=\\"description\\"\\n      content=\\"AuraDash - Modern React Dashboard\\"\\n    />\\n    <link rel=\\"apple-touch-icon\\" href=\\"%PUBLIC_URL%/logo192.png\\" />\\n    <link rel=\\"manifest\\" href=\\"%PUBLIC_URL%/manifest.json\\" />\\n    <script src=\\"https://cdn.tailwindcss.com\\"></script>\\n    <title>AuraDash</title>\\n  </head>\\n  <body>\\n    <noscript>You need to enable JavaScript to run this app.</noscript>\\n    <div id=\\"root\\"></div>\\n  </body>\\n</html>\\n"
    },
    "/src/index.js": {
      "code": "import React from 'react';\\nimport ReactDOM from 'react-dom/client';\\nimport './App.css';\\nimport App from './App';\\n\\nconst root = ReactDOM.createRoot(document.getElementById('root'));\\nroot.render(\\n  <React.StrictMode>\\n    <App />\\n  </React.StrictMode>\\n);\\n"
    },
    "/src/App.css": {
      "code": "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');\\n\\nbody {\\n  font-family: 'Inter', sans-serif;\\n  background-color: #0f172a; /* slate-900 */\\n  color: #f8fafc; /* slate-50 */\\n  -webkit-font-smoothing: antialiased;\\n  -moz-osx-font-smoothing: grayscale;\\n}\\n\\n/* Custom scrollbar for a more modern look */\\n::-webkit-scrollbar {\\n  width: 8px;\\n  height: 8px;\\n}\\n\\n::-webkit-scrollbar-track {\\n  background: #1e293b; /* slate-800 */\\n}\\n\\n::-webkit-scrollbar-thumb {\\n  background: #475569; /* slate-600 */\\n  border-radius: 10px;\\n}\\n\\n::-webkit-scrollbar-thumb:hover {\\n  background: #64748b; /* slate-500 */\\n}\\n\\n/* Simple fade-in animation */\\n.fade-in {\\n  animation: fadeInAnimation ease 0.5s;\\n  animation-iteration-count: 1;\\n  animation-fill-mode: forwards;\\n}\\n\\n@keyframes fadeInAnimation {\\n  0% {\\n    opacity: 0;\\n    transform: translateY(10px);\\n  }\\n  100% {\\n    opacity: 1;\\n    transform: translateY(0);\\n  }\\n}\\n"
    },
    "/src/App.js": {
      "code": "import React from 'react';\\nimport Sidebar from './components/layout/Sidebar';\\nimport Header from './components/layout/Header';\\nimport MainContent from './components/layout/MainContent';\\nimport { AppProvider } from './contexts/AppContext';\\n\\nfunction App() {\\n  return (\\n    <AppProvider>\\n      <div className=\\"flex h-screen bg-slate-900 text-slate-50\\">\\n        <Sidebar />\\n        <div className=\\"flex-1 flex flex-col overflow-hidden\\">\\n          <Header />\\n          <main className=\\"flex-1 overflow-x-hidden overflow-y-auto bg-slate-900\\">\\n            <MainContent />\\n          </main>\\n        </div>\\n      </div>\\n    </AppProvider>\\n  );\\n}\\n\\nexport default App;\\n"
    },
    "/src/contexts/AppContext.js": {
      "code": "import React, { createContext, useState, useContext, useEffect } from 'react';\\n\\nconst AppContext = createContext();\\n\\nexport const AppProvider = ({ children }) => {\\n  const [isSidebarOpen, setIsSidebarOpen] = useState(true);\\n\\n  useEffect(() => {\\n    const handleResize = () => {\\n      if (window.innerWidth < 768) {\\n        setIsSidebarOpen(false);\\n      } else {\\n        setIsSidebarOpen(true);\\n      }\\n    };\\n    window.addEventListener('resize', handleResize);\\n    handleResize(); // Set initial state\\n    return () => window.removeEventListener('resize', handleResize);\\n  }, []);\\n\\n  const toggleSidebar = () => {\\n    setIsSidebarOpen(!isSidebarOpen);\\n  };\\n\\n  return (\\n    <AppContext.Provider value={{ isSidebarOpen, toggleSidebar }}>\\n      {children}\\n    </AppContext.Provider>\\n  );\\n};\\n\\nexport const useAppContext = () => useContext(AppContext);\\n"
    },
    "/src/components/layout/Sidebar.js": {
      "code": "import React from 'react';\\nimport { Home, Users, Settings, Mail, Calendar, Star, Play } from 'lucide-react';\\nimport { useAppContext } from '../../contexts/AppContext';\\n\\nconst NavItem = ({ icon, text, active }) => (\\n  <li className={\`rounded-lg transition-colors duration-200 ${
        active ? "bg-indigo-600" : "hover:bg-slate-700"
      }\`}>\\n    <a href=\\"#\\" className=\\"flex items-center p-3 space-x-4\\">\\n      {icon}\\n      <span className=\\"font-medium\\">{text}</span>\\n    </a>\\n  </li>\\n);\\n\\nconst Sidebar = () => {\\n  const { isSidebarOpen } = useAppContext();\\n\\n  const navItems = [\\n    { icon: <Home size={20} />, text: 'Dashboard', active: true },\\n    { icon: <Users size={20} />, text: 'Team' },\\n    { icon: <Calendar size={20} />, text: 'Calendar' },\\n    { icon: <Mail size={20} />, text: 'Messages' },\\n    { icon: <Star size={20} />, text: 'Favorites' },\\n    { icon: <Settings size={20} />, text: 'Settings' },\\n  ];\\n\\n  return (\\n    <aside className={\`bg-slate-800 text-slate-100 flex-shrink-0 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
          }\`}>\\n        <div className=\\"flex flex-col h-full\\">\\n            <div className=\\"flex items-center justify-center h-20 border-b border-slate-700\\">\\n                <Play size={28} className=\\"text-indigo-400\\"/>\\n                <h1 className=\\"text-2xl font-bold ml-2\\">AuraDash</h1>\\n            </div>\\n            <nav className=\\"flex-1 px-4 py-6\\">\\n                <ul className=\\"space-y-2\\">\\n                    {navItems.map((item, index) => <NavItem key={index} {...item} />)}\\n                </ul>\\n            </nav>\\n            <div className=\\"px-4 py-6 border-t border-slate-700\\">\\n                <div className=\\"bg-slate-700/50 rounded-lg p-4 text-center\\">\\n                    <h3 className=\\"font-semibold text-white\\">Upgrade to Pro</h3>\\n                    <p className=\\"text-sm text-slate-400 mt-2\\">Get more features and unlock your full potential.</p>\\n                    <button className=\\"mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300\\">\\n                        Upgrade Now\\n                    </button>\\n                </div>\\n            </div>\\n        </div>\\n    </aside>\\n  );\\n};\\n\\nexport default Sidebar;\\n"
    },
    "/src/components/layout/Header.js": {
      "code": "import React from 'react';\\nimport { Menu, Search, Bell, User } from 'lucide-react';\\nimport { useAppContext } from '../../contexts/AppContext';\\n\\nconst Header = () => {\\n  const { toggleSidebar } = useAppContext();\\n\\n  return (\\n    <header className=\\"flex-shrink-0 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700\\">\\n      <div className=\\"flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8\\">\\n        <div className=\\"flex items-center\\">\\n          <button onClick={toggleSidebar} className=\\"lg:hidden mr-4 text-slate-400 hover:text-white\\">\\n            <Menu size={24} />\\n          </button>\\n          <div className=\\"relative hidden md:block\\">\\n            <Search size={18} className=\\"absolute left-3 top-1/2 -translate-y-1/2 text-slate-400\\" />\\n            <input\\n              type=\\"text\\"\\n              placeholder=\\"Search projects...\\"\\n              className=\\"bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all\\"\\n            />\\n          </div>\\n        </div>\\n        <div className=\\"flex items-center space-x-4\\">\\n          <button className=\\"relative text-slate-400 hover:text-white transition-colors\\">\\n            <Bell size={22} />\\n            <span className=\\"absolute -top-1 -right-1 flex h-3 w-3\\">\\n              <span className=\\"animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75\\"></span>\\n              <span className=\\"relative inline-flex rounded-full h-3 w-3 bg-red-500\\"></span>\\n            </span>\\n          </button>\\n          <div className=\\"flex items-center space-x-3\\">\\n             <div className=\\"w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ring-2 ring-slate-700\\">\\n                 <img src='https://i.pravatar.cc/40?u=a042581f4e29026704d' alt='User Avatar' className='rounded-full' />\\n            </div>\\n            <div className=\\"hidden sm:block\\">\\n              <p className=\\"font-semibold text-sm\\">Jane Doe</p>\\n              <p className=\\"text-xs text-slate-400\\">Product Manager</p>\\n            </div>\\n          </div>\\n        </div>\\n      </div>\\n    </header>\\n  );\\n};\\n\\nexport default Header;\\n"
    },
    "/src/components/layout/MainContent.js": {
      "code": "import React from 'react';\\nimport StatsGrid from '../dashboard/StatsGrid';\\nimport SalesChart from '../dashboard/SalesChart';\\nimport ActivityFeed from '../dashboard/ActivityFeed';\\nimport ProjectList from '../dashboard/ProjectList';\\nimport ErrorBoundary from '../ErrorBoundary';\\n\\nconst MainContent = () => {\\n  return (\\n    <div className=\\"p-4 sm:p-6 lg:p-8 space-y-8 fade-in\\">\\n      <div>\\n        <h1 className=\\"text-3xl font-bold\\">Welcome back, Jane! 👋</h1>\\n        <p className=\\"text-slate-400 mt-1\\">Here's what's happening with your projects today.</p>\\n      </div>\\n\\n      <StatsGrid />\\n\\n      <div className=\\"grid grid-cols-1 lg:grid-cols-3 gap-8\\">\\n        <div className=\\"lg:col-span-2\\">\\n          <ErrorBoundary>\\n             <SalesChart />\\n          </ErrorBoundary>\\n        </div>\\n        <div>\\n            <ActivityFeed />\\n        </div>\\n      </div>\\n\\n      <div>\\n        <ProjectList />\\n      </div>\\n\\n    </div>\\n  );\\n};\\n\\nexport default MainContent;\\n"
    },
    "/src/components/ui/Card.js": {
      "code": "import React from 'react';\\n\\nconst Card = ({ children, className = '' }) => {\\n  return (\\n    <div className={\`bg-slate-800 border border-slate-700/50 rounded-xl shadow-lg hover:shadow-indigo-500/10 transition-shadow duration-300 ${className}\`}>\\n      {children}\\n    </div>\\n  );\\n};\\n\\nexport default Card;\\n"
    },
    "/src/components/dashboard/StatsGrid.js": {
      "code": "import React from 'react';\\nimport Card from '../ui/Card';\\nimport { Users, Shield, Clock, Heart } from 'lucide-react';\\n\\nconst StatCard = ({ icon, title, value, change, changeType }) => {\\n    const changeColor = changeType === 'increase' ? 'text-green-400' : 'text-red-400';\\n    return (\\n        <Card className=\\"p-6\\">\\n            <div className=\\"flex justify-between items-start\\">\\n                <div>\\n                    <p className=\\"text-sm font-medium text-slate-400\\">{title}</p>\\n                    <p className=\\"text-3xl font-bold mt-2\\">{value}</p>\\n                </div>\\n                <div className=\\"bg-slate-700 p-3 rounded-full\\">\\n                    {icon}\\n                </div>\\n            </div>\\n            <p className={\`text-sm mt-4 ${changeColor}\`}>{change}</p>\\n        </Card>\\n    );\\n}\\n\\nconst StatsGrid = () => {\\n  const stats = [\\n    { \\n        icon: <Users size={24} className=\\"text-indigo-400\\" />, \\n        title: 'New Users', value: '1,204', \\n        change: '+12.5% this month', \\n        changeType: 'increase' \\n    },\\n    { \\n        icon: <Heart size={24} className=\\"text-pink-400\\" />, \\n        title: 'Engagement', \\n        value: '87%', \\n        change: '+2.1% this week', \\n        changeType: 'increase' \\n    },\\n    { \\n        icon: <Clock size={24} className=\\"text-amber-400\\" />, \\n        title: 'Avg. Session', \\n        value: '2m 45s', \\n        change: '-0.5% today', \\n        changeType: 'decrease' \\n    },\\n    { \\n        icon: <Shield size={24} className=\\"text-teal-400\\" />, \\n        title: 'Security Alerts', \\n        value: '0', \\n        change: 'All systems normal', \\n        changeType: 'increase' \\n    },\\n  ];\\n\\n  return (\\n    <div className=\\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6\\">\\n      {stats.map((stat, index) => <StatCard key={index} {...stat} />)}\\n    </div>\\n  );\\n};\\n\\nexport default StatsGrid;\\n"
    },
    "/src/components/dashboard/SalesChart.js": {
      "code": "import React from 'react';\\nimport { Line } from 'react-chartjs-2';\\nimport { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';\\nimport Card from '../ui/Card';\\n\\nChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);\\n\\nconst SalesChart = () => {\\n  const data = {\\n    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],\\n    datasets: [\\n      {\\n        label: 'Sales',\\n        data: [65, 59, 80, 81, 56, 55, 62, 75],\\n        fill: true,\\n        borderColor: 'rgb(129, 140, 248)', // indigo-400\\n        backgroundColor: (context) => {\\n          const ctx = context.chart.ctx;\\n          const gradient = ctx.createLinearGradient(0, 0, 0, 200);\\n          gradient.addColorStop(0, 'rgba(129, 140, 248, 0.4)');\\n          gradient.addColorStop(1, 'rgba(129, 140, 248, 0)');\\n          return gradient;\\n        },\\n        tension: 0.4,\\n        pointBackgroundColor: 'rgb(129, 140, 248)',\\n        pointBorderColor: '#fff',\\n        pointHoverBackgroundColor: '#fff',\\n        pointHoverBorderColor: 'rgb(129, 140, 248)',\\n      },\\n    ],\\n  };\\n\\n  const options = {\\n    responsive: true,\\n    maintainAspectRatio: false,\\n    plugins: {\\n      legend: {\\n        display: false,\\n      },\\n    },\\n    scales: {\\n      x: {\\n        grid: {\\n          display: false,\\n          borderColor: '#475569',\\n        },\\n        ticks: {\\n            color: '#94a3b8' // slate-400\\n        }\\n      },\\n      y: {\\n        grid: {\\n          color: '#334155', // slate-700\\n          borderColor: '#475569',\\n        },\\n        ticks: {\\n            color: '#94a3b8', // slate-400\\n            callback: function(value) {\\n                return '$' + value + 'k';\\n            }\\n        }\\n      },\\n    },\\n  };\\n\\n  return (\\n    <Card className=\\"p-6 h-[450px]\\">\\n        <h3 className=\\"text-lg font-semibold\\">Sales Overview</h3>\\n        <p className=\\"text-sm text-slate-400 mb-4\\">Track your sales performance over the last 8 months.</p>\\n        <div className=\\"h-[340px]\\">\\n            <Line data={data} options={options} />\\n        </div>\\n    </Card>\\n  );\\n};\\n\\nexport default SalesChart;\\n"
    },
    "/src/components/dashboard/ActivityFeed.js": {
      "code": "import React from 'react';\\nimport { formatDistanceToNow } from 'date-fns';\\nimport Card from '../ui/Card';\\nimport { Plus, Upload, Edit, User, Check } from 'lucide-react';\\n\\nconst activities = [\\n  {\\n    id: 1,\\n    icon: <Plus size={16} className=\\"text-green-400\\" />,\\n    text: 'You added a new project \\"Mobile App Redesign\\".',\\n    timestamp: new Date(Date.now() - 1000 * 60 * 5),\\n  },\\n  {\\n    id: 2,\\n    icon: <Upload size={16} className=\\"text-indigo-400\\" />,\\n    text: 'Alex Johnson uploaded 5 new files to \\"Marketing Campaign\\".',\\n    timestamp: new Date(Date.now() - 1000 * 60 * 58),\\n  },\\n  {\\n    id: 3,\\n    icon: <User size={16} className=\\"text-sky-400\\" />,\\n    text: 'Samantha Bee joined the \\"Website Revamp\\" project.',\\n    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),\\n  },\\n  {\\n    id: 4,\\n    icon: <Edit size={16} className=\\"text-amber-400\\" />,\\n    text: 'You updated the status of task #345 to \\"In Progress\\".',\\n    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),\\n  },\\n    {\\n    id: 5,\\n    icon: <Check size={16} className=\\"text-teal-400\\" />,\\n    text: 'Project \\"Q4 Report\\" was completed.',\\n    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),\\n  },\\n];\\n\\nconst ActivityItem = ({ icon, text, timestamp }) => (\\n  <li className=\\"flex items-start space-x-4 py-3\\">\\n    <div className=\\"flex-shrink-0 bg-slate-700 rounded-full p-2\\">\\n        {icon}\\n    </div>\\n    <div>\\n      <p className=\\"text-sm text-slate-200\\">{text}</p>\\n      <p className=\\"text-xs text-slate-500 mt-1\\">\\n        {formatDistanceToNow(timestamp, { addSuffix: true })}\\n      </p>\\n    </div>\\n  </li>\\n);\\n\\nconst ActivityFeed = () => {\\n  return (\\n    <Card className=\\"p-6 h-[450px]\\">\\n      <h3 className=\\"text-lg font-semibold\\">Activity Feed</h3>\\n       <p className=\\"text-sm text-slate-400 mb-4\\">Recent activities across your projects.</p>\\n      <ul className=\\"space-y-2 -mt-2 divide-y divide-slate-700/50 h-[340px] overflow-y-auto pr-2\\">\\n        {activities.map(activity => (\\n          <ActivityItem key={activity.id} {...activity} />\\n        ))}\\n      </ul>\\n    </Card>\\n  );\\n};\\n\\nexport default ActivityFeed;\\n"
    },
    "/src/components/dashboard/ProjectList.js": {
      "code": "import React from 'react';\\nimport Card from '../ui/Card';\\nimport { ArrowRight } from 'lucide-react';\\n\\nconst projects = [\\n    { name: 'Aura UI Kit', status: 'In Progress', progress: 75, team: ['1', '2', '3'] },\\n    { name: 'Marketing Website', status: 'Completed', progress: 100, team: ['4', '5'] },\\n    { name: 'API Integration', status: 'In Progress', progress: 40, team: ['1', '6', '7'] },\\n    { name: 'Mobile App', status: 'On Hold', progress: 10, team: ['2', '5', '8'] },\\n];\\n\\nconst statusColors = {\\n    'In Progress': 'bg-sky-500/20 text-sky-400',\\n    'Completed': 'bg-green-500/20 text-green-400',\\n    'On Hold': 'bg-amber-500/20 text-amber-400',\\n};\\n\\nconst ProjectRow = ({ name, status, progress, team }) => (\\n    <tr className=\\"border-b border-slate-700 hover:bg-slate-700/50 transition-colors duration-200\\">\\n        <td className=\\"p-4 font-medium\\">{name}</td>\\n        <td className=\\"p-4\\">\\n            <div className=\\"flex -space-x-2\\">\\n                {team.map(id => (\\n                    <img key={id} className=\\"inline-block h-8 w-8 rounded-full ring-2 ring-slate-800\\" src={\`https://i.pravatar.cc/32?u=${id}\`} alt=\\"\\" />\\n                ))}\\n            </div>\\n        </td>\\n        <td className=\\"p-4\\">\\n            <span className={\`px-2 py-1 text-xs font-semibold rounded-full ${
            statusColors[status]
          }\`}>\\n                {status}\\n            </span>\\n        </td>\\n        <td className=\\"p-4\\">\\n            <div className=\\"w-full bg-slate-600 rounded-full h-2.5\\">\\n                <div className=\\"bg-indigo-500 h-2.5 rounded-full\\" style={{ width: \`${progress}%\` }}></div>\\n            </div>\\n        </td>\\n        <td className=\\"p-4 text-right\\">\\n            <button className=\\"text-slate-400 hover:text-indigo-400 transition-colors\\">\\n                <ArrowRight size={20} />\\n            </button>\\n        </td>\\n    </tr>\\n);\\n\\nconst ProjectList = () => {\\n    return (\\n        <Card>\\n            <div className=\\"p-6\\">\\n              <h3 className=\\"text-lg font-semibold\\">Active Projects</h3>\\n              <p className=\\"text-sm text-slate-400\\">A list of your current projects and their progress.</p>\\n            </div>\\n            <div className=\\"overflow-x-auto\\">\\n                <table className=\\"w-full text-sm text-left text-slate-300\\">\\n                    <thead className=\\"text-xs text-slate-400 uppercase bg-slate-700/50\\">\\n                        <tr>\\n                            <th scope=\\"col\\" className=\\"p-4\\">Project Name</th>\\n                            <th scope=\\"col\\" className=\\"p-4\\">Team</th>\\n                            <th scope=\\"col\\" className=\\"p-4\\">Status</th>\\n                            <th scope=\\"col\\" className=\\"p-4\\">Progress</th>\\n                            <th scope=\\"col\\" className=\\"p-4 text-right\\">Actions</th>\\n                        </tr>\\n                    </thead>\\n                    <tbody>\\n                        {projects.map((project, index) => <ProjectRow key={index} {...project} />)}\\n                    </tbody>\\n                </table>\\n            </div>\\n        </Card>\\n    );\\n};\\n\\nexport default ProjectList;\\n"
    },
    "/src/components/ErrorBoundary.js": {
      "code": "import React from 'react';\\nimport { Shield } from 'lucide-react';\\n\\nclass ErrorBoundary extends React.Component {\\n  constructor(props) {\\n    super(props);\\n    this.state = { hasError: false };\\n  }\\n\\n  static getDerivedStateFromError(error) {\\n    return { hasError: true };\\n  }\\n\\n  componentDidCatch(error, errorInfo) {\\n    console.error(\\"Uncaught error:\\", error, errorInfo);\\n  }\\n\\n  render() {\\n    if (this.state.hasError) {\\n      return (\\n        <div className=\\"bg-slate-800 border border-red-500/50 rounded-xl shadow-lg p-6 h-full flex flex-col items-center justify-center text-center\\">\\n            <div className=\\"bg-red-500/10 p-4 rounded-full\\">\\n                 <Shield size={48} className=\\"text-red-500\\" />\\n            </div>\\n            <h2 className=\\"mt-4 text-xl font-semibold\\">Something went wrong</h2>\\n            <p className=\\"mt-2 text-slate-400\\">We're sorry, this component failed to load. Please try refreshing the page.</p>\\n        </div>\\n      );\\n    }\\n\\n    return this.props.children;\\n  }\\n}\\n\\nexport default ErrorBoundary;\\n"
    }
  },
  "generatedFiles": [
    "/public/index.html",
    "/src/index.js",
    "/src/App.css",
    "/src/App.js",
    "/src/contexts/AppContext.js",
    "/src/components/layout/Sidebar.js",
    "/src/components/layout/Header.js",
    "/src/components/layout/MainContent.js",
    "/src/components/ui/Card.js",
    "/src/components/dashboard/StatsGrid.js",
    "/src/components/dashboard/SalesChart.js",
    "/src/components/dashboard/ActivityFeed.js",
    "/src/components/dashboard/ProjectList.js",
    "/src/components/ErrorBoundary.js"
  ]
}
\`\`\``,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();
