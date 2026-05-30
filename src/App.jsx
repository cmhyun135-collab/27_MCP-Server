import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import MobileBottomNav from './components/MobileBottomNav';
import TaskCard from './components/TaskCard';
import AddTaskModal from './components/AddTaskModal';

const DEFAULT_TASKS = [
  { id: 'task-1', title: 'Prepare presentation slides', completed: false, isToday: false },
  { id: 'task-2', title: 'Grocery shopping', completed: false, isToday: true },
  { id: 'task-3', title: 'Call the dentist', completed: false, isToday: false },
  { id: 'task-4', title: 'Morning workout', completed: true, isToday: true },
  { id: 'task-5', title: 'Email the team', completed: true, isToday: false },
];

export default function App() {
  // Load tasks from localStorage or fall back to default tasks
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('productive_clarity_tasks');
      return savedTasks ? JSON.parse(savedTasks) : DEFAULT_TASKS;
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e);
      return DEFAULT_TASKS;
    }
  });

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'today' | 'completed'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sync tasks to localStorage on update
  useEffect(() => {
    try {
      localStorage.setItem('productive_clarity_tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  }, [tasks]);

  // Task Operations
  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleAddTask = (title, isToday) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title,
      completed: false,
      isToday,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // Get current date string
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Filter Tasks
  const getFilteredTasks = () => {
    let list = tasks;
    if (activeTab === 'today') {
      list = tasks.filter((t) => t.isToday);
    }
    
    const active = list.filter((t) => !t.completed);
    const completed = list.filter((t) => t.completed);
    
    return { active, completed };
  };

  const { active: activeTasks, completed: completedTasks } = getFilteredTasks();

  // Header Title
  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'today':
        return "Today's Focus";
      case 'completed':
        return 'Completed Tasks';
      default:
        return 'My Tasks';
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex overflow-hidden w-full">
      {/* Side Navigation (Desktop only) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddTaskClick={() => setIsAddModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen relative overflow-y-auto pb-20 md:pb-6">
        {/* Top App Bar (Mobile & Tablet) */}
        <MobileHeader />

        {/* Content Container (Fixed Width 800px focus) */}
        <div className="w-full max-w-[800px] mx-auto px-6 md:px-10 py-10 md:py-20 flex-1 flex flex-col">
          
          {/* Page Header */}
          <header className="mb-10">
            <h2 className="text-3xl md:text-4xl font-headline-lg font-bold text-on-surface mb-1.5 transition-all">
              {getHeaderTitle()}
            </h2>
            <p className="text-base font-body-lg text-on-surface-variant opacity-60">
              {formattedDate}
            </p>
          </header>

          {/* Task Lists Section */}
          <div className="flex-1 flex flex-col gap-10">
            {/* Active Tasks Section */}
            {activeTab !== 'completed' && (
              <div className="space-y-3">
                {activeTasks.length > 0 ? (
                  activeTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={handleToggleTask}
                      onDelete={handleDeleteTask}
                    />
                  ))
                ) : (
                  /* Empty state spacer - only show if there are absolutely no active tasks */
                  <div className="py-16 flex flex-col items-center justify-center text-center opacity-30 select-none transition-all duration-300">
                    <span className="material-symbols-outlined text-[64px] text-primary/40 mb-2">
                      cloud_queue
                    </span>
                    <p className="text-sm font-body-md text-on-surface-variant">Your focus is clear</p>
                    <p className="text-xs text-on-surface-variant opacity-60 mt-1">Enjoy your peaceful day!</p>
                  </div>
                )}
              </div>
            )}

            {/* Completed Tasks Section */}
            {activeTab !== 'today' && completedTasks.length > 0 && (
              <div className="pt-4">
                <h3 className="text-xs font-label-md text-on-surface-variant uppercase tracking-wider mb-4 opacity-50 px-1 font-bold">
                  Completed ({completedTasks.length})
                </h3>
                <div className="space-y-3">
                  {completedTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={handleToggleTask}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* If completed tab is selected but there are no completed tasks */}
            {activeTab === 'completed' && completedTasks.length === 0 && (
              <div className="py-20 flex-1 flex flex-col items-center justify-center text-center opacity-30 select-none">
                <span className="material-symbols-outlined text-[64px] text-primary/40 mb-2">
                  check_circle
                </span>
                <p className="text-sm font-body-md text-on-surface-variant">No completed tasks yet</p>
                <p className="text-xs text-on-surface-variant opacity-60 mt-1">Check off tasks to see them here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Floating Action Button (Mobile only) */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="md:hidden fixed bottom-20 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center fab-shadow hover:scale-110 active:scale-95 transition-all z-20 group cursor-pointer"
          aria-label="Add task"
        >
          <span className="material-symbols-outlined text-[28px] group-hover:rotate-90 transition-transform duration-300">
            add
          </span>
        </button>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </main>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTask}
      />
    </div>
  );
}
