import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileSpreadsheet, KeyRound } from 'lucide-react';

export interface NavigationItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface NavigationProps {
  isCollapsed: boolean;
}

export function Navigation({ isCollapsed }: NavigationProps) {
  const location = useLocation();

  const navigation: NavigationItem[] = [
    {
      name: 'Context',
      path: '/',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      name: 'SEMrush Data',
      path: '/semrush',
      icon: <FileSpreadsheet className="h-5 w-5" />
    },
    {
      name: 'Keywords',
      path: '/keywords',
      icon: <KeyRound className="h-5 w-5" />
    }
  ];

  const isParentActive = (item: NavigationItem) => {
    if (item.path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <nav className="mt-4">
      {navigation.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`
            flex items-center px-4 py-3 text-sm font-medium transition-colors
            ${isCollapsed ? 'justify-center' : ''}
            ${isParentActive(item)
              ? 'text-primary bg-secondary-lime/10'
              : 'text-gray-600 hover:text-primary hover:bg-gray-50'
            }
          `}
        >
          {item.icon}
          {!isCollapsed && <span className="ml-3">{item.name}</span>}
        </Link>
      ))}
    </nav>
  );
}