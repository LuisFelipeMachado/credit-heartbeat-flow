import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

export function MetricCard({ title, value, subtitle, icon: Icon, iconColor = 'text-primary', className }: MetricCardProps) {
  return (
    <div className={cn('flex items-center justify-between rounded-xl bg-white p-6 shadow-sm border border-border/40', className)}>
      <div className="flex items-center gap-4">
        <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted/60', iconColor)}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
