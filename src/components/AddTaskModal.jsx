import React, { useState, useEffect, useRef } from 'react';

export default function AddTaskModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [isToday, setIsToday] = useState(true);
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC keypress
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), isToday);
    setTitle('');
    setIsToday(true);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Modal Card with entrance slide-up and fade-in */}
      <div
        className="glassmorphism w-full max-w-[500px] rounded-2xl p-6 shadow-2xl scale-[1.01] animate-in fade-in slide-in-from-bottom-8 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-headline-sm font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">
              task_alt
            </span>
            Create New Task
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input field */}
          <div className="space-y-2">
            <label htmlFor="task-title" className="block text-xs font-label-md text-on-surface-variant uppercase tracking-wider font-semibold opacity-70">
              Task Name
            </label>
            <input
              ref={inputRef}
              id="task-title"
              type="text"
              required
              placeholder="e.g. Finish project reporting"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-lg text-sm md:text-base placeholder-on-surface-variant/40"
            />
          </div>

          {/* Schedule toggle */}
          <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/20">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary text-[22px]">
                today
              </span>
              <div>
                <p className="text-sm font-task-title font-semibold text-on-surface">Schedule for Today</p>
                <p className="text-xs text-on-surface-variant opacity-60">Add this task to your Today focus list</p>
              </div>
            </div>
            
            {/* Custom Toggle Switch */}
            <button
              type="button"
              onClick={() => setIsToday(!isToday)}
              className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                isToday ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  isToday ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-label-md font-semibold text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-white font-label-md font-semibold rounded-xl hover:opacity-90 hover:scale-[0.98] transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
