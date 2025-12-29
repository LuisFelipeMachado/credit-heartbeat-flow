import { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  TermSignatureSection,
  EmploymentBondDialog,
  DebtSimulationSection,
  AdditionalInfoSection,
  AgreementAddressSection
} from '@/components/proposals';
import { 
  User, 
  FileText, 
  Save, 
  Send,
  ArrowLeft,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function PropostaNova() {
  // Dados do Cliente
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  // Simulação
  const [valorSolicitado, setValorSolicitado] = useState('');
  const [prazo, setPrazo] = useState('');

  // Informações Adicionais
  const [genero, setGenero] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [profissao, setProfissao] = useState('');
  const [renda, setRenda] = useState('');

  // Convênio e Endereço
  const [convenio, setConvenio] = useState('');
  const [loja, setLoja] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const formatCpf = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleEmitirDivida = () => {
    toast.success('Proposta enviada com sucesso!', {
      description: 'A dívida foi emitida e a proposta foi finalizada.'
    });
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
              </CardContent>
            </Card>

            {/* 1. Termo de Assinatura */}
            <TermSignatureSection telefone={telefone} clienteNome={nome} />

            {/* 2. Consulta de Vínculo */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-accent" />
                  <CardTitle>2. Consulta de Vínculo Empregatício</CardTitle>
                </div>
                <CardDescription>
                  Verifique o histórico empregatício e referências do cliente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmploymentBondDialog cpf={cpf} />
              </CardContent>
            </Card>

            {/* 3. Simulação de Dívida */}
            <DebtSimulationSection 
              valorSolicitado={valorSolicitado}
              setValorSolicitado={setValorSolicitado}
              prazo={prazo}
              setPrazo={setPrazo}
            />

            {/* 4. Informações Adicionais */}
            <AdditionalInfoSection 
              genero={genero}
              setGenero={setGenero}
              dataNascimento={dataNascimento}
              setDataNascimento={setDataNascimento}
              estadoCivil={estadoCivil}
              setEstadoCivil={setEstadoCivil}
              escolaridade={escolaridade}
              setEscolaridade={setEscolaridade}
              profissao={profissao}
              setProfissao={setProfissao}
              renda={renda}
              setRenda={setRenda}
            />

            {/* 5. Convênio e Endereço */}
            <AgreementAddressSection 
              convenio={convenio}
              setConvenio={setConvenio}
              loja={loja}
              setLoja={setLoja}
              cep={cep}
              setCep={setCep}
              endereco={endereco}
              setEndereco={setEndereco}
              numero={numero}
              setNumero={setNumero}
              complemento={complemento}
              setComplemento={setComplemento}
              bairro={bairro}
              setBairro={setBairro}
              cidade={cidade}
              setCidade={setCidade}
              estado={estado}
              setEstado={setEstado}
              onEmitirDivida={handleEmitirDivida}
            />
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  Resumo da Proposta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Cliente</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Nome</span>
                    <span className="font-medium">{nome || '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">CPF</span>
                    <span className="font-medium">{cpf || '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Telefone</span>
                    <span className="font-medium">{telefone || '-'}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Proposta</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Valor</span>
                    <span className="font-medium">{valorSolicitado || '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Prazo</span>
                    <span className="font-medium">{prazo ? `${prazo} meses` : '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Convênio</span>
                    <span className="font-medium">{convenio || '-'}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Endereço</p>
                  <p className="text-sm">
                    {endereco ? (
                      <>
                        {endereco}, {numero}
                        {complemento && ` - ${complemento}`}
                        <br />
                        {bairro} - {cidade}/{estado}
                        <br />
                        CEP: {cep}
                      </>
                    ) : (
                      '-'
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Fluxo:</strong> Envie o termo → Consulte vínculo → Simule → Preencha dados → Emita
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
