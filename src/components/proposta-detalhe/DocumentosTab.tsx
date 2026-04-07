import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, Upload, Download, Eye, Image, File, CheckCircle2, Clock, XCircle, Trash2 } from 'lucide-react';
import type { Proposta } from '@/types';

interface DocumentosTabProps {
  proposta: Proposta;
}

const mockDocumentos = [
  { id: '1', nome: 'Contrato Assinado', tipo: 'contrato', status: 'aprovado', dataEnvio: '2024-03-10', tamanho: '1.8 MB' },
  { id: '2', nome: 'Comprovante de Pagamento', tipo: 'pagamento', status: 'aprovado', dataEnvio: '2024-03-12', tamanho: '520 KB' },
  { id: '3', nome: 'RG / CNH', tipo: 'identidade', status: 'aprovado', dataEnvio: '2024-03-10', tamanho: '2.4 MB' },
  { id: '4', nome: 'Comprovante de Renda', tipo: 'renda', status: 'pendente', dataEnvio: null, tamanho: null },
  { id: '5', nome: 'Comprovante de Residência', tipo: 'residencia', status: 'aprovado', dataEnvio: '2024-03-11', tamanho: '1.1 MB' },
  { id: '6', nome: 'Holerite / Contracheque', tipo: 'renda', status: 'em_analise', dataEnvio: '2024-03-12', tamanho: '850 KB' },
  { id: '7', nome: 'Selfie com Documento', tipo: 'selfie', status: 'pendente', dataEnvio: null, tamanho: null },
  { id: '8', nome: 'Extrato Bancário (3 meses)', tipo: 'bancario', status: 'reprovado', dataEnvio: '2024-03-09', tamanho: '3.2 MB' },
];

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ReactNode }> = {
  aprovado: { label: 'Aprovado', variant: 'default', icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  pendente: { label: 'Pendente', variant: 'outline', icon: <Clock className="h-3.5 w-3.5" /> },
  em_analise: { label: 'Em Análise', variant: 'secondary', icon: <Clock className="h-3.5 w-3.5" /> },
  reprovado: { label: 'Reprovado', variant: 'destructive', icon: <XCircle className="h-3.5 w-3.5" /> },
};

const tipoIcon: Record<string, React.ReactNode> = {
  contrato: <FileText className="h-5 w-5 text-primary" />,
  pagamento: <FileText className="h-5 w-5 text-primary" />,
  identidade: <File className="h-5 w-5 text-primary" />,
  renda: <FileText className="h-5 w-5 text-primary" />,
  residencia: <FileText className="h-5 w-5 text-primary" />,
  selfie: <Image className="h-5 w-5 text-primary" />,
  bancario: <FileText className="h-5 w-5 text-primary" />,
};

export function DocumentosTab({ proposta }: DocumentosTabProps) {
  const aprovados = mockDocumentos.filter(d => d.status === 'aprovado').length;
  const pendentes = mockDocumentos.filter(d => d.status === 'pendente').length;
  const total = mockDocumentos.length;

  return (
    <div className="space-y-4 mt-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{aprovados}/{total}</p>
            <p className="text-xs text-muted-foreground mt-1">Aprovados</p>
          </CardContent>
        </Card>
        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">{pendentes}</p>
            <p className="text-xs text-muted-foreground mt-1">Pendentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{total}</p>
            <p className="text-xs text-muted-foreground mt-1">Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Upload Area */}
      <Card className="border-dashed border-2 border-muted-foreground/20">
        <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm font-medium text-foreground">Arraste arquivos ou clique para enviar</p>
          <p className="text-xs text-muted-foreground">PDF, JPG, PNG até 10MB</p>
          <Button variant="outline" size="sm" className="mt-2">
            <Upload className="h-3.5 w-3.5 mr-1.5" /> Selecionar Arquivo
          </Button>
        </CardContent>
      </Card>

      {/* Document List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Documentos da Proposta
          </CardTitle>
          <CardDescription>Lista de documentos necessários e enviados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-0">
          {mockDocumentos.map((doc, i) => {
            const config = statusConfig[doc.status];
            return (
              <div key={doc.id}>
                {i > 0 && <Separator className="my-3" />}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                    {tipoIcon[doc.tipo] || <File className="h-5 w-5 text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{doc.nome}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {doc.dataEnvio && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(doc.dataEnvio).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                      {doc.tamanho && (
                        <span className="text-xs text-muted-foreground">• {doc.tamanho}</span>
                      )}
                    </div>
                  </div>
                  <Badge variant={config.variant} className="gap-1 shrink-0">
                    {config.icon} {config.label}
                  </Badge>
                  <div className="flex items-center gap-1 shrink-0">
                    {doc.dataEnvio && (
                      <>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      </>
                    )}
                    {!doc.dataEnvio && (
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        <Upload className="h-3 w-3 mr-1" /> Enviar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
