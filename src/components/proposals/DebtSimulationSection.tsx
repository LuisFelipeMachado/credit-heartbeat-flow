import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Calculator, 
  TrendingUp,
  Loader2
} from 'lucide-react';

interface DebtSimulationSectionProps {
  valorSolicitado: string;
  setValorSolicitado: (value: string) => void;
  prazo: string;
  setPrazo: (value: string) => void;
}

interface SimulationResult {
  valorParcela: number;
  taxaJuros: number;
  taxaMensal: number;
  totalPagar: number;
  cet: number;
}

export function DebtSimulationSection({ 
  valorSolicitado, 
  setValorSolicitado,
  prazo,
  setPrazo
}: DebtSimulationSectionProps) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const amount = parseInt(numbers || '0') / 100;
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const parseCurrency = (value: string): number => {
    const numbers = value.replace(/\D/g, '');
    return parseInt(numbers || '0') / 100;
  };

  const handleSimulate = () => {
    const valor = parseCurrency(valorSolicitado);
    const meses = parseInt(prazo);

    if (!valor || !meses) {
      return;
    }

    setIsSimulating(true);

    // Simula cálculo
    setTimeout(() => {
      const taxaMensal = 1.99; // 1.99% ao mês
      const taxaAnual = Math.pow(1 + taxaMensal / 100, 12) - 1;
      
      // Cálculo Price
      const i = taxaMensal / 100;
      const n = meses;
      const parcela = valor * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
      const totalPagar = parcela * meses;
      const cet = ((totalPagar / valor - 1) / meses * 12) * 100;

      setSimulation({
        valorParcela: parcela,
        taxaJuros: taxaAnual * 100,
        taxaMensal: taxaMensal,
        totalPagar: totalPagar,
        cet: cet
      });
      setIsSimulating(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-accent" />
          <CardTitle>3. Simulação de Dívida</CardTitle>
        </div>
        <CardDescription>
          Simule as condições do empréstimo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="valor">Valor Solicitado</Label>
            <Input
              id="valor"
              placeholder="R$ 0,00"
              value={valorSolicitado}
              onChange={(e) => setValorSolicitado(formatCurrency(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prazo">Prazo (meses)</Label>
            <Select value={prazo} onValueChange={setPrazo}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o prazo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6 meses</SelectItem>
                <SelectItem value="12">12 meses</SelectItem>
                <SelectItem value="18">18 meses</SelectItem>
                <SelectItem value="24">24 meses</SelectItem>
                <SelectItem value="36">36 meses</SelectItem>
                <SelectItem value="48">48 meses</SelectItem>
                <SelectItem value="60">60 meses</SelectItem>
                <SelectItem value="72">72 meses</SelectItem>
                <SelectItem value="84">84 meses</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleSimulate} 
          disabled={!valorSolicitado || !prazo || isSimulating}
          className="w-full gap-2"
        >
          {isSimulating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <TrendingUp className="h-4 w-4" />
          )}
          Simular
        </Button>

        {simulation && (
          <>
            <Separator />
            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Valor da Parcela</span>
                <Badge variant="secondary" className="text-lg font-bold">
                  {simulation.valorParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Badge>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxa Mensal</span>
                  <span className="font-medium">{simulation.taxaMensal.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxa Anual</span>
                  <span className="font-medium">{simulation.taxaJuros.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CET Anual</span>
                  <span className="font-medium">{simulation.cet.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total a Pagar</span>
                  <span className="font-medium">{simulation.totalPagar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
