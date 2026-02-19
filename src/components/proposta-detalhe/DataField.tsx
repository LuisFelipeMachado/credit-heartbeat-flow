import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface DataFieldProps {
  label: string;
  value: string | number | null | undefined;
  icon?: LucideIcon;
  className?: string;
  highlight?: boolean;
  suffix?: string;
}

export function DataField({ label, value, icon: Icon, className, highlight, suffix }: DataFieldProps) {
  const displayValue = value === null || value === undefined || value === '' ? '-' : String(value);

  return (
    <div className={cn("space-y-1.5", className)}>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
      </p>
      <p className={cn(
        "text-sm font-medium text-foreground",
        highlight && "text-base font-semibold text-accent"
      )}>
        {displayValue}{suffix && displayValue !== '-' ? suffix : ''}
      </p>
    </div>
  );
}
