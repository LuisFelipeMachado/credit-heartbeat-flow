import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Wallet,
  Building2,
  Users,
} from 'lucide-react';
import { getEnrichedPropostas, mockLojas } from '@/data/mockData';

interface MetricRowProps {
  icon: React.ElementType;
  iconClass: string;
  bgClass: string;
  label: string;
  value: string | number;
  change?: { value: number; direction: 'up' | 'down' };
}

function MetricRow({ icon: Icon, iconClass, bgClass, label, value, change }: MetricRowProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/50 transition-colors hover:bg-muted/60">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${bgClass}`}>
          <Icon className={`h-4 w-4 ${iconClass}`} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-sm font-bold">{value}</p>
        </div>
      </div>
      {change && (
        <div className={`flex items-center gap-0.5 text-xs font-medium ${change.direction === 'up' ? 'text-success' : 'text-success'}`}>
          {change.direction === 'up' ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          <span>{change.direction === 'up' ? '+' : '-'}{Math.abs(change.value)}%</span>
        </div>
      )}
    </div>
  );
}

export function QuickMetrics() {
  const pendentesAnalise = getEnrichedPropostas().filter(
    (p) => p.status === 'ENVIADA' || p.status === 'EM_ANALISE'
  ).length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Métricas Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <MetricRow
          icon={Clock}
          iconClass="text-accent"
          bgClass="bg-accent/10"
          label="Tempo Médio Análise"
          value="2.4 dias"
          change={{ value: 12, direction: 'down' }}
        />
        <MetricRow
          icon={Wallet}
          iconClass="text-success"
          bgClass="bg-success/10"
          label="Ticket Médio"
          value="R$ 32.500"
          change={{ value: 8, direction: 'up' }}
        />
        <MetricRow
          icon={Building2}
          iconClass="text-warning"
          bgClass="bg-warning/10"
          label="Lojas Ativas"
          value={mockLojas.filter((l) => l.ativo).length}
        />
        <MetricRow
          icon={Users}
          iconClass="text-info"
          bgClass="bg-info/10"
          label="Pendentes Análise"
          value={pendentesAnalise}
        />
      </CardContent>
    </Card>
  );
}
