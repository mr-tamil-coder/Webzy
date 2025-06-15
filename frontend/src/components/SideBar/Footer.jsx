import React from "react";
import { Settings, HelpCircle, CreditCard, LogOut } from "lucide-react";

const Footer = () => {
  const menuItems = [
    {
      id: 1,
      icon: <Settings className="w-4 h-4" />,
      label: "Settings",
    },
    {
      id: 2,
      icon: <HelpCircle className="w-4 h-4" />,
      label: "Help Center",
    },
    {
      id: 3,
      icon: <CreditCard className="w-4 h-4" />,
      label: "Subscription",
    },
    {
      id: 4,
      icon: <LogOut className="w-4 h-4" />,
      label: "Logout",
    },
  ];

  return (
    <div className="p-4 border-t border-slate-700/50">
      {menuItems.map((item) => (
        <button
          key={item.id}
          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Footer;
