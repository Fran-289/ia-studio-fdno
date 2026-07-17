'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'gradient';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', size = 'sm', children, className }: BadgeProps) {
  const variants = {
    default: 'bg-surface-800 text-surface-300 border-surface-700',
    primary: 'bg-primary-500/20 text-white border-primary-500/30',
    success: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    danger: 'bg-red-500/10 text-red-300 border-red-500/20',
    gradient: 'gradient-primary text-white',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
