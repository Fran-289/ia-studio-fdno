'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, ChevronDown, Sun, Moon, Sparkles, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';

export function Topbar() {
  const { theme, setTheme } = useUIStore();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-[260px] h-16 z-30 glass border-b border-white/10 transition-all duration-300">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              placeholder="Buscar proyectos, herramientas..."
              className="w-full pl-10 pr-4 py-2 bg-surface-800/50 border border-surface-700/50 rounded-xl text-sm text-surface-100 placeholder-surface-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-1.5 py-0.5 bg-surface-700/50 rounded text-[10px] text-surface-500 font-medium">
              ⌘K
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative p-2 rounded-xl bg-surface-800/50 border border-surface-700/50 text-surface-400 hover:text-surface-200 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-xl bg-surface-800/50 border border-surface-700/50 text-surface-400 hover:text-surface-200 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary-500 rounded-full border-2 border-surface-900" />
          </motion.button>

          <div className="flex items-center gap-3 pl-3 border-l border-white/10">
            <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-surface-200">Usuario</p>
              <p className="text-xs text-surface-500">Plan Free</p>
            </div>
            <ChevronDown className="w-4 h-4 text-surface-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
