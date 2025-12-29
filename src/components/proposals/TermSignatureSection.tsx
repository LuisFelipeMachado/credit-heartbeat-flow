import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileSignature, 
  MessageCircle, 
  CheckCircle, 
  Copy, 
  Loader2,
  Clock,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

interface TermSignatureSectionProps {
  telefone: string;
  clienteNome: string;
}

export function TermSignatureSection({ telefone, clienteNome }: TermSignatureSectionProps) {
  const [termStatus, setTermStatus] = useState<'pending' | 'sent' | 'signed'>('pending');
  const [isChecking, setIsChecking] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const termLink = `https://app.exemplo.com/termo/${Date.now()}`;

  const handleSendWhatsApp = () => {
    if (!telefone) {
      toast.error('Preencha o telefone do cliente primeiro');
      return;
    }

    setIsSending(true);
    
    // Simula envio
    setTimeout(() => {
      const phoneNumber = telefone.replace(/\D/g, '');
      const message = encodeURIComponent(
        `Olá ${clienteNome || 'Cliente'}! Para dar continuidade à sua proposta de crédito, por favor assine o termo de autorização no link: ${termLink}`
      );
      
      window.open(`https://wa.me/55${phoneNumber}?text=${message}`, '_blank');
      setTermStatus('sent');
      setIsSending(false);
      toast.success('WhatsApp aberto com sucesso!');
    }, 500);
  };

  const handleCheckSignature = () => {
    setIsChecking(true);
    
    // Simula verificação
    setTimeout(() => {
      // Simula 50% de chance de estar assinado
      const isSigned = Math.random() > 0.5;
      
      if (isSigned) {
        setTermStatus('signed');
        toast.success('Termo assinado com sucesso!');
      } else {
        toast.info('Termo ainda não foi assinado');
      }
      setIsChecking(false);
    }, 1500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(termLink);
    toast.success('Link copiado para a área de transferência!');
  };

  const getStatusBadge = () => {
    switch (termStatus) {
      case 'signed':
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            <Check className="h-3 w-3 mr-1" />
            Assinado
          </Badge>
        );
      case 'sent':
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Aguardando Assinatura
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        );
    }
  };

  return (
    <Card className={termStatus === 'signed' ? 'border-green-500/30' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSignature className="h-5 w-5 text-accent" />
            <CardTitle>1. Termo de Autorização</CardTitle>
          </div>
          {getStatusBadge()}
        </div>
        <CardDescription>
          Envie o termo para assinatura antes de consultar o vínculo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={handleSendWhatsApp}
            disabled={isSending || termStatus === 'signed'}
            className="gap-2"
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MessageCircle className="h-4 w-4" />
            )}
            Enviar via WhatsApp
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleCheckSignature}
            disabled={isChecking || termStatus === 'signed'}
            className="gap-2"
          >
            {isChecking ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            Verificar Assinatura
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={handleCopyLink}
            className="gap-2"
          >
            <Copy className="h-4 w-4" />
            Copiar Link
          </Button>
        </div>

        {termStatus === 'signed' && (
          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Termo assinado em {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
