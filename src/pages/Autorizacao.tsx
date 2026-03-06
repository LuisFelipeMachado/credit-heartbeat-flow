import { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  Clock,
  DollarSign,
  User,
  Building2,
  CalendarDays,
  FileText,
} from 'lucide-react';
import { getEnrichedPropostas } from '@/data/mockData';
import { toast } from 'sonner';
import type { Proposta } from '@/types';

const pendingStatuses = ['APROVADA', 'AGUARDANDO_ASSINATURA', 'EM_ANALISE'] as const;

export default function Autorizacao() {
  const [search, setSearch] = useState('');
  const [authorizedIds, setAuthorizedIds] = useState<Set<string>>(new Set());

  const allPropostas = getEnrichedPropostas();
  const pendentes = allPropostas.filter(
    (p) =>
      pendingStatuses.includes(p.status as any) &&
      !authorizedIds.has(p.id) &&
      (p.cliente_nome.toLowerCase().includes(search.toLowerCase()) ||
        p.cliente_cpf.includes(search))
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('pt-BR');

  const handleAutorizar = (proposta: Proposta) => {
    setAuthorizedIds((prev) => new Set(prev).add(proposta.id));
    toast.success(`Proposta de ${proposta.cliente_nome} autorizada com sucesso!`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold">Autorização</h1>
              <p className="text-sm text-muted-foreground">
                Propostas aguardando autorização
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="h-9 px-4 text-sm font-medium gap-2">
            <Clock className="h-4 w-4" />
            {pendentes.length} pendente{pendentes.length !== 1 ? 's' : ''}
          </Badge>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou CPF..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* List */}
        {pendentes.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <CheckCircle2 className="h-12 w-12 text-success mb-4" />
              <h3 className="text-lg font-semibold">Tudo autorizado!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Não há propostas pendentes de autorização.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {pendentes.map((p) => (
              <Card
                key={p.id}
                className="group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 border-border/60"
              >
                <CardContent className="p-0">
                  <div className="flex items-stretch">
                    {/* Left accent */}
                    <div className="w-1 shrink-0 bg-primary/20 group-hover:bg-primary transition-colors duration-200" />

                    {/* Content */}
                    <div className="flex flex-1 items-center justify-between gap-6 p-5">
                      <div className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-3">
                        {/* Client info */}
                        <div className="min-w-[200px]">
                          <div className="flex items-center gap-2 mb-1">
                            <User className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="font-semibold text-foreground">
                              {p.cliente_nome}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground font-mono">
                            {p.cliente_cpf}
                          </span>
                        </div>

                        {/* Value */}
                        <div className="min-w-[120px]">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wide">
                              Valor
                            </span>
                          </div>
                          <span className="font-semibold text-foreground">
                            {formatCurrency(p.valor_solicitado)}
                          </span>
                        </div>

                        {/* Prazo */}
                        <div className="min-w-[80px]">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wide">
                              Prazo
                            </span>
                          </div>
                          <span className="font-medium text-foreground">
                            {p.prazo_meses} meses
                          </span>
                        </div>

                        {/* Loja */}
                        <div className="min-w-[120px]">
                          <div className="flex items-center gap-2 mb-1">
                            <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wide">
                              Loja
                            </span>
                          </div>
                          <span className="text-sm text-foreground">
                            {p.loja?.nome_fantasia || '—'}
                          </span>
                        </div>

                        {/* Date */}
                        <div className="min-w-[100px]">
                          <div className="flex items-center gap-2 mb-1">
                            <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wide">
                              Data
                            </span>
                          </div>
                          <span className="text-sm text-foreground">
                            {formatDate(p.created_at)}
                          </span>
                        </div>

                        {/* Status */}
                        <div>
                          <StatusBadge status={p.status} />
                        </div>
                      </div>

                      {/* Action button */}
                      <Button
                        onClick={() => handleAutorizar(p)}
                        className="shrink-0 gap-2 shadow-sm hover:shadow-md transition-shadow"
                        size="lg"
                      >
                        <ShieldCheck className="h-4 w-4" />
                        Autorizar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
