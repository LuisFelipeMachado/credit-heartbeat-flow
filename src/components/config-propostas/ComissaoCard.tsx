import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Users, Settings } from 'lucide-react';
import type { ComissaoConfig } from '@/types/creditTable';

interface ComissaoCardProps {
  config: ComissaoConfig;
  onChange: (config: ComissaoConfig) => void;
}

export function ComissaoCard({ config, onChange }: ComissaoCardProps) {
  const handleChange = (field: keyof ComissaoConfig, value: string) => {
    onChange({ ...config, [field]: value });
  };

  const totalComissao = (
    parseFloat(config.comissao_vendedor || '0') +
    parseFloat(config.comissao_gerente || '0') +
    parseFloat(config.comissao_loja || '0')
  ).toFixed(2);

  return (
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
                value={config.comissao_vendedor}
                onChange={(e) => handleChange('comissao_vendedor', e.target.value)}
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
                value={config.comissao_gerente}
                onChange={(e) => handleChange('comissao_gerente', e.target.value)}
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
                value={config.comissao_loja}
                onChange={(e) => handleChange('comissao_loja', e.target.value)}
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
              Total comissão: <strong className="text-foreground">{totalComissao}%</strong>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
