import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/ui/status-badge';
import { StatCard } from '@/components/ui/stat-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getEnrichedPropostas } from '@/data/mockData';
import { 
  Search, 
  FileSearch, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Building2,
  User,
  Calendar,
  DollarSign,
  Briefcase,
  Eye
} from 'lucide-react';
import type { Proposta } from '@/types';

export default function AnaliseCredito() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('pendentes');
  
  const allPropostas = getEnrichedPropostas();
  
  // Filtrar propostas por status para análise
  const propostasPendentes = allPropostas.filter(p => 
    p.status === 'ENVIADA' || p.status === 'EM_ANALISE' || p.status === 'PENDENTE_DOC'
  );
  const propostasAnalisadas = allPropostas.filter(p => 
    p.status === 'APROVADA' || p.status === 'REPROVADA'
  );
  
  // Estatísticas
  const stats = {
    pendentes: propostasPendentes.length,
    emAnalise: allPropostas.filter(p => p.status === 'EM_ANALISE').length,
    aguardandoDoc: allPropostas.filter(p => p.status === 'PENDENTE_DOC').length,
    analisadasHoje: 3 // Mock
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('pt-BR');

  const getStatusPrioridade = (proposta: Proposta): { label: string; variant: 'default' | 'destructive' | 'outline' | 'secondary' } => {
    const diasDesdeEnvio = Math.floor(
      (new Date().getTime() - new Date(proposta.submitted_at || proposta.created_at).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (diasDesdeEnvio > 5) return { label: 'Urgente', variant: 'destructive' };
    if (diasDesdeEnvio > 3) return { label: 'Alta', variant: 'destructive' };
    if (diasDesdeEnvio > 1) return { label: 'Normal', variant: 'secondary' };
    return { label: 'Nova', variant: 'default' };
  };

  const filteredPendentes = propostasPendentes.filter(p =>
    p.cliente_nome.toLowerCase().includes(search.toLowerCase()) ||
    p.cliente_cpf.includes(search) ||
    p.empresa_nome?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAnalisadas = propostasAnalisadas.filter(p =>
    p.cliente_nome.toLowerCase().includes(search.toLowerCase()) ||
    p.cliente_cpf.includes(search) ||
    p.empresa_nome?.toLowerCase().includes(search.toLowerCase())
  );

  const PropostaCard = ({ proposta }: { proposta: Proposta }) => {
    const prioridade = getStatusPrioridade(proposta);
    
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge variant={prioridade.variant} className="text-xs">
                {prioridade.label}
              </Badge>
              <StatusBadge status={proposta.status} />
            </div>
            <span className="text-xs text-muted-foreground">
              #{proposta.id}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{proposta.cliente_nome}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{proposta.cliente_cpf}</span>
            </div>
            
            {proposta.empresa_nome && (
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{proposta.empresa_nome}</span>
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-2 pt-2 border-t">
              <div className="text-center">
                <DollarSign className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">Valor</p>
                <p className="text-sm font-medium">{formatCurrency(proposta.valor_solicitado)}</p>
              </div>
              <div className="text-center">
                <Calendar className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">Prazo</p>
                <p className="text-sm font-medium">{proposta.prazo_meses}m</p>
              </div>
              <div className="text-center">
                <Briefcase className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">Carteira</p>
                <p className="text-sm font-medium">{proposta.tempo_carteira_meses || '-'}m</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link to={`/propostas/${proposta.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                Detalhes
              </Link>
            </Button>
            <Button size="sm" className="flex-1" asChild>
              <Link to={`/propostas/${proposta.id}?tab=analise`}>
                <FileSearch className="h-4 w-4 mr-1" />
                Analisar
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Análise de Crédito</h1>
            <p className="text-muted-foreground mt-1">Gerencie as propostas pendentes de análise</p>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Pendentes" 
            value={stats.pendentes} 
            icon={Clock} 
            variant="warning" 
          />
          <StatCard 
            title="Em Análise" 
            value={stats.emAnalise} 
            icon={FileSearch} 
            variant="primary" 
          />
          <StatCard 
            title="Aguardando Doc" 
            value={stats.aguardandoDoc} 
            icon={AlertCircle} 
            variant="destructive" 
          />
          <StatCard 
            title="Analisadas Hoje" 
            value={stats.analisadasHoje} 
            icon={CheckCircle} 
            variant="success" 
          />
        </div>

        {/* Busca */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar por nome, CPF ou empresa..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="pl-10" 
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="pendentes" className="gap-2">
              <Clock className="h-4 w-4" />
              Pendentes ({propostasPendentes.length})
            </TabsTrigger>
            <TabsTrigger value="analisadas" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Analisadas ({propostasAnalisadas.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pendentes" className="mt-6">
            {filteredPendentes.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle className="h-12 w-12 text-success mb-4" />
                  <h3 className="text-lg font-medium">Nenhuma proposta pendente</h3>
                  <p className="text-muted-foreground">Todas as propostas foram analisadas!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPendentes.map((proposta) => (
                  <PropostaCard key={proposta.id} proposta={proposta} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analisadas" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Propostas Analisadas</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>CPF</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Decisão</TableHead>
                      <TableHead>Data Análise</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAnalisadas.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.cliente_nome}</TableCell>
                        <TableCell>{p.cliente_cpf}</TableCell>
                        <TableCell>{p.empresa_nome || '-'}</TableCell>
                        <TableCell>{formatCurrency(p.valor_solicitado)}</TableCell>
                        <TableCell>
                          {p.status === 'APROVADA' ? (
                            <Badge variant="default" className="bg-success text-success-foreground">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Aprovada
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              <XCircle className="h-3 w-3 mr-1" />
                              Reprovada
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{p.decided_at ? formatDate(p.decided_at) : '-'}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/propostas/${p.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
