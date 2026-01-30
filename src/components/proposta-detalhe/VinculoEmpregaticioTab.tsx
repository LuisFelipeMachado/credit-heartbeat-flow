import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building2, Briefcase, DollarSign, Calendar } from 'lucide-react';
import type { Proposta } from '@/types';

interface VinculoEmpregaticioTabProps {
  proposta: Proposta;
}

export function VinculoEmpregaticioTab({ proposta }: VinculoEmpregaticioTabProps) {
  const formatCurrency = (value?: number) => {
    if (!value) return '-';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatTempoCarteira = (meses?: number) => {
    if (!meses) return '-';
    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;
    if (anos === 0) return `${meses} meses`;
    if (mesesRestantes === 0) return `${anos} ano${anos > 1 ? 's' : ''}`;
    return `${anos} ano${anos > 1 ? 's' : ''} e ${mesesRestantes} mês${mesesRestantes > 1 ? 'es' : ''}`;
  };

  return (
    <div className="space-y-6 pt-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-accent" />
            <CardTitle>Dados da Empresa</CardTitle>
          </div>
          <CardDescription>
            Informações do vínculo empregatício atual
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                Razão Social
              </Label>
              <Input value={proposta.empresa_nome || '-'} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>CNPJ</Label>
              <Input value={proposta.empresa_cnpj || '-'} disabled className="bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-accent" />
            <CardTitle>Dados do Emprego</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Tempo de Carteira
              </Label>
              <div className="flex items-center gap-2">
                <Input 
                  value={formatTempoCarteira(proposta.tempo_carteira_meses)} 
                  disabled 
                  className="bg-muted" 
                />
                {proposta.tempo_carteira_meses && proposta.tempo_carteira_meses >= 24 && (
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    Elegível
                  </Badge>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                Salário Base
              </Label>
              <Input value={formatCurrency(proposta.salario_base)} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Margem Consignável</Label>
              <Input 
                value={proposta.margem_consignavel ? `${proposta.margem_consignavel}%` : '-'} 
                disabled 
                className="bg-muted" 
              />
            </div>
          </div>

          {proposta.salario_base && proposta.margem_consignavel && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Margem Disponível</span>
                <span className="text-lg font-semibold text-accent">
                  {formatCurrency((proposta.salario_base * proposta.margem_consignavel) / 100)}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
