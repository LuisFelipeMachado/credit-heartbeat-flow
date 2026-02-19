import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building2, Briefcase, DollarSign, Calendar } from 'lucide-react';
import { DataField } from './DataField';
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

  const margemDisponivel = proposta.salario_base && proposta.margem_consignavel
    ? (proposta.salario_base * proposta.margem_consignavel) / 100
    : null;

  return (
    <div className="space-y-4 pt-4">
      <Card className="rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Building2 className="h-4 w-4 text-accent" />
            </div>
            <div>
              <CardTitle className="text-lg">Dados da Empresa</CardTitle>
              <CardDescription>Informações do vínculo empregatício atual</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            <DataField label="Razão Social" value={proposta.empresa_nome} icon={Building2} />
            <DataField label="CNPJ" value={proposta.empresa_cnpj} />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-accent" />
            </div>
            <CardTitle className="text-lg">Dados do Emprego</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4">
            <div className="space-y-1.5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Tempo de Carteira
              </p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">
                  {formatTempoCarteira(proposta.tempo_carteira_meses)}
                </p>
                {proposta.tempo_carteira_meses && proposta.tempo_carteira_meses >= 24 && (
                  <Badge variant="secondary" className="bg-accent/10 text-accent text-[10px] px-1.5 py-0">
                    Elegível
                  </Badge>
                )}
              </div>
            </div>
            <DataField label="Salário Base" value={formatCurrency(proposta.salario_base)} icon={DollarSign} />
            <DataField label="Margem Consignável" value={proposta.margem_consignavel} suffix="%" />
          </div>

          {margemDisponivel && (
            <>
              <Separator />
              <div className="flex items-center justify-between p-4 bg-accent/5 border border-accent/20 rounded-xl">
                <div className="space-y-0.5">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Margem Disponível</p>
                  <p className="text-xs text-muted-foreground">Valor máximo de parcela</p>
                </div>
                <span className="text-xl font-bold text-accent">
                  {formatCurrency(margemDisponivel)}
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
