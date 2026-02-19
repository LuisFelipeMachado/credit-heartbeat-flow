import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserCircle, AlertCircle, Calendar, Briefcase, Heart } from 'lucide-react';
import { DataField } from './DataField';
import type { Proposta } from '@/types';

interface DadosAdicionaisTabProps {
  proposta: Proposta;
}

export function DadosAdicionaisTab({ proposta }: DadosAdicionaisTabProps) {
  const calculateAge = (birthDate?: string): number | null => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(proposta.cliente_data_nasc);

  const formatDate = (date?: string) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-4 pt-4">
      <Card className="rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <UserCircle className="h-4 w-4 text-accent" />
            </div>
            <div>
              <CardTitle className="text-lg">Informações Pessoais</CardTitle>
              <CardDescription>Dados complementares do cliente</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4">
            <DataField label="Gênero" value={proposta.cliente_genero || '-'} icon={UserCircle} />
            <DataField label="Data de Nascimento" value={formatDate(proposta.cliente_data_nasc)} icon={Calendar} />
            <DataField label="Idade" value={age !== null ? `${age} anos` : '-'} />
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            <DataField label="Estado Civil" value={proposta.cliente_estado_civil || '-'} icon={Heart} />
            <DataField label="Nome da Mãe" value={proposta.cliente_nome_mae} />
          </div>

          {proposta.observacoes && (
            <>
              <Separator />
              <div className="space-y-1.5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Observações</p>
                <p className="text-sm text-foreground bg-muted/50 p-3 rounded-lg">{proposta.observacoes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {proposta.motivo_reprovacao && (
        <Card className="rounded-xl border-destructive/50">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-destructive" />
              </div>
              <CardTitle className="text-lg text-destructive">Motivo da Reprovação</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground bg-destructive/5 p-3 rounded-lg">{proposta.motivo_reprovacao}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
