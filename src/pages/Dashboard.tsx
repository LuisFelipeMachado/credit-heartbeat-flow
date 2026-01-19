import { MainLayout } from '@/components/layout';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Search, 
  CheckCircle, 
  XCircle, 
  Wallet, 
  TrendingUp, 
  Plus, 
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Building2,
  Users
} from 'lucide-react';
import { mockDashboardStats, getEnrichedPropostas, mockLojas } from '@/data/mockData';
import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Mock data para gráficos
const volumeMensal = [
  { mes: 'Jan', propostas: 45, aprovadas: 32, valor: 850000 },
  { mes: 'Fev', propostas: 52, aprovadas: 38, valor: 920000 },
  { mes: 'Mar', propostas: 61, aprovadas: 44, valor: 1100000 },
  { mes: 'Abr', propostas: 58, aprovadas: 41, valor: 980000 },
  { mes: 'Mai', propostas: 72, aprovadas: 55, valor: 1350000 },
  { mes: 'Jun', propostas: 68, aprovadas: 49, valor: 1200000 },
];

const statusDistribuicao = [
  { name: 'Aprovadas', value: 89, color: 'hsl(142, 71%, 45%)' },
  { name: 'Reprovadas', value: 34, color: 'hsl(0, 84%, 60%)' },
  { name: 'Em Análise', value: 23, color: 'hsl(38, 92%, 50%)' },
  { name: 'Pendentes', value: 10, color: 'hsl(217, 91%, 60%)' },
];

const lojaPerformance = [
  { loja: 'Centro', propostas: 68, aprovacao: 78 },
  { loja: 'Pinheiros', propostas: 52, aprovacao: 72 },
  { loja: 'Campinas', propostas: 36, aprovacao: 69 },
];

export default function Dashboard() {
  const recentPropostas = getEnrichedPropostas().slice(0, 5);
  const pendentesAnalise = getEnrichedPropostas().filter(p => 
    p.status === 'ENVIADA' || p.status === 'EM_ANALISE'
  ).length;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatCompactCurrency = (value: number) => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(0)}K`;
    }
    return formatCurrency(value);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
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

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatCard title="Total Propostas" value={mockDashboardStats.totalPropostas} icon={FileText} variant="default" />
          <StatCard title="Em Análise" value={mockDashboardStats.emAnalise} icon={Search} variant="warning" />
          <StatCard title="Aprovadas" value={mockDashboardStats.aprovadas} icon={CheckCircle} variant="success" />
          <StatCard title="Reprovadas" value={mockDashboardStats.reprovadas} icon={XCircle} variant="destructive" />
          <StatCard title="Carteira Ativa" value={formatCurrency(mockDashboardStats.carteiraAtiva)} icon={Wallet} variant="primary" />
          <StatCard title="Taxa Aprovação" value={`${mockDashboardStats.taxaAprovacao}%`} icon={TrendingUp} variant="success" />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Volume de Propostas - Area Chart */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg font-semibold">Volume de Propostas</CardTitle>
                <p className="text-sm text-muted-foreground">Últimos 6 meses</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Enviadas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-success" />
                  <span className="text-muted-foreground">Aprovadas</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={volumeMensal} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPropostas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(222, 47%, 20%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(222, 47%, 20%)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorAprovadas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="mes" 
                      axisLine={false}
                      tickLine={false}
                      className="text-xs fill-muted-foreground"
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      className="text-xs fill-muted-foreground"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="propostas" 
                      stroke="hsl(222, 47%, 20%)" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorPropostas)" 
                      name="Enviadas"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="aprovadas" 
                      stroke="hsl(142, 71%, 45%)" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorAprovadas)" 
                      name="Aprovadas"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Status Distribution - Pie Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Distribuição por Status</CardTitle>
              <p className="text-sm text-muted-foreground">Total: {mockDashboardStats.totalPropostas}</p>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistribuicao}
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {statusDistribuicao.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Performance por Loja */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Performance por Loja</CardTitle>
              <p className="text-sm text-muted-foreground">Taxa de aprovação</p>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={lojaPerformance} layout="vertical" margin={{ left: 0, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={true} vertical={false} />
                    <XAxis 
                      type="number" 
                      domain={[0, 100]}
                      axisLine={false}
                      tickLine={false}
                      className="text-xs fill-muted-foreground"
                      tickFormatter={(value) => `${value}%`}
                    />
                    <YAxis 
                      dataKey="loja" 
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      className="text-xs fill-muted-foreground"
                      width={70}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${value}%`, 'Taxa de Aprovação']}
                    />
                    <Bar 
                      dataKey="aprovacao" 
                      fill="hsl(217, 91%, 60%)"
                      radius={[0, 4, 4, 0]}
                      barSize={24}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Cards */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Métricas Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tempo Médio Análise</p>
                    <p className="font-semibold">2.4 dias</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-success text-sm">
                  <ArrowDownRight className="h-4 w-4" />
                  <span>-12%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Wallet className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ticket Médio</p>
                    <p className="font-semibold">R$ 32.500</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-success text-sm">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+8%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <Building2 className="h-4 w-4 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lojas Ativas</p>
                    <p className="font-semibold">{mockLojas.filter(l => l.ativo).length}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-info/10">
                    <Users className="h-4 w-4 text-info" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pendentes Análise</p>
                    <p className="font-semibold">{pendentesAnalise}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Propostas Recentes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Propostas Recentes</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/propostas" className="gap-1 text-xs">
                  Ver todas <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentPropostas.slice(0, 4).map((proposta) => (
                  <div 
                    key={proposta.id} 
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{proposta.cliente_nome}</p>
                      <p className="text-xs text-muted-foreground">{formatCurrency(proposta.valor_solicitado)}</p>
                    </div>
                    <StatusBadge status={proposta.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
