import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { User, Phone, Mail, Calendar } from 'lucide-react';
import type { Proposta } from '@/types';

interface DadosEssenciaisTabProps {
  proposta: Proposta;
}

export function DadosEssenciaisTab({ proposta }: DadosEssenciaisTabProps) {
  const formatDate = (date?: string) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6 pt-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-accent" />
            <CardTitle>Dados do Cliente</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Nome Completo
              </Label>
              <Input value={proposta.cliente_nome} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>CPF</Label>
              <Input value={proposta.cliente_cpf} disabled className="bg-muted" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                Telefone
              </Label>
              <Input value={proposta.cliente_telefone || '-'} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                E-mail
              </Label>
              <Input value={proposta.cliente_email || '-'} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Data de Nascimento
              </Label>
              <Input value={formatDate(proposta.cliente_data_nasc)} disabled className="bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações da Proposta</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Loja</Label>
              <Input value={proposta.loja?.nome_fantasia || '-'} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Operador</Label>
              <Input value={proposta.usuario?.nome || '-'} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Criada em</Label>
              <Input value={formatDate(proposta.created_at)} disabled className="bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
