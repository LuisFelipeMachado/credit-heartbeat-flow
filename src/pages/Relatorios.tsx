import { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  TrendingUp,
  Users,
  Building2,
  Download,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

// Mock data
const comissoesPorVendedor = [
  { vendedor: 'Maria Silva', loja: 'Centro', propostas: 18, aprovadas: 14, valor_total: 385000, comissao: 13475, taxa_aprovacao: 77.8 },
  { vendedor: 'João Santos', loja: 'Centro', propostas: 15, aprovadas: 11, valor_total: 290000, comissao: 10150, taxa_aprovacao: 73.3 },
  { vendedor: 'Ana Oliveira', loja: 'Pinheiros', propostas: 22, aprovadas: 17, valor_total: 510000, comissao: 17850, taxa_aprovacao: 77.3 },
  { vendedor: 'Carlos Ferreira', loja: 'Pinheiros', propostas: 12, aprovadas: 8, valor_total: 180000, comissao: 6300, taxa_aprovacao: 66.7 },
  { vendedor: 'Fernanda Costa', loja: 'Campinas', propostas: 10, aprovadas: 7, valor_total: 155000, comissao: 5425, taxa_aprovacao: 70.0 },
];

const evolucaoMensal = [
  { mes: 'Jan', contratado: 620000, comissoes: 21700 },
  { mes: 'Fev', contratado: 730000, comissoes: 25550 },
  { mes: 'Mar', contratado: 880000, comissoes: 30800 },
  { mes: 'Abr', contratado: 810000, comissoes: 28350 },
  { mes: 'Mai', contratado: 1050000, comissoes: 36750 },
  { mes: 'Jun', contratado: 960000, comissoes: 33600 },
];

const comissoesPorLoja = [
  { loja: 'Centro', comissao: 23625 },
  { loja: 'Pinheiros', comissao: 24150 },
  { loja: 'Campinas', comissao: 5425 },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const formatCompact = (value: number) => {
  if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)}K`;
  return formatCurrency(value);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border bg-card p-3 shadow-lg">
      <p className="text-sm font-semibold text-foreground mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-medium text-foreground">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  change?: { value: number; direction: 'up' | 'down' };
}

function MetricCard({ title, value, icon: Icon, iconBg, iconColor, change }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">{title}</p>
            <p className="text-xl font-bold tracking-tight">{value}</p>
          </div>
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
        {change && (
          <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${change.direction === 'up' ? 'text-success' : 'text-destructive'}`}>
            {change.direction === 'up' ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            <span>{change.value}% vs mês anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Relatorios() {
  const [periodo, setPeriodo] = useState('6m');
  const [lojaFiltro, setLojaFiltro] = useState('todas');

  const totalContratado = evolucaoMensal.reduce((s, m) => s + m.contratado, 0);
  const totalComissoes = evolucaoMensal.reduce((s, m) => s + m.comissoes, 0);
  const ticketMedio = totalContratado / comissoesPorVendedor.reduce((s, v) => s + v.aprovadas, 0);

  const vendedoresFiltrados = lojaFiltro === 'todas'
    ? comissoesPorVendedor
    : comissoesPorVendedor.filter(v => v.loja === lojaFiltro);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight">Relatórios</h1>
            <p className="text-sm text-muted-foreground mt-1">Financeiro e comissões de vendedores</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger className="w-[140px]">
                <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Último mês</SelectItem>
                <SelectItem value="3m">3 meses</SelectItem>
                <SelectItem value="6m">6 meses</SelectItem>
                <SelectItem value="12m">12 meses</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Contratado"
            value={formatCompact(totalContratado)}
            icon={DollarSign}
            iconBg="bg-accent/10"
            iconColor="text-accent"
            change={{ value: 14, direction: 'up' }}
          />
          <MetricCard
            title="Total Comissões"
            value={formatCompact(totalComissoes)}
            icon={TrendingUp}
            iconBg="bg-success/10"
            iconColor="text-success"
            change={{ value: 9, direction: 'up' }}
          />
          <MetricCard
            title="Ticket Médio"
            value={formatCurrency(ticketMedio)}
            icon={DollarSign}
            iconBg="bg-warning/10"
            iconColor="text-warning"
            change={{ value: 5, direction: 'up' }}
          />
          <MetricCard
            title="Vendedores Ativos"
            value={String(comissoesPorVendedor.length)}
            icon={Users}
            iconBg="bg-info/10"
            iconColor="text-info"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Evolução mensal */}
          <Card className="lg:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Evolução Financeira</CardTitle>
              <p className="text-sm text-muted-foreground">Valores contratados e comissões por mês</p>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={evolucaoMensal} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradContratado" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradComissoes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                    <XAxis dataKey="mes" axisLine={false} tickLine={false} className="text-xs fill-muted-foreground" dy={10} />
                    <YAxis axisLine={false} tickLine={false} className="text-xs fill-muted-foreground" tickFormatter={(v) => formatCompact(v)} dx={-5} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="contratado"
                      stroke="hsl(217, 91%, 60%)"
                      strokeWidth={2.5}
                      fill="url(#gradContratado)"
                      name="Contratado"
                      dot={{ r: 4, fill: 'hsl(217, 91%, 60%)', strokeWidth: 2, stroke: 'hsl(var(--card))' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="comissoes"
                      stroke="hsl(142, 71%, 45%)"
                      strokeWidth={2.5}
                      fill="url(#gradComissoes)"
                      name="Comissões"
                      dot={{ r: 4, fill: 'hsl(142, 71%, 45%)', strokeWidth: 2, stroke: 'hsl(var(--card))' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Comissões por Loja */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                  <Building2 className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">Comissões por Loja</CardTitle>
                  <p className="text-xs text-muted-foreground">Distribuição mensal</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comissoesPorLoja} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                    <XAxis dataKey="loja" axisLine={false} tickLine={false} className="text-xs fill-muted-foreground" dy={10} />
                    <YAxis axisLine={false} tickLine={false} className="text-xs fill-muted-foreground" tickFormatter={(v) => formatCompact(v)} dx={-5} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="comissao"
                      fill="hsl(217, 91%, 60%)"
                      radius={[6, 6, 0, 0]}
                      barSize={40}
                      name="Comissão"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Comissões por Vendedor */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-lg font-semibold">Comissões por Vendedor</CardTitle>
              <p className="text-sm text-muted-foreground">Detalhamento individual de performance e comissões</p>
            </div>
            <Select value={lojaFiltro} onValueChange={setLojaFiltro}>
              <SelectTrigger className="w-[160px]">
                <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as lojas</SelectItem>
                <SelectItem value="Centro">Centro</SelectItem>
                <SelectItem value="Pinheiros">Pinheiros</SelectItem>
                <SelectItem value="Campinas">Campinas</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendedor</TableHead>
                  <TableHead>Loja</TableHead>
                  <TableHead className="text-center">Propostas</TableHead>
                  <TableHead className="text-center">Aprovadas</TableHead>
                  <TableHead className="text-center">Taxa</TableHead>
                  <TableHead className="text-right">Valor Total</TableHead>
                  <TableHead className="text-right">Comissão</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendedoresFiltrados.map((v) => (
                  <TableRow key={v.vendedor} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{v.vendedor}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">{v.loja}</Badge>
                    </TableCell>
                    <TableCell className="text-center">{v.propostas}</TableCell>
                    <TableCell className="text-center">{v.aprovadas}</TableCell>
                    <TableCell className="text-center">
                      <span className={v.taxa_aprovacao >= 75 ? 'text-success font-medium' : 'text-warning font-medium'}>
                        {v.taxa_aprovacao}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(v.valor_total)}</TableCell>
                    <TableCell className="text-right font-bold text-accent">{formatCurrency(v.comissao)}</TableCell>
                  </TableRow>
                ))}
                {/* Total Row */}
                <TableRow className="bg-muted/30 font-bold border-t-2">
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell className="text-center">{vendedoresFiltrados.reduce((s, v) => s + v.propostas, 0)}</TableCell>
                  <TableCell className="text-center">{vendedoresFiltrados.reduce((s, v) => s + v.aprovadas, 0)}</TableCell>
                  <TableCell className="text-center">—</TableCell>
                  <TableCell className="text-right">{formatCurrency(vendedoresFiltrados.reduce((s, v) => s + v.valor_total, 0))}</TableCell>
                  <TableCell className="text-right text-accent">{formatCurrency(vendedoresFiltrados.reduce((s, v) => s + v.comissao, 0))}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
