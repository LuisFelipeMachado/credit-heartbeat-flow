import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Phone, Mail, Calendar, MapPin, Store, UserCheck } from 'lucide-react';
import { DataField } from './DataField';
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
    <div className="space-y-4 pt-4">
      <Card className="rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <User className="h-4 w-4 text-accent" />
            </div>
            <CardTitle className="text-lg">Dados do Cliente</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            <DataField label="Nome Completo" value={proposta.cliente_nome} icon={User} />
            <DataField label="CPF" value={proposta.cliente_cpf} />
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4">
            <DataField label="Telefone" value={proposta.cliente_telefone} icon={Phone} />
            <DataField label="E-mail" value={proposta.cliente_email} icon={Mail} />
            <DataField label="Data de Nascimento" value={formatDate(proposta.cliente_data_nasc)} icon={Calendar} />
          </div>

          {(proposta.cliente_endereco || proposta.cliente_cidade) && (
            <>
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
                <DataField label="Endereço" value={proposta.cliente_endereco} icon={MapPin} className="sm:col-span-2" />
                <DataField label="Cidade" value={proposta.cliente_cidade} />
                <DataField label="UF" value={proposta.cliente_estado} />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Store className="h-4 w-4 text-accent" />
            </div>
            <CardTitle className="text-lg">Informações da Proposta</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4">
            <DataField label="Loja" value={proposta.loja?.nome_fantasia} icon={Store} />
            <DataField label="Operador" value={proposta.usuario?.nome} icon={UserCheck} />
            <DataField label="Criada em" value={formatDate(proposta.created_at)} icon={Calendar} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
