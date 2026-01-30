import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, CheckCircle2, Clock, XCircle } from 'lucide-react';
import type { Proposta } from '@/types';

interface ContratoTabProps {
  proposta: Proposta;
}

export function ContratoTab({ proposta }: ContratoTabProps) {
  const formatDate = (date?: string) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APROVADA':
        return <CheckCircle2 className="h-5 w-5 text-accent" />;
      case 'REPROVADA':
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <Clock className="h-5 w-5 text-warning" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      'RASCUNHO': { label: 'Rascunho', variant: 'secondary' },
      'ENVIADA': { label: 'Enviada', variant: 'outline' },
      'EM_ANALISE': { label: 'Em Análise', variant: 'default' },
      'PENDENTE_DOC': { label: 'Pendente Documentação', variant: 'outline' },
      'APROVADA': { label: 'Aprovada', variant: 'default' },
      'REPROVADA': { label: 'Reprovada', variant: 'destructive' },
      'CANCELADA': { label: 'Cancelada', variant: 'secondary' },
      'LIQUIDADA': { label: 'Liquidada', variant: 'default' },
    };
    return statusMap[status] || { label: status, variant: 'secondary' as const };
  };

  const statusInfo = getStatusLabel(proposta.status);
  const contratoDisponivel = proposta.status === 'APROVADA' || proposta.status === 'LIQUIDADA';

  return (
    <div className="space-y-6 pt-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            <CardTitle>Status do Contrato</CardTitle>
          </div>
          <CardDescription>
            Situação atual da proposta e contrato
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            {getStatusIcon(proposta.status)}
            <div className="flex-1">
              <p className="font-medium">Status Atual</p>
              <Badge variant={statusInfo.variant} className="mt-1">
                {statusInfo.label}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Criada em</p>
              <p className="font-medium">{formatDate(proposta.created_at)}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Última Atualização</p>
              <p className="font-medium">{formatDate(proposta.updated_at)}</p>
            </div>
            {proposta.submitted_at && (
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Enviada em</p>
                <p className="font-medium">{formatDate(proposta.submitted_at)}</p>
              </div>
            )}
            {proposta.decided_at && (
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Decidida em</p>
                <p className="font-medium">{formatDate(proposta.decided_at)}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Download className="h-5 w-5 text-accent" />
            <CardTitle>Documentos</CardTitle>
          </div>
          <CardDescription>
            Documentos disponíveis para download
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {contratoDisponivel ? (
            <>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-accent" />
                  <div>
                    <p className="font-medium">Contrato de Empréstimo</p>
                    <p className="text-sm text-muted-foreground">PDF • Assinado digitalmente</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Termo de Adesão</p>
                    <p className="text-sm text-muted-foreground">PDF • Anexo do contrato</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">Nenhum documento disponível</p>
              <p className="text-sm">Os documentos estarão disponíveis após a aprovação da proposta.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
