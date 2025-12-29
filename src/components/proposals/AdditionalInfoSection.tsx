import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserCircle } from 'lucide-react';

interface AdditionalInfoSectionProps {
  genero: string;
  setGenero: (value: string) => void;
  dataNascimento: string;
  setDataNascimento: (value: string) => void;
  estadoCivil: string;
  setEstadoCivil: (value: string) => void;
  escolaridade: string;
  setEscolaridade: (value: string) => void;
  profissao: string;
  setProfissao: (value: string) => void;
  renda: string;
  setRenda: (value: string) => void;
}

export function AdditionalInfoSection({
  genero,
  setGenero,
  dataNascimento,
  setDataNascimento,
  estadoCivil,
  setEstadoCivil,
  escolaridade,
  setEscolaridade,
  profissao,
  setProfissao,
  renda,
  setRenda
}: AdditionalInfoSectionProps) {
  
  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const amount = parseInt(numbers || '0') / 100;
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const calculateAge = (birthDate: string): number | null => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(dataNascimento);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserCircle className="h-5 w-5 text-accent" />
          <CardTitle>4. Informações Adicionais</CardTitle>
        </div>
        <CardDescription>
          Dados complementares do cliente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="genero">Gênero</Label>
            <Select value={genero} onValueChange={setGenero}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="masculino">Masculino</SelectItem>
                <SelectItem value="feminino">Feminino</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
                <SelectItem value="prefiro-nao-informar">Prefiro não informar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dataNascimento">Data de Nascimento</Label>
            <Input
              id="dataNascimento"
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Idade</Label>
            <Input
              value={age !== null ? `${age} anos` : '-'}
              disabled
              className="bg-muted"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="estadoCivil">Estado Civil</Label>
            <Select value={estadoCivil} onValueChange={setEstadoCivil}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                <SelectItem value="casado">Casado(a)</SelectItem>
                <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                <SelectItem value="uniao-estavel">União Estável</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="escolaridade">Escolaridade</Label>
            <Select value={escolaridade} onValueChange={setEscolaridade}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fundamental-incompleto">Fundamental Incompleto</SelectItem>
                <SelectItem value="fundamental-completo">Fundamental Completo</SelectItem>
                <SelectItem value="medio-incompleto">Médio Incompleto</SelectItem>
                <SelectItem value="medio-completo">Médio Completo</SelectItem>
                <SelectItem value="superior-incompleto">Superior Incompleto</SelectItem>
                <SelectItem value="superior-completo">Superior Completo</SelectItem>
                <SelectItem value="pos-graduacao">Pós-graduação</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="profissao">Profissão</Label>
            <Input
              id="profissao"
              placeholder="Ex: Analista de Sistemas"
              value={profissao}
              onChange={(e) => setProfissao(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="renda">Renda Mensal</Label>
            <Input
              id="renda"
              placeholder="R$ 0,00"
              value={renda}
              onChange={(e) => setRenda(formatCurrency(e.target.value))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
