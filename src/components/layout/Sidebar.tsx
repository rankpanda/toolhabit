import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Navigation } from './Navigation';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  return (
    <div className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-10 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex items-center justify-between h-16 px-4">
        <Link to="/" className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
          {!isCollapsed && (
            <span className="text-xl font-moonwalk font-bold text-primary">RankPanda</span>
          )}
        </Link>
        <button
          onClick={onToggleCollapse}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <Navigation isCollapsed={isCollapsed} />
    </div>
  );
}