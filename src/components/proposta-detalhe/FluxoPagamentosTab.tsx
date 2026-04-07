import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, TrendingUp, Calendar, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import type { Proposta } from '@/types';

interface FluxoPagamentosTabProps {
  proposta: Proposta;
}

const generateParcelas = (proposta: FluxoPagamentosTabProps['proposta']) => {
  const total = proposta.prazo_meses || 12;
  const valorParcela = proposta.valor_solicitado / total;
  const parcelas = [];
  const now = new Date();

  for (let i = 1; i <= total; i++) {
    const vencimento = new Date(proposta.created_at || '2024-01-15');
    vencimento.setMonth(vencimento.getMonth() + i);

    let status: 'pago' | 'aberto' | 'vencido' = 'aberto';
    if (vencimento < now && i <= 3) status = 'pago';
    else if (vencimento < now) status = 'vencido';

    parcelas.push({
      numero: i,
      vencimento: vencimento.toISOString().split('T')[0],
      principal: valorParcela * 0.7,
      juros: valorParcela * 0.25,
      seguro: valorParcela * 0.05,
      total: valorParcela,
      status,
    });
  }
  return parcelas;
};

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ReactNode }> = {
  pago: { label: 'Pago', variant: 'default', icon: <CheckCircle2 className="h-3 w-3" /> },
  aberto: { label: 'Aberto', variant: 'outline', icon: <Clock className="h-3 w-3" /> },
  vencido: { label: 'Vencido', variant: 'destructive', icon: <AlertTriangle className="h-3 w-3" /> },
};

export function FluxoPagamentosTab({ proposta }: FluxoPagamentosTabProps) {
  const parcelas = generateParcelas(proposta);
  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

  const totalPago = parcelas.filter(p => p.status === 'pago').reduce((s, p) => s + p.total, 0);
  const totalAberto = parcelas.filter(p => p.status !== 'pago').reduce((s, p) => s + p.total, 0);
  const totalVencido = parcelas.filter(p => p.status === 'vencido').reduce((s, p) => s + p.total, 0);
  const progresso = (parcelas.filter(p => p.status === 'pago').length / parcelas.length) * 100;

  return (
    <div className="space-y-4 mt-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Total Pago</span>
            </div>
            <p className="text-lg font-bold text-primary">{formatCurrency(totalPago)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Saldo Aberto</span>
            </div>
            <p className="text-lg font-bold text-foreground">{formatCurrency(totalAberto)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Vencido</span>
            </div>
            <p className="text-lg font-bold text-destructive">{formatCurrency(totalVencido)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Progresso</span>
            </div>
            <p className="text-lg font-bold text-foreground">{progresso.toFixed(0)}%</p>
            <div className="w-full h-1.5 bg-muted rounded-full mt-2">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progresso}%` }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Installments Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Parcelas
          </CardTitle>
          <CardDescription>{parcelas.length} parcelas no contrato</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-16 text-center">#</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead className="text-right">Principal</TableHead>
                  <TableHead className="text-right">Juros</TableHead>
                  <TableHead className="text-right">Seguro</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parcelas.map((p) => {
                  const config = statusConfig[p.status];
                  return (
                    <TableRow key={p.numero} className={p.status === 'vencido' ? 'bg-destructive/5' : ''}>
                      <TableCell className="text-center font-mono text-sm">{p.numero}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {new Date(p.vencimento).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(p.principal)}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(p.juros)}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(p.seguro)}</TableCell>
                      <TableCell className="text-right font-mono text-sm font-medium">{formatCurrency(p.total)}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={config.variant} className="gap-1 text-xs">
                          {config.icon} {config.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
