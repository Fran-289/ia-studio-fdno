'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';
import {
  LayoutDashboard,
  Image,
  Video,
  Mic2,
  PenTool,
  Users,
  Palette,
  Sparkles,
  Megaphone,
  Share2,
  FolderOpen,
  Library,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkle,
  Shield,
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  group?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, href: '/dashboard' },
  { label: 'Imágenes IA', icon: <Sparkle className="w-5 h-5" />, href: '/dashboard/images', group: 'Creación' },
  { label: 'Video IA', icon: <Video className="w-5 h-5" />, href: '/dashboard/video', group: 'Creación' },
  { label: 'Voz IA', icon: <Mic2 className="w-5 h-5" />, href: '/dashboard/voice', group: 'Creación' },
  { label: 'Logos', icon: <PenTool className="w-5 h-5" />, href: '/dashboard/logos', group: 'Creación' },
  { label: 'Avatares', icon: <Users className="w-5 h-5" />, href: '/dashboard/avatars', group: 'Creación' },
  { label: 'Miniaturas', icon: <Image className="w-5 h-5" />, href: '/dashboard/thumbnails', group: 'Creación' },
  { label: 'Publicidad', icon: <Megaphone className="w-5 h-5" />, href: '/dashboard/ads', group: 'Creación' },
  { label: 'Redes Sociales', icon: <Share2 className="w-5 h-5" />, href: '/dashboard/social', group: 'Creación' },
  { label: 'Editor Imágenes', icon: <Palette className="w-5 h-5" />, href: '/dashboard/editor/image', group: 'Edición' },
  { label: 'Editor Video', icon: <Video className="w-5 h-5" />, href: '/dashboard/editor/video', group: 'Edición' },
  { label: 'Proyectos', icon: <FolderOpen className="w-5 h-5" />, href: '/dashboard/projects', group: 'Gestión' },
  { label: 'Biblioteca', icon: <Library className="w-5 h-5" />, href: '/dashboard/library', group: 'Gestión' },
  { label: 'Planes', icon: <Sparkles className="w-5 h-5" />, href: '/dashboard/pricing', group: 'Gestión' },
];

const bottomItems: NavItem[] = [
  { label: 'Admin', icon: <Shield className="w-5 h-5" />, href: '/admin' },
  { label: 'Configuración', icon: <Settings className="w-5 h-5" />, href: '/dashboard/settings' },
  { label: 'Cerrar Sesión', icon: <LogOut className="w-5 h-5" />, href: '/logout' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const groups = navItems.reduce(
    (acc, item) => {
      const group = item.group || 'General';
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    },
    {} as Record<string, NavItem[]>,
  );

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 260 : 72 }}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col glass border-r border-white/10"
    >
      <div className="flex items-center h-16 px-4 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3 flex-1">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-display font-semibold text-lg"
            >
              IA Studio
            </motion.span>
          )}
        </Link>
        <button
          onClick={toggleSidebar}
          className="btn-ghost p-1.5 hidden lg:flex"
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-custom py-4 px-3 space-y-6">
        {Object.entries(groups).map(([group, items]) => (
          <div key={group}>
            {sidebarOpen && (
              <p className="text-xs font-medium text-surface-500 uppercase tracking-wider px-3 mb-2">
                {group}
              </p>
            )}
            <div className="space-y-1">
              {items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                const isHovered = hoveredItem === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
                      isActive
                        ? 'gradient-primary text-white shadow-lg shadow-primary-500/25'
                        : 'text-surface-400 hover:text-surface-200 hover:bg-white/5',
                    )}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {sidebarOpen && (
                      <span className="text-sm font-medium truncate">{item.label}</span>
                    )}
                    {isActive && !sidebarOpen && (
                      <div className="absolute left-0 w-1 h-6 gradient-primary rounded-r-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 p-3 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
              pathname === item.href
                ? 'gradient-primary text-white'
                : 'text-surface-400 hover:text-surface-200 hover:bg-white/5',
            )}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {sidebarOpen && <span className="text-sm font-medium truncate">{item.label}</span>}
          </Link>
        ))}
      </div>
    </motion.aside>
  );
}
