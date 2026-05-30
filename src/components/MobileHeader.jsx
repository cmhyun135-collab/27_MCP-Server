import React from 'react';

export default function MobileHeader() {
  return (
    <header className="md:hidden flex justify-between items-center w-full px-6 py-4 bg-background sticky top-0 z-10 border-b border-outline-variant/10">
      <h2 className="text-lg font-headline-sm font-bold text-on-surface">Productive Clarity</h2>
      <div className="flex items-center gap-4">
        <button 
          className="text-on-surface-variant material-symbols-outlined hover:text-primary transition-colors cursor-pointer"
          onClick={() => alert('Settings option coming soon!')}
        >
          settings
        </button>
      </div>
    </header>
  );
}
