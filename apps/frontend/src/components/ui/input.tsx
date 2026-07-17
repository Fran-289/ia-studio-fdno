'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, helperText, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-surface-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-surface-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-2.5 bg-surface-900/80 border rounded-xl text-surface-100 placeholder-surface-500',
              'focus:outline-none focus:ring-2 focus:border-transparent',
              'transition-all duration-200',
              icon && 'pl-11',
              error
                ? 'border-red-500/50 focus:ring-red-500/20'
                : 'border-surface-700/50 focus:ring-primary-500/20 focus:border-primary-500/50',
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {helperText && !error && <p className="text-sm text-surface-500">{helperText}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
