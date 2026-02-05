import { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Settings, Percent, TrendingUp, Users, Save, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConfigData {
  taxa_minima: string;
  taxa_maxima: string;
  comissao_vendedor_padrao: string;
  comissao_gerente_padrao: string;
  comissao_loja_padrao: string;
}

const initialConfig: ConfigData = {
  taxa_minima: '1.49',
  taxa_maxima: '2.99',
  comissao_vendedor_padrao: '2.50',
  comissao_gerente_padrao: '0.50',
  comissao_loja_padrao: '1.00',
};

export default function ConfigPropostas() {
  const [config, setConfig] = useState<ConfigData>(initialConfig);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: keyof ConfigData, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
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
    setConfig(initialConfig);
    setHasChanges(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Configurações de Propostas</h1>
            <p className="text-muted-foreground">
              Defina limites de taxas e comissões para as propostas
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

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Taxas de Juros */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Limites de Taxa de Juros
              </CardTitle>
              <CardDescription>
                Configure os limites mínimo e máximo para taxas de juros mensais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxa_minima">Taxa Mínima (a.m.)</Label>
                  <div className="relative">
                    <Input
                      id="taxa_minima"
                      value={config.taxa_minima}
                      onChange={(e) => handleChange('taxa_minima', e.target.value)}
                      className="pr-8"
                      placeholder="0,00"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      %
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Taxa mínima permitida nas propostas
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxa_maxima">Taxa Máxima (a.m.)</Label>
                  <div className="relative">
                    <Input
                      id="taxa_maxima"
                      value={config.taxa_maxima}
                      onChange={(e) => handleChange('taxa_maxima', e.target.value)}
                      className="pr-8"
                      placeholder="0,00"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      %
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Taxa máxima permitida nas propostas
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 text-sm">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Faixa atual: <strong className="text-foreground">{config.taxa_minima}%</strong> a{' '}
                    <strong className="text-foreground">{config.taxa_maxima}%</strong> a.m.
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comissões */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Comissões dos Vendedores
              </CardTitle>
              <CardDescription>
                Configure os percentuais de comissão para a equipe comercial
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="comissao_vendedor">Comissão Vendedor</Label>
                  <div className="relative">
                    <Input
                      id="comissao_vendedor"
                      value={config.comissao_vendedor_padrao}
                      onChange={(e) => handleChange('comissao_vendedor_padrao', e.target.value)}
                      className="pr-8"
                      placeholder="0,00"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      %
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Percentual sobre o valor da operação para o vendedor
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="comissao_gerente">Comissão Gerente</Label>
                  <div className="relative">
                    <Input
                      id="comissao_gerente"
                      value={config.comissao_gerente_padrao}
                      onChange={(e) => handleChange('comissao_gerente_padrao', e.target.value)}
                      className="pr-8"
                      placeholder="0,00"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      %
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Percentual adicional para o gerente da loja
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="comissao_loja">Comissão Loja</Label>
                  <div className="relative">
                    <Input
                      id="comissao_loja"
                      value={config.comissao_loja_padrao}
                      onChange={(e) => handleChange('comissao_loja_padrao', e.target.value)}
                      className="pr-8"
                      placeholder="0,00"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      %
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Percentual destinado à loja
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 text-sm">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Total comissão:{' '}
                    <strong className="text-foreground">
                      {(
                        parseFloat(config.comissao_vendedor_padrao || '0') +
                        parseFloat(config.comissao_gerente_padrao || '0') +
                        parseFloat(config.comissao_loja_padrao || '0')
                      ).toFixed(2)}
                      %
                    </strong>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Informações Adicionais */}
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
                • As configurações de taxa de juros serão aplicadas como limite para novas propostas.
              </p>
              <p>
                • As comissões são calculadas automaticamente sobre o valor contratado de cada operação.
              </p>
              <p>
                • Alterações nas comissões afetam apenas novas operações, não retroativas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
