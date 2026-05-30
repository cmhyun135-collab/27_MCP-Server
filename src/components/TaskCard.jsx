import React from 'react';

export default function TaskCard({ task, onToggle, onDelete }) {
  const { completed, title, isToday } = task;

  return (
    <div
      onClick={() => onToggle(task.id)}
      className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
        completed
          ? 'completed bg-surface-container-low border-outline-variant/35 opacity-65'
          : 'bg-white border-[#F3F4F6] task-card-shadow hover:border-primary/25 hover:translate-y-[-1px]'
      }`}
    >
      {/* Tactical Checkbox Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle(task.id);
        }}
        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 ${
          completed
            ? 'bg-primary border-primary scale-100 shadow-sm'
            : 'bg-white border-outline-variant hover:border-primary group-hover:scale-105'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[16px] text-white transition-all duration-200 ${
            completed ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-20 group-hover:scale-100'
          }`}
          style={{
            fontVariationSettings: completed ? "'FILL' 1, 'wght' 700" : "'FILL' 0, 'wght' 700"
          }}
        >
          check
        </span>
      </button>

      {/* Task Text with Animated Strikethrough */}
      <div className="flex-1 flex flex-col min-w-0 pr-2">
        <span
          className={`text-sm md:text-base font-task-title truncate transition-colors duration-200 strikethrough-animate ${
            completed 
              ? 'text-on-surface-variant opacity-60 line-through' 
              : 'text-on-surface font-medium'
          }`}
        >
          {title}
        </span>
        {isToday && !completed && (
          <span className="text-[10px] text-tertiary-container font-label-md flex items-center gap-1 mt-0.5 animate-pulse">
            <span className="material-symbols-outlined text-[12px]">today</span>
            Today
          </span>
        )}
      </div>

      {/* Hover Action Controls (Drag Handle & Delete Trash Icon) */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Delete Action (Shows on card hover) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-error hover:bg-error-container/20 opacity-0 group-hover:opacity-100 transition-all duration-150 cursor-pointer"
          title="Delete task"
        >
          <span className="material-symbols-outlined text-[20px]">
            delete
          </span>
        </button>

        {/* Drag Handle Indicator */}
        <span
          className={`material-symbols-outlined text-outline-variant transition-opacity duration-150 select-none ${
            completed ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          drag_indicator
        </span>
      </div>
    </div>
  );
}
