import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getEnrichedPropostas } from '@/data/mockData';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export function RecentProposals() {
  const recentPropostas = getEnrichedPropostas().slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-semibold">Propostas Recentes</CardTitle>
        <Button variant="ghost" size="sm" asChild className="text-accent hover:text-accent">
          <Link to="/propostas" className="gap-1 text-xs">
            Ver todas <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentPropostas.slice(0, 4).map((proposta) => (
            <Link
              key={proposta.id}
              to={`/propostas/${proposta.id}`}
              className="flex items-center justify-between p-3 rounded-xl border border-border/50 hover:bg-muted/50 hover:border-border transition-all group"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate group-hover:text-accent transition-colors">
                  {proposta.cliente_nome}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatCurrency(proposta.valor_solicitado)} · {proposta.prazo_meses ? `${proposta.prazo_meses}x` : '—'}
                </p>
              </div>
              <StatusBadge status={proposta.status} />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
