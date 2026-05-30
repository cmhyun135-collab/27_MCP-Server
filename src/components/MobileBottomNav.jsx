import React from 'react';

export default function MobileBottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'all', label: 'All', icon: 'list' },
    { id: 'today', label: 'Today', icon: 'today' },
    { id: 'completed', label: 'Done', icon: 'check_circle' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white flex justify-around items-center px-6 z-10 border-t border-outline-variant/30 shadow-lg">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full cursor-pointer transition-colors ${
              isActive ? 'text-primary font-medium' : 'text-on-surface-variant opacity-70'
            }`}
          >
            <span 
              className="material-symbols-outlined" 
              style={{
                fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"
              }}
            >
              {tab.icon}
            </span>
            <span className="text-[10px] font-label-md mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
