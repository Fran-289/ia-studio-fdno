'use client';

import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { useUIStore } from '@/store/ui-store';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-surface-950">
      <Sidebar />
      <Topbar />
      <main
        className={cn(
          'pt-16 min-h-screen transition-all duration-300',
          sidebarOpen ? 'ml-[260px]' : 'ml-[72px]',
        )}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
