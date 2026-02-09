import { StatCard } from '@/components/ui/stat-card';
import {
  FileText,
  Search,
  CheckCircle,
  XCircle,
  Wallet,
  TrendingUp,
} from 'lucide-react';
import { mockDashboardStats } from '@/data/mockData';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export function StatsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <StatCard
        title="Total Propostas"
        value={mockDashboardStats.totalPropostas}
        icon={FileText}
        variant="default"
        trend={{ value: 12, label: 'vs mês anterior' }}
      />
      <StatCard
        title="Em Análise"
        value={mockDashboardStats.emAnalise}
        icon={Search}
        variant="warning"
        trend={{ value: -5, label: 'vs mês anterior' }}
      />
      <StatCard
        title="Aprovadas"
        value={mockDashboardStats.aprovadas}
        icon={CheckCircle}
        variant="success"
        trend={{ value: 8, label: 'vs mês anterior' }}
      />
      <StatCard
        title="Reprovadas"
        value={mockDashboardStats.reprovadas}
        icon={XCircle}
        variant="destructive"
        trend={{ value: -3, label: 'vs mês anterior' }}
      />
      <StatCard
        title="Carteira Ativa"
        value={formatCurrency(mockDashboardStats.carteiraAtiva)}
        icon={Wallet}
        variant="primary"
        trend={{ value: 15, label: 'crescimento' }}
      />
      <StatCard
        title="Taxa Aprovação"
        value={`${mockDashboardStats.taxaAprovacao}%`}
        icon={TrendingUp}
        variant="success"
        trend={{ value: 2.1, label: 'vs mês anterior' }}
      />
    </div>
  );
}
