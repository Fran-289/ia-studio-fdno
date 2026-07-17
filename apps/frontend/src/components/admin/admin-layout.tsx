'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Shield,
  Users,
  CreditCard,
  Cpu,
  BarChart3,
  Settings,
  TicketPercent,
  Image,
  LogOut,
  ArrowLeft,
} from 'lucide-react';

const adminNavItems = [
  { label: 'Panel Admin', icon: <Shield className="w-5 h-5" />, href: '/admin' },
  { label: 'Usuarios', icon: <Users className="w-5 h-5" />, href: '/admin/users' },
  { label: 'Suscripciones', icon: <CreditCard className="w-5 h-5" />, href: '/admin/subscriptions' },
  { label: 'Modelos IA', icon: <Cpu className="w-5 h-5" />, href: '/admin/models' },
  { label: 'Estadísticas', icon: <BarChart3 className="w-5 h-5" />, href: '/admin/stats' },
  { label: 'Promociones', icon: <TicketPercent className="w-5 h-5" />, href: '/admin/promotions' },
  { label: 'Banners', icon: <Image className="w-5 h-5" />, href: '/admin/banners' },
  { label: 'Configuración', icon: <Settings className="w-5 h-5" />, href: '/admin/config' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 space-y-1">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 px-3 py-2.5 text-sm text-surface-400 hover:text-surface-200 rounded-xl hover:bg-white/5 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al Dashboard
      </Link>
      {adminNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all',
            pathname === item.href
              ? 'gradient-primary text-white shadow-lg shadow-primary-500/25'
              : 'text-surface-400 hover:text-surface-200 hover:bg-white/5',
          )}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
    </div>
  );
}
