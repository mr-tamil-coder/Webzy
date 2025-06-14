import dedent from "dedent";

// Runtime dependencies only - no build tools
export const RUNTIME_DEPENDENCIES = {
  react: "^18.2.0",
  "react-dom": "^18.2.0",
  "lucide-react": "latest",
  firebase: "^11.1.0",
  "@google/generative-ai": "^0.21.0",
  "date-fns": "^2.30.0",
  "react-chartjs-2": "^5.2.0",
  "chart.js": "^4.4.0",
  "tailwind-merge": "^2.4.0",
  uuid4: "^2.0.3",
};

export const DEFAULT_FILE = {
  "/public/index.html": {
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            animation: {
              'fade-in': 'fadeIn 0.5s ease-in-out',
              'slide-up': 'slideUp 0.3s ease-out',
            },
            keyframes: {
              fadeIn: {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' },
              },
              slideUp: {
                '0%': { transform: 'translateY(20px)', opacity: '0' },
                '100%': { transform: 'translateY(0)', opacity: '1' },
              }
            }
          }
        }
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
  },
  "/src/index.js": {
    code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  "/src/App.js": {
    code: `import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🚀 Welcome to Your React App
          </h1>
          <p className="text-xl text-gray-600">
            Ready for AI-generated code!
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 animate-slide-up">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            🎯 Ready to Build
          </h2>
          <p className="text-gray-600">
            Your Bolt.new clone is set up and ready to generate amazing React applications!
          </p>
        </div>
      </div>
    </div>
  );
}`,
  },
  "/src/App.css": {
    code: `/* Custom styles - Tailwind loaded via CDN */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}`,
  },
  "/package.json": {
    code: `{
  "name": "react-app",
  "version": "1.0.0",
  "main": "src/index.js",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "latest",
    "react-router-dom": "latest",
    "firebase": "^11.1.0",
    "@google/generative-ai": "^0.21.0",
    "date-fns": "^2.30.0",
    "react-chartjs-2": "^5.2.0",
    "chart.js": "^4.4.0",
    "tailwind-merge": "^2.4.0",
    "uuid4": "^2.0.3"
  }
}`,
  },
};

export const CODE_GEN_PROMPT = {
  prompt: `
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
};
const vinothTemp = {
  SUGGSTIONS: [
    "Create ToDo App in React",
    "Create Budget Track App",
    "Create Gym Managment Portal Dashboard",
    "Create Quizz App On History",
    "Create Login Signup Screen",
  ],
  HERO_HEADING: "What do you want to build?",
  HERO_DESC: "Prompt, run, edit, and deploy full-stack web apps.",
  INPUT_PLACEHOLDER: "What you want to build?",
  SIGNIN_HEADING: "Continue With Bolt.New 2.0",
  SIGNIN_SUBHEADING:
    "To use Bolt you must log into an existing account or create one.",
  SIGNIn_AGREEMENT_TEXT:
    "By using Bolt, you agree to the collection of usage data for analytics.",

  DEPENDANCY: {
    postcss: "^8",
    tailwindcss: "^3.4.1",
    autoprefixer: "^10.0.0",
    uuid4: "^2.0.3",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.469.0",
    "react-router-dom": "^7.1.1",
    firebase: "^11.1.0",
    "@google/generative-ai": "^0.21.0",
    "date-fns": "^4.1.0",
    "react-chartjs-2": "^5.3.0",
    "chart.js": "^4.4.7",
  },
  PRICING_DESC:
    "Start with a free account to speed up your workflow on public projects or boost your entire team with instantly-opening production environments.",
  PRICING_OPTIONS: [
    {
      name: "Basic",
      tokens: "50K",
      value: 50000,
      desc: "Ideal for hobbyists and casual users for light, exploratory use.",
      price: 4.99,
    },
    {
      name: "Starter",
      tokens: "120K",
      value: 120000,
      desc: "Designed for professionals who need to use Bolt a few times per week.",
      price: 9.99,
    },
    {
      name: "Pro",
      tokens: "2.5M",
      value: 2500000,
      desc: "Designed for professionals who need to use Bolt a few times per week.",
      price: 19.99,
    },
    {
      name: "Unlimted (License)",
      tokens: "Unmited",
      value: 999999999,
      desc: "Designed for professionals who need to use Bolt a few times per week.",
      price: 49.99,
    },
  ],
};

export default {
  CHAT_PROMPT: dedent`
  'You are a AI Assistant and experience in React Development.
  GUIDELINES:
  - Tell user what your are building
  - response less than 15 lines. 
  - Skip code examples and commentary'
`,
};

// - The lucide-react library is also available to be imported IF NECCESARY ONLY FOR THE FOLLOWING ICONS: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Clock, Heart, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, ArrowRight. Here's an example of importing and using one: import { Heart } from "lucide-react"\` & \<Heart className=""  />\. PLEASE ONLY USE THE ICONS IF AN ICON IS NEEDED IN THE USER'S REQUEST.
