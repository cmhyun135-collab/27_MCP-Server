import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, onAddTaskClick }) {
  const tabs = [
    { id: 'all', label: 'All', icon: 'list' },
    { id: 'today', label: 'Today', icon: 'today' },
    { id: 'completed', label: 'Completed', icon: 'check_circle' },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen p-4 bg-surface border-r border-outline-variant w-64 shrink-0">
      <div className="mb-10 px-1">
        <h1 className="text-xl font-headline-md font-bold text-primary tracking-tight">Productive Clarity</h1>
        <p className="text-xs font-label-md text-on-surface-variant opacity-70 mt-1">Stay organized</p>
      </div>

      <nav className="flex-1 space-y-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-150 group cursor-pointer text-left ${
                isActive
                  ? 'bg-primary-fixed-dim text-on-primary-fixed font-medium scale-[0.98]'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              <span 
                className={`material-symbols-outlined transition-colors ${
                  isActive ? 'text-on-primary-fixed' : 'group-hover:text-primary'
                }`}
              >
                {tab.icon}
              </span>
              <span className="text-sm font-label-md">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-4">
        <button
          onClick={onAddTaskClick}
          className="w-full py-3 px-6 bg-primary text-white rounded-xl font-label-md flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[0.98] transition-all cursor-pointer shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Task
        </button>
      </div>
    </aside>
  );
}
