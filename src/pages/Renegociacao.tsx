import { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import {
  RefreshCw,
  Calculator,
  Calendar,
  DollarSign,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Hash,
  Percent,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock installments data
const mockInstallments = [
  { key: 'ca5741c7-99a2-42e7-92a1-9328a36e4e88', number: 1, dueDate: '2024-01-15', amount: 1250.00, status: 'overdue', principal: 980.00, interest: 270.00 },
  { key: '0ff87136-b084-44fb-8fc2-d2e3beed483b', number: 2, dueDate: '2024-02-15', amount: 1250.00, status: 'overdue', principal: 995.00, interest: 255.00 },
  { key: 'e4101c6a-51b3-435f-a2b7-4a65a005cc15', number: 3, dueDate: '2024-03-15', amount: 1250.00, status: 'overdue', principal: 1010.00, interest: 240.00 },
  { key: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', number: 4, dueDate: '2024-04-15', amount: 1250.00, status: 'open', principal: 1025.00, interest: 225.00 },
  { key: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', number: 5, dueDate: '2024-05-15', amount: 1250.00, status: 'open', principal: 1040.00, interest: 210.00 },
  { key: 'c3d4e5f6-a7b8-9012-cdef-123456789012', number: 6, dueDate: '2024-06-15', amount: 1250.00, status: 'open', principal: 1055.00, interest: 195.00 },
  { key: 'd4e5f6a7-b8c9-0123-defa-234567890123', number: 7, dueDate: '2024-07-15', amount: 1250.00, status: 'open', principal: 1070.00, interest: 180.00 },
  { key: 'e5f6a7b8-c9d0-1234-efab-345678901234', number: 8, dueDate: '2024-08-15', amount: 1250.00, status: 'open', principal: 1085.00, interest: 165.00 },
];

const mockDebt = {
  key: '1baea8a0-0fca-4f7c-8857-a227d4da72f8',
  clientName: 'Carlos Eduardo Silva',
  cpf: '123.456.789-00',
  contractNumber: 'CTR-2023-00847',
  originalValue: 50000.00,
  outstandingBalance: 38750.00,
  monthlyRate: 1.89,
  totalInstallments: 48,
  paidInstallments: 12,
};

type SimulationResult = {
  presentValue: number;
  discountApplied: number;
  finalAmount: number;
  selectedInstallments: number;
  savingsPercentage: number;
};

export default function Renegociacao() {
  const [amortizationType, setAmortizationType] = useState('installment_payment');
  const [referenceDate, setReferenceDate] = useState('2024-07-20');
  const [proposalDueDate, setProposalDueDate] = useState('2024-08-05');
  const [discountType, setDiscountType] = useState<'amount' | 'percentage'>('amount');
  const [discountAmount, setDiscountAmount] = useState('100');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [numberOfInstallments, setNumberOfInstallments] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [simulating, setSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  const toggleInstallment = (key: string) => {
    setSelectedKeys(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
    setSimulationResult(null);
  };

  const selectAllOverdue = () => {
    const overdueKeys = mockInstallments.filter(i => i.status === 'overdue').map(i => i.key);
    setSelectedKeys(overdueKeys);
    setSimulationResult(null);
  };

  const handleSimulate = () => {
    if (amortizationType === 'installment_payment' && selectedKeys.length === 0) {
      toast.error('Selecione ao menos uma parcela para simular.');
      return;
    }

    setSimulating(true);
    setTimeout(() => {
      const selectedTotal = mockInstallments
        .filter(i => selectedKeys.includes(i.key))
        .reduce((sum, i) => sum + i.amount, 0);

      const discount = discountType === 'amount'
        ? parseFloat(discountAmount) || 0
        : (selectedTotal * (parseFloat(discountPercentage) || 0)) / 100;

      setSimulationResult({
        presentValue: selectedTotal,
        discountApplied: discount,
        finalAmount: selectedTotal - discount,
        selectedInstallments: selectedKeys.length,
        savingsPercentage: selectedTotal > 0 ? (discount / selectedTotal) * 100 : 0,
      });
      setSimulating(false);
      toast.success('Simulação realizada com sucesso!');
    }, 1500);
  };

  const formatCurrency = (val: number) =>
    val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const needsInstallmentSelection = amortizationType === 'installment_payment' || amortizationType === 'overdue_installment_payment';

  return (
    <MainLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              Simulação de Renegociação
            </h1>
            <p className="text-muted-foreground mt-1">
              Simule condições de renegociação para operações de crédito
            </p>
          </div>
          <Badge variant="outline" className="text-xs px-3 py-1.5 border-primary/30 text-primary">
            POST /renegotiation/simulation
          </Badge>
        </div>

        {/* Debt Info Card */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Operação de Crédito
            </CardTitle>
            <CardDescription>debt_key: {mockDebt.key}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Cliente', value: mockDebt.clientName },
                { label: 'CPF', value: mockDebt.cpf },
                { label: 'Contrato', value: mockDebt.contractNumber },
                { label: 'Valor Original', value: formatCurrency(mockDebt.originalValue) },
                { label: 'Saldo Devedor', value: formatCurrency(mockDebt.outstandingBalance), highlight: true },
                { label: 'Taxa Mensal', value: `${mockDebt.monthlyRate}%` },
                { label: 'Parcelas Totais', value: mockDebt.totalInstallments.toString() },
                { label: 'Parcelas Pagas', value: mockDebt.paidInstallments.toString() },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</span>
                  <p className={cn('text-sm font-semibold', item.highlight && 'text-destructive')}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Parameters */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-primary" />
                  Parâmetros da Simulação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Tipo de Amortização</Label>
                  <Select value={amortizationType} onValueChange={(v) => { setAmortizationType(v); setSimulationResult(null); }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="installment_payment">Pagamento de Parcelas</SelectItem>
                      <SelectItem value="overdue_installment_payment">Parcelas em Atraso</SelectItem>
                      <SelectItem value="first_installments">Primeiras Parcelas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Data Referência
                    </Label>
                    <Input type="date" value={referenceDate} onChange={e => setReferenceDate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Vencimento Proposta
                    </Label>
                    <Input type="date" value={proposalDueDate} onChange={e => setProposalDueDate(e.target.value)} />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Tipo de Desconto</Label>
                  <Tabs value={discountType} onValueChange={(v) => { setDiscountType(v as 'amount' | 'percentage'); setSimulationResult(null); }}>
                    <TabsList className="w-full">
                      <TabsTrigger value="amount" className="flex-1 text-xs">
                        <DollarSign className="h-3 w-3 mr-1" /> Valor (R$)
                      </TabsTrigger>
                      <TabsTrigger value="percentage" className="flex-1 text-xs">
                        <Percent className="h-3 w-3 mr-1" /> Percentual
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {discountType === 'amount' ? (
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Valor do Desconto (R$)</Label>
                    <Input
                      type="number"
                      placeholder="0,00"
                      value={discountAmount}
                      onChange={e => { setDiscountAmount(e.target.value); setDiscountPercentage(''); setSimulationResult(null); }}
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Percentual de Desconto (%)</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={discountPercentage}
                      onChange={e => { setDiscountPercentage(e.target.value); setDiscountAmount(''); setSimulationResult(null); }}
                    />
                  </div>
                )}

                {amortizationType === 'first_installments' && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <Label className="text-xs font-medium flex items-center gap-1">
                        <Hash className="h-3 w-3" /> Nº de Parcelas
                      </Label>
                      <Input
                        type="number"
                        placeholder="Quantidade"
                        value={numberOfInstallments}
                        onChange={e => setNumberOfInstallments(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium flex items-center gap-1">
                        <DollarSign className="h-3 w-3" /> Valor Final (R$)
                      </Label>
                      <Input
                        type="number"
                        placeholder="Ou informe o valor"
                        value={paymentAmount}
                        onChange={e => setPaymentAmount(e.target.value)}
                      />
                    </div>
                  </>
                )}

                <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <p className="text-xs text-destructive flex items-start gap-2">
                    <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    <span>
                      Os campos <strong>discount_amount</strong> e <strong>discount_percentage</strong> NÃO podem ser enviados juntos.
                    </span>
                  </p>
                </div>

                <Button
                  onClick={handleSimulate}
                  disabled={simulating}
                  className="w-full"
                  size="lg"
                >
                  {simulating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Simulando...
                    </>
                  ) : (
                    <>
                      <Calculator className="h-4 w-4 mr-2" />
                      Simular Renegociação
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Installments + Result */}
          <div className="lg:col-span-2 space-y-4">
            {needsInstallmentSelection && (
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Hash className="h-4 w-4 text-primary" />
                      Parcelas Disponíveis
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={selectAllOverdue} className="text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1 text-destructive" />
                        Selecionar em atraso
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => { setSelectedKeys([]); setSimulationResult(null); }} className="text-xs">
                        Limpar
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    {selectedKeys.length} parcela(s) selecionada(s) · Total: {formatCurrency(
                      mockInstallments.filter(i => selectedKeys.includes(i.key)).reduce((s, i) => s + i.amount, 0)
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-border/50 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30">
                          <TableHead className="w-10"></TableHead>
                          <TableHead className="text-xs">#</TableHead>
                          <TableHead className="text-xs">Vencimento</TableHead>
                          <TableHead className="text-xs text-right">Principal</TableHead>
                          <TableHead className="text-xs text-right">Juros</TableHead>
                          <TableHead className="text-xs text-right">Total</TableHead>
                          <TableHead className="text-xs text-center">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockInstallments.map((inst) => (
                          <TableRow
                            key={inst.key}
                            className={cn(
                              'cursor-pointer transition-colors',
                              selectedKeys.includes(inst.key) && 'bg-primary/5'
                            )}
                            onClick={() => toggleInstallment(inst.key)}
                          >
                            <TableCell>
                              <Checkbox
                                checked={selectedKeys.includes(inst.key)}
                                onCheckedChange={() => toggleInstallment(inst.key)}
                              />
                            </TableCell>
                            <TableCell className="font-mono text-xs">{inst.number}</TableCell>
                            <TableCell className="text-xs">{new Date(inst.dueDate).toLocaleDateString('pt-BR')}</TableCell>
                            <TableCell className="text-xs text-right">{formatCurrency(inst.principal)}</TableCell>
                            <TableCell className="text-xs text-right text-muted-foreground">{formatCurrency(inst.interest)}</TableCell>
                            <TableCell className="text-xs text-right font-medium">{formatCurrency(inst.amount)}</TableCell>
                            <TableCell className="text-center">
                              <Badge
                                variant={inst.status === 'overdue' ? 'destructive' : 'secondary'}
                                className="text-[10px] px-2"
                              >
                                {inst.status === 'overdue' ? 'Em atraso' : 'Aberta'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Simulation Result */}
            {simulationResult && (
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Resultado da Simulação
                  </CardTitle>
                  <CardDescription>Valores calculados com base nos parâmetros informados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: 'Valor Presente', value: formatCurrency(simulationResult.presentValue), icon: DollarSign },
                      { label: 'Desconto Aplicado', value: formatCurrency(simulationResult.discountApplied), icon: Percent, color: 'text-green-600 dark:text-green-400' },
                      { label: 'Valor Final', value: formatCurrency(simulationResult.finalAmount), icon: ArrowRight, highlight: true },
                      { label: 'Economia', value: `${simulationResult.savingsPercentage.toFixed(2)}%`, icon: CheckCircle2, color: 'text-green-600 dark:text-green-400' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={cn(
                          'p-4 rounded-xl border border-border/50 bg-card/80 space-y-2',
                          item.highlight && 'border-primary/40 bg-primary/5'
                        )}
                      >
                        <div className="flex items-center gap-1.5">
                          <item.icon className={cn('h-3.5 w-3.5 text-muted-foreground', item.color)} />
                          <span className="text-xs text-muted-foreground">{item.label}</span>
                        </div>
                        <p className={cn('text-lg font-bold', item.highlight ? 'text-primary' : 'text-foreground', item.color)}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Mock JSON Payload */}
                  <div className="rounded-lg bg-muted/50 border border-border/50 p-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Request Payload (Preview)</p>
                    <pre className="text-xs text-foreground/80 overflow-x-auto font-mono leading-relaxed">
{JSON.stringify({
  debt_key: mockDebt.key,
  amortization_type: amortizationType,
  reference_date: referenceDate,
  proposal_due_date: proposalDueDate,
  ...(discountType === 'amount'
    ? { discount_amount: parseFloat(discountAmount) || 0 }
    : { discount_percentage: parseFloat(discountPercentage) || 0 }),
  ...(needsInstallmentSelection
    ? { installments: selectedKeys.map(k => ({ installment_key: k })) }
    : {
        ...(numberOfInstallments ? { number_of_installments: parseInt(numberOfInstallments) } : {}),
        ...(paymentAmount ? { payment_amount: parseFloat(paymentAmount) } : {}),
      }),
}, null, 2)}
                    </pre>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Button className="flex-1" size="lg">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Confirmar Renegociação
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => setSimulationResult(null)}>
                      Nova Simulação
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
