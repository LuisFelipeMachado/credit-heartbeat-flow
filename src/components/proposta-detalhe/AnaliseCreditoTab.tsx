import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, TrendingUp, Clock, Activity, BarChart3 } from 'lucide-react';
import type { Proposta } from '@/types';

interface AnaliseCreditoTabProps {
  proposta: Proposta;
}

const mockAnalise = {
  score: 720,
  scoreMax: 1000,
  risco: 'baixo' as const,
  decisao: 'aprovado' as const,
  dataAnalise: '2024-03-12T14:30:00',
  analista: 'Sistema Automático',
  criterios: [
    { nome: 'Score de Crédito', resultado: 'aprovado', detalhe: 'Score 720 — acima do mínimo (600)', peso: 30 },
    { nome: 'Comprometimento de Renda', resultado: 'aprovado', detalhe: 'Parcela representa 22% da renda (máx 35%)', peso: 25 },
    { nome: 'Histórico de Pagamentos', resultado: 'aprovado', detalhe: 'Sem inadimplência nos últimos 12 meses', peso: 20 },
    { nome: 'Tempo de Emprego', resultado: 'atencao', detalhe: '8 meses no emprego atual (mín recomendado: 12)', peso: 15 },
    { nome: 'Restrições em Bureaus', resultado: 'aprovado', detalhe: 'Nenhuma restrição ativa encontrada', peso: 10 },
  ],
  limites: {
    solicitado: 25000,
    aprovado: 22000,
    disponivel: 22000,
  },
};

const riscoConfig: Record<string, { label: string; color: string; bg: string }> = {
  baixo: { label: 'Baixo', color: 'text-primary', bg: 'bg-primary/10' },
  medio: { label: 'Médio', color: 'text-warning', bg: 'bg-warning/10' },
  alto: { label: 'Alto', color: 'text-destructive', bg: 'bg-destructive/10' },
};

const criterioIcon: Record<string, React.ReactNode> = {
  aprovado: <CheckCircle2 className="h-4 w-4 text-primary" />,
  atencao: <AlertTriangle className="h-4 w-4 text-warning" />,
  reprovado: <XCircle className="h-4 w-4 text-destructive" />,
};

export function AnaliseCreditoTab({ proposta }: AnaliseCreditoTabProps) {
  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

  const risco = riscoConfig[mockAnalise.risco];
  const scorePercent = (mockAnalise.score / mockAnalise.scoreMax) * 100;

  return (
    <div className="space-y-4 mt-4">
      {/* Score + Risco + Decisão */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Score */}
        <Card className="border-primary/20">
          <CardContent className="p-5 flex flex-col items-center justify-center">
            <div className="relative h-28 w-28 flex items-center justify-center">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${scorePercent * 2.64} 264`}
                />
              </svg>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{mockAnalise.score}</p>
                <p className="text-[10px] text-muted-foreground">/{mockAnalise.scoreMax}</p>
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground mt-2">Score de Crédito</p>
          </CardContent>
        </Card>

        {/* Risco */}
        <Card>
          <CardContent className="p-5 flex flex-col items-center justify-center gap-3">
            <div className={`h-14 w-14 rounded-full ${risco.bg} flex items-center justify-center`}>
              <ShieldCheck className={`h-7 w-7 ${risco.color}`} />
            </div>
            <div className="text-center">
              <p className={`text-xl font-bold ${risco.color}`}>{risco.label}</p>
              <p className="text-xs text-muted-foreground">Nível de Risco</p>
            </div>
          </CardContent>
        </Card>

        {/* Decisão */}
        <Card className={mockAnalise.decisao === 'aprovado' ? 'border-primary/20 bg-primary/5' : 'border-destructive/20 bg-destructive/5'}>
          <CardContent className="p-5 flex flex-col items-center justify-center gap-3">
            {mockAnalise.decisao === 'aprovado'
              ? <CheckCircle2 className="h-10 w-10 text-primary" />
              : <XCircle className="h-10 w-10 text-destructive" />
            }
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">
                {mockAnalise.decisao === 'aprovado' ? 'Aprovado' : 'Reprovado'}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(mockAnalise.dataAnalise).toLocaleDateString('pt-BR', {
                  day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{mockAnalise.analista}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Limites */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            Limites de Crédito
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Solicitado</p>
              <p className="text-lg font-bold text-foreground">{formatCurrency(mockAnalise.limites.solicitado)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Aprovado</p>
              <p className="text-lg font-bold text-primary">{formatCurrency(mockAnalise.limites.aprovado)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Disponível</p>
              <p className="text-lg font-bold text-foreground">{formatCurrency(mockAnalise.limites.disponivel)}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Utilização</span>
              <span>{((mockAnalise.limites.aprovado / mockAnalise.limites.solicitado) * 100).toFixed(0)}%</span>
            </div>
            <Progress value={(mockAnalise.limites.aprovado / mockAnalise.limites.solicitado) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Critérios */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Critérios de Análise
          </CardTitle>
          <CardDescription>Resultado de cada critério avaliado</CardDescription>
        </CardHeader>
        <CardContent className="space-y-0">
          {mockAnalise.criterios.map((c, i) => (
            <div key={c.nome}>
              {i > 0 && <Separator className="my-3" />}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">{criterioIcon[c.resultado]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{c.nome}</p>
                    <Badge variant="outline" className="text-[10px] h-5">Peso {c.peso}%</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.detalhe}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
