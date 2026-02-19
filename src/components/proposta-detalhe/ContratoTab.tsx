import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, CheckCircle2, Clock, XCircle, Calendar } from 'lucide-react';
import type { Proposta } from '@/types';

interface ContratoTabProps {
  proposta: Proposta;
}

export function ContratoTab({ proposta }: ContratoTabProps) {
  const formatDate = (date?: string) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APROVADA': return <CheckCircle2 className="h-5 w-5 text-accent" />;
      case 'REPROVADA': return <XCircle className="h-5 w-5 text-destructive" />;
      default: return <Clock className="h-5 w-5 text-warning" />;
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

  const timelineEvents = [
    { label: 'Criada em', date: proposta.created_at, icon: Calendar },
    ...(proposta.submitted_at ? [{ label: 'Enviada em', date: proposta.submitted_at, icon: Clock }] : []),
    ...(proposta.decided_at ? [{ label: 'Decidida em', date: proposta.decided_at, icon: CheckCircle2 }] : []),
  ];

  return (
    <div className="space-y-4 pt-4">
      <Card className="rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <FileText className="h-4 w-4 text-accent" />
            </div>
            <div>
              <CardTitle className="text-lg">Status do Contrato</CardTitle>
              <CardDescription>Situação atual da proposta e contrato</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
            {getStatusIcon(proposta.status)}
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Status Atual</p>
              <Badge variant={statusInfo.variant} className="mt-1">{statusInfo.label}</Badge>
            </div>
          </div>

          <Separator />

          {/* Timeline */}
          <div className="space-y-0">
            {timelineEvents.map((event, index) => (
              <div key={event.label} className="flex items-start gap-3 relative">
                {index < timelineEvents.length - 1 && (
                  <div className="absolute left-[11px] top-7 w-0.5 h-full bg-border" />
                )}
                <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5 z-10">
                  <event.icon className="h-3 w-3 text-accent" />
                </div>
                <div className="pb-4">
                  <p className="text-xs font-medium text-muted-foreground">{event.label}</p>
                  <p className="text-sm font-medium">{formatDate(event.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Download className="h-4 w-4 text-accent" />
            </div>
            <div>
              <CardTitle className="text-lg">Documentos</CardTitle>
              <CardDescription>Documentos disponíveis para download</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {contratoDisponivel ? (
            <>
              {[
                { title: 'Contrato de Empréstimo', desc: 'PDF • Assinado digitalmente', active: true },
                { title: 'Termo de Adesão', desc: 'PDF • Anexo do contrato', active: false },
              ].map((doc) => (
                <div key={doc.title} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <FileText className={`h-5 w-5 ${doc.active ? 'text-accent' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">{doc.desc}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 rounded-lg">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </Button>
                </div>
              ))}
            </>
          ) : (
            <div className="p-8 text-center">
              <div className="h-12 w-12 rounded-xl bg-muted/50 flex items-center justify-center mx-auto mb-3">
                <FileText className="h-6 w-6 text-muted-foreground/50" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Nenhum documento disponível</p>
              <p className="text-xs text-muted-foreground mt-1">Os documentos estarão disponíveis após a aprovação.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
