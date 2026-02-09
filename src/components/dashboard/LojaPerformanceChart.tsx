import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Building2 } from 'lucide-react';

const lojaPerformance = [
  { loja: 'Centro', propostas: 68, aprovacao: 78 },
  { loja: 'Pinheiros', propostas: 52, aprovacao: 72 },
  { loja: 'Campinas', propostas: 36, aprovacao: 69 },
];

export function LojaPerformanceChart() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <Building2 className="h-4 w-4 text-accent" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Performance por Loja</CardTitle>
            <p className="text-xs text-muted-foreground">Taxa de aprovação</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {lojaPerformance.map((loja) => (
          <div key={loja.loja} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{loja.loja}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{loja.propostas} propostas</span>
                <span className="text-sm font-bold text-accent">{loja.aprovacao}%</span>
              </div>
            </div>
            <Progress value={loja.aprovacao} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
