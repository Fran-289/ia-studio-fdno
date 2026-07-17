import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, variant = 'text', width, height }: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
    card: 'rounded-2xl h-48',
  };

  return (
    <div
      className={cn('skeleton', variants[variant], className)}
      style={{ width, height }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <Skeleton variant="rectangular" className="h-40 w-full" />
      <Skeleton className="w-3/4" />
      <Skeleton className="w-1/2" />
      <div className="flex gap-2">
        <Skeleton variant="circular" className="h-8 w-8" />
        <Skeleton className="flex-1" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 glass rounded-xl">
          <Skeleton variant="circular" className="h-10 w-10" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-1/3" />
            <Skeleton className="w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
