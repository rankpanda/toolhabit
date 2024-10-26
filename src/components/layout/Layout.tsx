import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const getPageName = (pathname: string): string => {
  switch (pathname) {
    case '/':
      return 'Contexto';
    case '/semrush':
      return 'SEMrush';
    case '/keywords':
      return 'Keywords';
    default:
      return 'Contexto';
  }
};

export function Layout({ children }: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const pageName = getPageName(location.pathname);

  return (
    <div className="min-h-screen bg-base">
      <Sidebar 
        isCollapsed={isCollapsed} 
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)} 
      />
      
      <div className={`transition-all duration-300 ${isCollapsed ? 'pl-16' : 'pl-64'}`}>
        <Header pageName={pageName} />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}