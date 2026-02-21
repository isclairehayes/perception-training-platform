import * as React from 'react';
import { clsx } from 'clsx';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        className={clsx(
          'relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800',
          className
        )}
        {...props}
      >
        <div
          className="h-full bg-black transition-all dark:bg-white"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }
);

Progress.displayName = 'Progress';
