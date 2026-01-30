import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { ArrowLeft, User, Building2, Calculator, UserCircle, FileText } from 'lucide-react';
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

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/propostas">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-display font-bold">{proposta.cliente_nome}</h1>
              <p className="text-muted-foreground">
                CPF: {proposta.cliente_cpf} • {formatCurrency(proposta.valor_solicitado)} em {proposta.prazo_meses}x
              </p>
            </div>
          </div>
          <StatusBadge status={proposta.status} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="dados-essenciais" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dados-essenciais" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Dados Essenciais</span>
            </TabsTrigger>
            <TabsTrigger value="vinculo" className="gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Vínculo Empregatício</span>
            </TabsTrigger>
            <TabsTrigger value="simulacao" className="gap-2">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Simulação</span>
            </TabsTrigger>
            <TabsTrigger value="dados-adicionais" className="gap-2">
              <UserCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Dados Adicionais</span>
            </TabsTrigger>
            <TabsTrigger value="contrato" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Contrato</span>
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
