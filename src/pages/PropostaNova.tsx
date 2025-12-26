import { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EmploymentBondDialog } from '@/components/proposals/EmploymentBondDialog';
import { 
  User, 
  CreditCard, 
  FileText, 
  Save, 
  Send,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PropostaNova() {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [valorSolicitado, setValorSolicitado] = useState('');
  const [prazo, setPrazo] = useState('');
  const [loja, setLoja] = useState('');

  const formatCpf = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const amount = parseInt(numbers || '0') / 100;
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/propostas">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-display font-bold">Nova Proposta</h1>
              <p className="text-muted-foreground">Preencha os dados para criar uma nova proposta de crédito</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Salvar Rascunho
            </Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Enviar Proposta
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dados do Cliente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-accent" />
                  Dados do Cliente
                </CardTitle>
                <CardDescription>
                  Informações pessoais do solicitante
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      value={cpf}
                      onChange={(e) => setCpf(formatCpf(e.target.value))}
                      maxLength={14}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      placeholder="Nome do cliente"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      placeholder="(00) 00000-0000"
                      value={telefone}
                      onChange={(e) => setTelefone(formatPhone(e.target.value))}
                      maxLength={15}
                    />
                  </div>
                </div>

                <Separator />

                {/* Employment Bond Button */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Consulta de Vínculo</p>
                    <p className="text-sm text-muted-foreground">
                      Verifique o histórico empregatício e referências
                    </p>
                  </div>
                  <EmploymentBondDialog cpf={cpf} />
                </div>
              </CardContent>
            </Card>

            {/* Dados da Proposta */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-accent" />
                  Dados da Proposta
                </CardTitle>
                <CardDescription>
                  Condições do crédito solicitado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor Solicitado</Label>
                    <Input
                      id="valor"
                      placeholder="R$ 0,00"
                      value={valorSolicitado}
                      onChange={(e) => setValorSolicitado(formatCurrency(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prazo">Prazo (meses)</Label>
                    <Select value={prazo} onValueChange={setPrazo}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o prazo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 meses</SelectItem>
                        <SelectItem value="12">12 meses</SelectItem>
                        <SelectItem value="18">18 meses</SelectItem>
                        <SelectItem value="24">24 meses</SelectItem>
                        <SelectItem value="36">36 meses</SelectItem>
                        <SelectItem value="48">48 meses</SelectItem>
                        <SelectItem value="60">60 meses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loja">Loja</Label>
                  <Select value={loja} onValueChange={setLoja}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a loja" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="loja-1">Loja Centro - São Paulo</SelectItem>
                      <SelectItem value="loja-2">Loja Paulista - São Paulo</SelectItem>
                      <SelectItem value="loja-3">Loja Barra - Rio de Janeiro</SelectItem>
                      <SelectItem value="loja-4">Loja Savassi - Belo Horizonte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  Resumo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cliente</span>
                    <span className="font-medium">{nome || '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">CPF</span>
                    <span className="font-medium">{cpf || '-'}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Valor</span>
                    <span className="font-medium">{valorSolicitado || '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Prazo</span>
                    <span className="font-medium">{prazo ? `${prazo} meses` : '-'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  💡 <strong>Dica:</strong> Utilize a consulta de vínculo empregatício para verificar o histórico de trabalho do cliente antes de enviar a proposta.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
