import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, TrendingUp, Calendar, CheckCircle2, Clock, FileText, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
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

    let status: 'pago' | 'em_aberto' = 'em_aberto';
    if (vencimento < now && i <= 3) status = 'pago';

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
  em_aberto: { label: 'Em Aberto', variant: 'outline', icon: <Clock className="h-3 w-3" /> },
};

export function FluxoPagamentosTab({ proposta }: FluxoPagamentosTabProps) {
  const parcelas = generateParcelas(proposta);
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState<'todos' | 'pago' | 'em_aberto'>('todos');

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

  const totalPago = parcelas.filter(p => p.status === 'pago').reduce((s, p) => s + p.total, 0);
  const totalAberto = parcelas.filter(p => p.status === 'em_aberto').reduce((s, p) => s + p.total, 0);
  const progresso = (parcelas.filter(p => p.status === 'pago').length / parcelas.length) * 100;

  const filtered = statusFilter === 'todos' ? parcelas : parcelas.filter(p => p.status === statusFilter);

  const toggleSelect = (numero: number, status: string) => {
    if (status === 'pago') return;
    setSelectedKeys(prev =>
      prev.includes(numero) ? prev.filter(n => n !== numero) : [...prev, numero]
    );
  };

  const selectAllOpen = () => {
    const openNums = filtered.filter(p => p.status === 'em_aberto').map(p => p.numero);
    const allSelected = openNums.every(n => selectedKeys.includes(n));
    setSelectedKeys(allSelected ? selectedKeys.filter(n => !openNums.includes(n)) : [...new Set([...selectedKeys, ...openNums])]);
  };

  const handleEmitirBoleto = () => {
    const selected = parcelas.filter(p => selectedKeys.includes(p.numero));
    const total = selected.reduce((s, p) => s + p.total, 0);
    toast.success(`Boleto emitido para ${selected.length} parcela(s) — ${formatCurrency(total)}`);
  };

  const handleRenegociar = () => {
    toast.info(`Renegociação iniciada para ${selectedKeys.length} parcela(s) selecionada(s)`);
  };

  const selectedTotal = parcelas.filter(p => selectedKeys.includes(p.numero)).reduce((s, p) => s + p.total, 0);
  const openInFiltered = filtered.filter(p => p.status === 'em_aberto');
  const allOpenSelected = openInFiltered.length > 0 && openInFiltered.every(p => selectedKeys.includes(p.numero));

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
              <span className="text-xs font-medium uppercase tracking-wider">Saldo Em Aberto</span>
            </div>
            <p className="text-lg font-bold text-foreground">{formatCurrency(totalAberto)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Selecionadas</span>
            </div>
            <p className="text-lg font-bold text-foreground">{selectedKeys.length} — {formatCurrency(selectedTotal)}</p>
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

      {/* Toolbar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filtrar status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="pago">Pago</SelectItem>
                  <SelectItem value="em_aberto">Em Aberto</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">{filtered.length} parcelas</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEmitirBoleto}
                disabled={selectedKeys.length === 0}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                Emitir Boleto
              </Button>
              <Button
                size="sm"
                onClick={handleRenegociar}
                disabled={selectedKeys.length === 0}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Renegociar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
                  <TableHead className="w-12 text-center">
                    <Checkbox
                      checked={allOpenSelected}
                      onCheckedChange={selectAllOpen}
                      aria-label="Selecionar todas em aberto"
                    />
                  </TableHead>
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
                {filtered.map((p) => {
                  const config = statusConfig[p.status];
                  const isOpen = p.status === 'em_aberto';
                  const isSelected = selectedKeys.includes(p.numero);
                  return (
                    <TableRow
                      key={p.numero}
                      className={cn(
                        isSelected && 'bg-primary/5',
                        isOpen && 'cursor-pointer',
                      )}
                      onClick={() => isOpen && toggleSelect(p.numero, p.status)}
                    >
                      <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelect(p.numero, p.status)}
                          disabled={!isOpen}
                          aria-label={`Selecionar parcela ${p.numero}`}
                        />
                      </TableCell>
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

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
