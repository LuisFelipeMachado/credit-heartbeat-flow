import { MainLayout } from '@/components/layout';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { DashboardChart } from '@/components/dashboard/DashboardChart';
import { MetricCard } from '@/components/dashboard/MetricCard';
import {
  DollarSign,
  ShoppingCart,
  CreditCard,
  MousePointerClick,
  RotateCcw,
  FileText,
  AlertTriangle,
  Receipt,
} from 'lucide-react';

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Visão geral financeira</p>
        </div>

        <DashboardFilters />

        {/* Row 1: Chart + Valor Líquido */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <DashboardChart />
          <div className="grid gap-4 grid-cols-1">
            <MetricCard
              title="Valor líquido"
              value="R$ 0,00"
              icon={DollarSign}
              iconColor="text-emerald-600"
            />
            <MetricCard
              title="Vendas"
              value="0"
              icon={ShoppingCart}
              iconColor="text-blue-600"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <MetricCard
            title="Aprovação cartão"
            value="0%"
            icon={CreditCard}
            iconColor="text-violet-600"
          />
          <MetricCard
            title="Vendas 1-click da rede"
            value="R$ 0,00"
            subtitle="0%"
            icon={MousePointerClick}
            iconColor="text-sky-600"
          />
        </div>

        {/* Row 3 */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <MetricCard
            title="Reembolso"
            value="0%"
            icon={RotateCcw}
            iconColor="text-amber-600"
          />
          <MetricCard
            title="Conversão boleto"
            value="0%"
            icon={Receipt}
            iconColor="text-teal-600"
          />
        </div>

        {/* Row 4 */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <MetricCard
            title="Chargeback"
            value="0%"
            icon={AlertTriangle}
            iconColor="text-red-600"
          />
          <MetricCard
            title="Boletos gerados"
            value="0"
            icon={FileText}
            iconColor="text-gray-600"
          />
        </div>
      </div>
    </MainLayout>
  );
}
