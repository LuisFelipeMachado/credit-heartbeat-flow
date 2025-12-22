import { MainLayout } from '@/components/layout';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Search, CheckCircle, XCircle, Wallet, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import { mockDashboardStats, getEnrichedPropostas } from '@/data/mockData';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const recentPropostas = getEnrichedPropostas().slice(0, 5);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Visão geral do sistema de crédito consignado</p>
          </div>
          <Button asChild className="gap-2">
            <Link to="/propostas/nova">
              <Plus className="h-4 w-4" />
              Nova Proposta
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatCard title="Total Propostas" value={mockDashboardStats.totalPropostas} icon={FileText} variant="default" />
          <StatCard title="Em Análise" value={mockDashboardStats.emAnalise} icon={Search} variant="warning" />
          <StatCard title="Aprovadas" value={mockDashboardStats.aprovadas} icon={CheckCircle} variant="success" />
          <StatCard title="Reprovadas" value={mockDashboardStats.reprovadas} icon={XCircle} variant="destructive" />
          <StatCard title="Carteira Ativa" value={formatCurrency(mockDashboardStats.carteiraAtiva)} icon={Wallet} variant="primary" />
          <StatCard title="Taxa Aprovação" value={`${mockDashboardStats.taxaAprovacao}%`} icon={TrendingUp} variant="success" />
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Propostas Recentes</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/propostas" className="gap-1">Ver todas <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPropostas.map((proposta) => (
                <div key={proposta.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">{proposta.cliente_nome}</p>
                      <p className="text-sm text-muted-foreground">{proposta.cliente_cpf}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(proposta.valor_solicitado)}</p>
                      <p className="text-sm text-muted-foreground">{proposta.prazo_meses} meses</p>
                    </div>
                    <StatusBadge status={proposta.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
