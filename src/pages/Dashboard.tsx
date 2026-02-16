import { MainLayout } from '@/components/layout';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { DashboardChart } from '@/components/dashboard/DashboardChart';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { getDashboardStats } from '@/data/mockData';
import {
  FileText,
  CheckCircle,
  XCircle,
  PenTool,
  Clock,
  Wallet,
  TrendingUp,
  Search,
} from 'lucide-react';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default function Dashboard() {
  const stats = getDashboardStats();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Visão geral das propostas de crédito consignado</p>
        </div>

        <DashboardFilters />

        {/* Row 1: Chart + Valor Acumulado */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <DashboardChart />
          <div className="grid gap-4 grid-cols-1">
            <MetricCard
              title="Valor Acumulado"
              value={formatCurrency(stats.valorAcumulado)}
              subtitle="Propostas aprovadas + averbadas"
              icon={Wallet}
              iconColor="text-emerald-600"
            />
            <MetricCard
              title="Total de Propostas"
              value={stats.totalPropostas}
              icon={FileText}
              iconColor="text-blue-600"
            />
          </div>
        </div>

        {/* Row 2: Averbadas + Aguardando Assinatura */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <MetricCard
            title="Averbadas"
            value={stats.averbadas}
            subtitle="Contratos registrados no RH"
            icon={CheckCircle}
            iconColor="text-emerald-600"
          />
          <MetricCard
            title="Aguardando Assinatura"
            value={stats.aguardandoAssinatura}
            icon={PenTool}
            iconColor="text-sky-600"
          />
        </div>

        {/* Row 3: Em Análise + Pendente Doc */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <MetricCard
            title="Em Análise"
            value={stats.emAnalise}
            icon={Search}
            iconColor="text-amber-600"
          />
          <MetricCard
            title="Pendente Documentação"
            value={stats.pendenteDoc}
            icon={Clock}
            iconColor="text-orange-600"
          />
        </div>

        {/* Row 4: Rejeitadas + Taxa Aprovação */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <MetricCard
            title="Rejeitadas"
            value={stats.reprovadas}
            icon={XCircle}
            iconColor="text-red-600"
          />
          <MetricCard
            title="Taxa de Aprovação"
            value={`${stats.taxaAprovacao}%`}
            icon={TrendingUp}
            iconColor="text-violet-600"
          />
        </div>
      </div>
    </MainLayout>
  );
}
