import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calculator, TrendingUp, Percent, Clock, Landmark } from 'lucide-react';
import { DataField } from './DataField';
import type { Proposta } from '@/types';

interface SimulacaoTabProps {
  proposta: Proposta;
}

export function SimulacaoTab({ proposta }: SimulacaoTabProps) {
  const formatCurrency = (value?: number) => {
    if (!value) return '-';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const calcularParcela = () => {
    if (!proposta.valor_solicitado || !proposta.prazo_meses || !proposta.taxa_aplicada) return null;

    const valor = proposta.valor_solicitado;
    const meses = proposta.prazo_meses;
    const taxaMensal = proposta.taxa_aplicada / 100;

    const parcela = valor * (taxaMensal * Math.pow(1 + taxaMensal, meses)) / (Math.pow(1 + taxaMensal, meses) - 1);
    const totalPagar = parcela * meses;
    const jurosTotal = totalPagar - valor;
    const taxaAnual = (Math.pow(1 + taxaMensal, 12) - 1) * 100;
    const cet = ((totalPagar / valor - 1) / meses * 12) * 100;

    return { parcela, totalPagar, jurosTotal, taxaAnual, cet };
  };

  const simulacao = calcularParcela();

  return (
    <div className="space-y-4 pt-4">
      <Card className="rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Calculator className="h-4 w-4 text-accent" />
            </div>
            <div>
              <CardTitle className="text-lg">Valores Solicitados</CardTitle>
              <CardDescription>Dados da simulação do empréstimo</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4">
            <DataField label="Valor Solicitado" value={formatCurrency(proposta.valor_solicitado)} highlight />
            <DataField label="Prazo" value={proposta.prazo_meses} suffix=" meses" icon={Clock} />
            <DataField label="Carência" value={proposta.carencia_meses} suffix=" meses" />
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            <DataField label="Taxa Mensal" value={proposta.taxa_aplicada} suffix="% a.m." icon={Percent} />
            <DataField label="Política Comercial" value={proposta.politica?.nome} icon={Landmark} />
          </div>
        </CardContent>
      </Card>

      {simulacao && (
        <Card className="rounded-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-accent" />
              </div>
              <CardTitle className="text-lg">Resultado da Simulação</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Parcela Highlight */}
            <div className="flex items-center justify-between p-5 rounded-xl border-2 border-accent/30 bg-accent/5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Valor da Parcela</p>
                <p className="text-xs text-muted-foreground mt-0.5">{proposta.prazo_meses}x parcelas fixas</p>
              </div>
              <span className="text-2xl font-bold text-accent">{formatCurrency(simulacao.parcela)}</span>
            </div>

            {/* Grid metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Taxa Anual', value: `${simulacao.taxaAnual.toFixed(2)}%` },
                { label: 'CET Anual', value: `${simulacao.cet.toFixed(2)}%` },
                { label: 'Total de Juros', value: formatCurrency(simulacao.jurosTotal) },
                { label: 'Total a Pagar', value: formatCurrency(simulacao.totalPagar) },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-muted/50 rounded-xl text-center space-y-1">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
