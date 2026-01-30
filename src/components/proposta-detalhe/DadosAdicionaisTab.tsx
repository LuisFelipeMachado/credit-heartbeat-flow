import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UserCircle, AlertCircle } from 'lucide-react';
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

  // Note: These fields might not be in the Proposta type yet
  // They're shown as placeholders for when the data is available
  const dadosAdicionais = {
    genero: '-',
    estadoCivil: '-',
    escolaridade: '-',
    profissao: '-',
    renda: '-'
  };

  return (
    <div className="space-y-6 pt-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-accent" />
            <CardTitle>Informações Pessoais</CardTitle>
          </div>
          <CardDescription>
            Dados complementares do cliente
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Gênero</Label>
              <Input value={dadosAdicionais.genero} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Data de Nascimento</Label>
              <Input 
                value={proposta.cliente_data_nasc 
                  ? new Date(proposta.cliente_data_nasc).toLocaleDateString('pt-BR') 
                  : '-'} 
                disabled 
                className="bg-muted" 
              />
            </div>
            <div className="space-y-2">
              <Label>Idade</Label>
              <Input value={age !== null ? `${age} anos` : '-'} disabled className="bg-muted" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Estado Civil</Label>
              <Input value={dadosAdicionais.estadoCivil} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Escolaridade</Label>
              <Input value={dadosAdicionais.escolaridade} disabled className="bg-muted" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Profissão</Label>
              <Input value={dadosAdicionais.profissao} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Renda Mensal</Label>
              <Input value={dadosAdicionais.renda} disabled className="bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>

      {proposta.motivo_reprovacao && (
        <Card className="border-destructive">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-destructive">Motivo da Reprovação</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{proposta.motivo_reprovacao}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
