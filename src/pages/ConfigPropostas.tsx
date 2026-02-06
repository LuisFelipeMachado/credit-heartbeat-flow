import { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Save, RotateCcw, TableProperties, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CreditTableCard, ComissaoCard } from '@/components/config-propostas';
import type { CreditTable, ComissaoConfig } from '@/types/creditTable';

const initialTables: CreditTable[] = [
  {
    id: '1',
    nome: 'TABELA 01',
    ativa: true,
    idade_min: 21,
    idade_max: 62,
    prazo_min: 2,
    prazo_max: 12,
    taxa: '6.35',
    tempo_clt_meses: 6,
    tempo_empresa_anos: 2,
    negativa_fgts: true,
    faixas_prazo: [],
  },
  {
    id: '2',
    nome: 'TABELA 02',
    ativa: true,
    idade_min: 18,
    idade_max: 65,
    prazo_min: 2,
    prazo_max: 24,
    taxa: '4.99',
    tempo_clt_meses: 12,
    tempo_empresa_anos: 3,
    negativa_fgts: true,
    faixas_prazo: [],
  },
  {
    id: '3',
    nome: 'TABELA 03',
    ativa: true,
    idade_min: 18,
    idade_max: 65,
    prazo_min: 2,
    prazo_max: 24,
    taxa: '4.19',
    tempo_clt_meses: 36,
    tempo_empresa_anos: 3,
    negativa_fgts: true,
    faixas_prazo: [],
  },
];

const initialComissao: ComissaoConfig = {
  comissao_vendedor: '2.50',
  comissao_gerente: '0.50',
  comissao_loja: '1.00',
};

export default function ConfigPropostas() {
  const [tables, setTables] = useState<CreditTable[]>(initialTables);
  const [comissao, setComissao] = useState<ComissaoConfig>(initialComissao);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const handleUpdateTable = (updatedTable: CreditTable) => {
    setTables((prev) => prev.map((t) => (t.id === updatedTable.id ? updatedTable : t)));
    setHasChanges(true);
  };

  const handleDeleteTable = (id: string) => {
    setTables((prev) => prev.filter((t) => t.id !== id));
    setHasChanges(true);
    toast({
      title: 'Tabela removida',
      description: 'A tabela de crédito foi removida com sucesso.',
    });
  };

  const handleAddTable = () => {
    const newTable: CreditTable = {
      id: crypto.randomUUID(),
      nome: `TABELA ${String(tables.length + 1).padStart(2, '0')}`,
      ativa: true,
      idade_min: 18,
      idade_max: 65,
      prazo_min: 2,
      prazo_max: 12,
      taxa: '5.00',
      tempo_clt_meses: 6,
      tempo_empresa_anos: 2,
      negativa_fgts: true,
      faixas_prazo: [],
    };
    setTables((prev) => [...prev, newTable]);
    setHasChanges(true);
  };

  const handleComissaoChange = (newComissao: ComissaoConfig) => {
    setComissao(newComissao);
    setHasChanges(true);
  };

  const handleSave = () => {
    toast({
      title: 'Configurações salvas',
      description: 'As configurações de propostas foram atualizadas com sucesso.',
    });
    setHasChanges(false);
  };

  const handleReset = () => {
    setTables(initialTables);
    setComissao(initialComissao);
    setHasChanges(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Configurações de Propostas</h1>
            <p className="text-muted-foreground">
              Gerencie tabelas de crédito, limites de taxas e comissões
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Restaurar
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>

        <Tabs defaultValue="tabelas" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tabelas" className="gap-2">
              <TableProperties className="h-4 w-4" />
              Tabelas de Crédito
            </TabsTrigger>
            <TabsTrigger value="comissoes" className="gap-2">
              <Settings className="h-4 w-4" />
              Comissões
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tabelas" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {tables.length} tabela{tables.length !== 1 ? 's' : ''} configurada
                {tables.length !== 1 ? 's' : ''}
              </p>
              <Button onClick={handleAddTable}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Tabela
              </Button>
            </div>

            <div className="space-y-4">
              {tables.map((table) => (
                <CreditTableCard
                  key={table.id}
                  table={table}
                  onUpdate={handleUpdateTable}
                  onDelete={handleDeleteTable}
                />
              ))}
            </div>

            {tables.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <TableProperties className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhuma tabela configurada</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Crie sua primeira tabela de crédito para começar
                  </p>
                  <Button onClick={handleAddTable}>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeira Tabela
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="comissoes" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <ComissaoCard config={comissao} onChange={handleComissaoChange} />

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Informações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      • As configurações de taxa de juros são definidas por tabela de crédito.
                    </p>
                    <p>
                      • Cada tabela pode ter faixas de prazo com taxas diferenciadas.
                    </p>
                    <p>
                      • As comissões são calculadas automaticamente sobre o valor contratado.
                    </p>
                    <p>
                      • Alterações nas comissões afetam apenas novas operações, não retroativas.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
