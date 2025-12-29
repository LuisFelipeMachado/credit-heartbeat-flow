import { useState } from 'react';
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
import { 
  MapPin, 
  Building2,
  Search,
  Loader2,
  FileOutput
} from 'lucide-react';
import { toast } from 'sonner';

interface AgreementAddressSectionProps {
  convenio: string;
  setConvenio: (value: string) => void;
  loja: string;
  setLoja: (value: string) => void;
  cep: string;
  setCep: (value: string) => void;
  endereco: string;
  setEndereco: (value: string) => void;
  numero: string;
  setNumero: (value: string) => void;
  complemento: string;
  setComplemento: (value: string) => void;
  bairro: string;
  setBairro: (value: string) => void;
  cidade: string;
  setCidade: (value: string) => void;
  estado: string;
  setEstado: (value: string) => void;
  onEmitirDivida: () => void;
}

export function AgreementAddressSection({
  convenio,
  setConvenio,
  loja,
  setLoja,
  cep,
  setCep,
  endereco,
  setEndereco,
  numero,
  setNumero,
  complemento,
  setComplemento,
  bairro,
  setBairro,
  cidade,
  setCidade,
  estado,
  setEstado,
  onEmitirDivida
}: AgreementAddressSectionProps) {
  const [isSearchingCep, setIsSearchingCep] = useState(false);

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);
  };

  const handleCepSearch = async () => {
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      toast.error('CEP inválido');
      return;
    }

    setIsSearchingCep(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast.error('CEP não encontrado');
        return;
      }

      setEndereco(data.logradouro || '');
      setBairro(data.bairro || '');
      setCidade(data.localidade || '');
      setEstado(data.uf || '');
      toast.success('Endereço encontrado!');
    } catch {
      toast.error('Erro ao buscar CEP');
    } finally {
      setIsSearchingCep(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-accent" />
          <CardTitle>5. Convênio e Endereço</CardTitle>
        </div>
        <CardDescription>
          Dados do convênio e endereço do cliente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Convênio e Loja */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="convenio">Convênio</Label>
            <Select value={convenio} onValueChange={setConvenio}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o convênio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inss">INSS</SelectItem>
                <SelectItem value="siape">SIAPE - Servidor Federal</SelectItem>
                <SelectItem value="forcas-armadas">Forças Armadas</SelectItem>
                <SelectItem value="governo-estadual">Governo Estadual</SelectItem>
                <SelectItem value="governo-municipal">Governo Municipal</SelectItem>
                <SelectItem value="privado">Setor Privado</SelectItem>
              </SelectContent>
            </Select>
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
        </div>

        <Separator />

        {/* Endereço */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Endereço</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <div className="flex gap-2">
                <Input
                  id="cep"
                  placeholder="00000-000"
                  value={cep}
                  onChange={(e) => setCep(formatCep(e.target.value))}
                  maxLength={9}
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleCepSearch}
                  disabled={isSearchingCep}
                >
                  {isSearchingCep ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="endereco">Logradouro</Label>
              <Input
                id="endereco"
                placeholder="Rua, Avenida..."
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numero">Número</Label>
              <Input
                id="numero"
                placeholder="123"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complemento">Complemento</Label>
              <Input
                id="complemento"
                placeholder="Apto, Bloco..."
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bairro">Bairro</Label>
              <Input
                id="bairro"
                placeholder="Bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade</Label>
              <Input
                id="cidade"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Select value={estado} onValueChange={setEstado}>
                <SelectTrigger>
                  <SelectValue placeholder="UF" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AC">AC</SelectItem>
                  <SelectItem value="AL">AL</SelectItem>
                  <SelectItem value="AP">AP</SelectItem>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="BA">BA</SelectItem>
                  <SelectItem value="CE">CE</SelectItem>
                  <SelectItem value="DF">DF</SelectItem>
                  <SelectItem value="ES">ES</SelectItem>
                  <SelectItem value="GO">GO</SelectItem>
                  <SelectItem value="MA">MA</SelectItem>
                  <SelectItem value="MT">MT</SelectItem>
                  <SelectItem value="MS">MS</SelectItem>
                  <SelectItem value="MG">MG</SelectItem>
                  <SelectItem value="PA">PA</SelectItem>
                  <SelectItem value="PB">PB</SelectItem>
                  <SelectItem value="PR">PR</SelectItem>
                  <SelectItem value="PE">PE</SelectItem>
                  <SelectItem value="PI">PI</SelectItem>
                  <SelectItem value="RJ">RJ</SelectItem>
                  <SelectItem value="RN">RN</SelectItem>
                  <SelectItem value="RS">RS</SelectItem>
                  <SelectItem value="RO">RO</SelectItem>
                  <SelectItem value="RR">RR</SelectItem>
                  <SelectItem value="SC">SC</SelectItem>
                  <SelectItem value="SP">SP</SelectItem>
                  <SelectItem value="SE">SE</SelectItem>
                  <SelectItem value="TO">TO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        <Button 
          onClick={onEmitirDivida} 
          size="lg" 
          className="w-full gap-2"
        >
          <FileOutput className="h-5 w-5" />
          Emitir Dívida / Finalizar Proposta
        </Button>
      </CardContent>
    </Card>
  );
}
