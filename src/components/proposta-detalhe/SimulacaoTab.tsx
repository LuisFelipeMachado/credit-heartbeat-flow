import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calculator, TrendingUp, Percent } from 'lucide-react';
import type { Proposta } from '@/types';

interface SimulacaoTabProps {
  proposta: Proposta;
}

export function SimulacaoTab({ proposta }: SimulacaoTabProps) {
  const formatCurrency = (value?: number) => {
    if (!value) return '-';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  // Cálculo da simulação
  const calcularParcela = () => {
    if (!proposta.valor_solicitado || !proposta.prazo_meses || !proposta.taxa_aplicada) {
      return null;
    }

    const valor = proposta.valor_solicitado;
    const meses = proposta.prazo_meses;
    const taxaMensal = proposta.taxa_aplicada / 100;

    // Cálculo Price
    const parcela = valor * (taxaMensal * Math.pow(1 + taxaMensal, meses)) / (Math.pow(1 + taxaMensal, meses) - 1);
    const totalPagar = parcela * meses;
    const jurosTotal = totalPagar - valor;
    const taxaAnual = (Math.pow(1 + taxaMensal, 12) - 1) * 100;
    const cet = ((totalPagar / valor - 1) / meses * 12) * 100;

    return {
      parcela,
      totalPagar,
      jurosTotal,
      taxaAnual,
      cet
    };
  };

  const simulacao = calcularParcela();

  return (
    <div className="space-y-6 pt-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-accent" />
            <CardTitle>Valores Solicitados</CardTitle>
          </div>
          <CardDescription>
            Dados da simulação do empréstimo
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Valor Solicitado</Label>
              <Input 
                value={formatCurrency(proposta.valor_solicitado)} 
                disabled 
                className="bg-muted text-lg font-semibold" 
              />
            </div>
            <div className="space-y-2">
              <Label>Prazo</Label>
              <Input 
                value={proposta.prazo_meses ? `${proposta.prazo_meses} meses` : '-'} 
                disabled 
                className="bg-muted" 
              />
            </div>
            <div className="space-y-2">
              <Label>Carência</Label>
              <Input 
                value={proposta.carencia_meses ? `${proposta.carencia_meses} meses` : '-'} 
                disabled 
                className="bg-muted" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-muted-foreground" />
                Taxa Mensal
              </Label>
              <Input 
                value={proposta.taxa_aplicada ? `${proposta.taxa_aplicada}% a.m.` : '-'} 
                disabled 
                className="bg-muted" 
              />
            </div>
            <div className="space-y-2">
              <Label>Política Comercial</Label>
              <Input 
                value={proposta.politica?.nome || '-'} 
                disabled 
                className="bg-muted" 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {simulacao && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <CardTitle>Resultado da Simulação</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-accent/10 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Valor da Parcela</span>
                <Badge variant="secondary" className="text-xl font-bold py-2 px-4 bg-accent text-accent-foreground">
                  {formatCurrency(simulacao.parcela)}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Taxa Anual</p>
                <p className="font-semibold">{simulacao.taxaAnual.toFixed(2)}%</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">CET Anual</p>
                <p className="font-semibold">{simulacao.cet.toFixed(2)}%</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Total de Juros</p>
                <p className="font-semibold">{formatCurrency(simulacao.jurosTotal)}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-1">Total a Pagar</p>
                <p className="font-semibold">{formatCurrency(simulacao.totalPagar)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
