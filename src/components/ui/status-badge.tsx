import { cn } from '@/lib/utils';
import type { PropostaStatus } from '@/types';

interface StatusBadgeProps {
  status: PropostaStatus;
  className?: string;
}

const statusConfig: Record<PropostaStatus, { label: string; className: string }> = {
  RASCUNHO: { label: 'Rascunho', className: 'bg-muted text-muted-foreground' },
  ENVIADA: { label: 'Enviada', className: 'bg-info/10 text-info border border-info/20' },
  EM_ANALISE: { label: 'Em Análise', className: 'bg-warning/10 text-warning border border-warning/20' },
  PENDENTE_DOC: { label: 'Pendente Doc.', className: 'bg-warning/10 text-warning border border-warning/20' },
  APROVADA: { label: 'Aprovada', className: 'bg-success/10 text-success border border-success/20' },
  REPROVADA: { label: 'Reprovada', className: 'bg-destructive/10 text-destructive border border-destructive/20' },
  CANCELADA: { label: 'Cancelada', className: 'bg-muted text-muted-foreground' },
  LIQUIDADA: { label: 'Liquidada', className: 'bg-primary/10 text-primary border border-primary/20' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
