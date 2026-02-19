import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { ArrowLeft, User, Building2, Calculator, UserCircle, FileText, DollarSign, CalendarDays, Hash } from 'lucide-react';
import { getEnrichedPropostas } from '@/data/mockData';
import { DadosEssenciaisTab } from '@/components/proposta-detalhe/DadosEssenciaisTab';
import { VinculoEmpregaticioTab } from '@/components/proposta-detalhe/VinculoEmpregaticioTab';
import { SimulacaoTab } from '@/components/proposta-detalhe/SimulacaoTab';
import { DadosAdicionaisTab } from '@/components/proposta-detalhe/DadosAdicionaisTab';
import { ContratoTab } from '@/components/proposta-detalhe/ContratoTab';

export default function PropostaDetalhe() {
  const { id } = useParams();
  const propostas = getEnrichedPropostas();
  const proposta = propostas.find(p => p.id === id);

  if (!proposta) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/propostas">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-display font-bold">Proposta não encontrada</h1>
          </div>
        </div>
      </MainLayout>
    );
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const formatDate = (date?: string) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="shrink-0">
            <Link to="/propostas">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-display font-bold truncate">{proposta.cliente_nome}</h1>
              <StatusBadge status={proposta.status} />
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Proposta #{proposta.id?.slice(0, 8)} • Criada em {formatDate(proposta.created_at)}
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-card rounded-xl border p-4 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Valor Solicitado</span>
            </div>
            <p className="text-lg font-bold text-foreground">{formatCurrency(proposta.valor_solicitado)}</p>
          </div>
          <div className="bg-card rounded-xl border p-4 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Prazo</span>
            </div>
            <p className="text-lg font-bold text-foreground">{proposta.prazo_meses}x</p>
          </div>
          <div className="bg-card rounded-xl border p-4 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Hash className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">CPF</span>
            </div>
            <p className="text-lg font-bold text-foreground">{proposta.cliente_cpf}</p>
          </div>
          <div className="bg-card rounded-xl border p-4 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Loja</span>
            </div>
            <p className="text-lg font-bold text-foreground truncate">{proposta.loja?.nome_fantasia || '-'}</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="dados-essenciais" className="w-full">
          <TabsList className="w-full justify-start bg-card border rounded-xl p-1 h-auto flex-wrap gap-1">
            <TabsTrigger value="dados-essenciais" className="gap-2 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground px-4 py-2.5">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Dados Essenciais</span>
            </TabsTrigger>
            <TabsTrigger value="vinculo" className="gap-2 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground px-4 py-2.5">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Vínculo Empregatício</span>
            </TabsTrigger>
            <TabsTrigger value="simulacao" className="gap-2 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground px-4 py-2.5">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Simulação</span>
            </TabsTrigger>
            <TabsTrigger value="dados-adicionais" className="gap-2 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground px-4 py-2.5">
              <UserCircle className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Dados Adicionais</span>
            </TabsTrigger>
            <TabsTrigger value="contrato" className="gap-2 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground px-4 py-2.5">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Contrato</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dados-essenciais">
            <DadosEssenciaisTab proposta={proposta} />
          </TabsContent>
          <TabsContent value="vinculo">
            <VinculoEmpregaticioTab proposta={proposta} />
          </TabsContent>
          <TabsContent value="simulacao">
            <SimulacaoTab proposta={proposta} />
          </TabsContent>
          <TabsContent value="dados-adicionais">
            <DadosAdicionaisTab proposta={proposta} />
          </TabsContent>
          <TabsContent value="contrato">
            <ContratoTab proposta={proposta} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
