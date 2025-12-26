import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Briefcase, 
  Search, 
  Building2, 
  Calendar, 
  DollarSign, 
  Users, 
  Phone, 
  User,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';

interface EmploymentBond {
  company: string;
  cnpj: string;
  position: string;
  admissionDate: string;
  salary: string;
  status: 'active' | 'inactive';
  contractType: string;
}

interface Reference {
  name: string;
  phone: string;
  relationship: string;
  verified: boolean;
}

// Mock data for demonstration
const mockEmploymentData: EmploymentBond[] = [
  {
    company: 'Empresa ABC Ltda',
    cnpj: '12.345.678/0001-90',
    position: 'Analista Financeiro',
    admissionDate: '2020-03-15',
    salary: 'R$ 5.500,00',
    status: 'active',
    contractType: 'CLT'
  },
  {
    company: 'Tech Solutions S.A.',
    cnpj: '98.765.432/0001-10',
    position: 'Desenvolvedor',
    admissionDate: '2018-01-10',
    salary: 'R$ 4.200,00',
    status: 'inactive',
    contractType: 'CLT'
  }
];

const mockReferences: Reference[] = [
  { name: 'João Silva', phone: '(11) 99999-1234', relationship: 'Supervisor', verified: true },
  { name: 'Maria Santos', phone: '(11) 98888-5678', relationship: 'Colega de trabalho', verified: false },
];

interface EmploymentBondDialogProps {
  cpf?: string;
}

export function EmploymentBondDialog({ cpf }: EmploymentBondDialogProps) {
  const [searchCpf, setSearchCpf] = useState(cpf || '');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [employmentBonds, setEmploymentBonds] = useState<EmploymentBond[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);

  // New reference form
  const [newRefName, setNewRefName] = useState('');
  const [newRefPhone, setNewRefPhone] = useState('');
  const [newRefRelationship, setNewRefRelationship] = useState('');

  const handleSearch = async () => {
    if (!searchCpf.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setEmploymentBonds(mockEmploymentData);
    setReferences(mockReferences);
    setHasSearched(true);
    setIsSearching(false);
  };

  const handleAddReference = () => {
    if (!newRefName.trim() || !newRefPhone.trim()) return;
    
    const newRef: Reference = {
      name: newRefName,
      phone: newRefPhone,
      relationship: newRefRelationship || 'Não informado',
      verified: false
    };
    
    setReferences([...references, newRef]);
    setNewRefName('');
    setNewRefPhone('');
    setNewRefRelationship('');
  };

  const formatCpf = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Briefcase className="h-4 w-4" />
          Consultar Vínculo Empregatício
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Briefcase className="h-5 w-5 text-accent" />
            Consulta de Vínculo Empregatício
          </DialogTitle>
          <DialogDescription>
            Consulte o histórico de vínculos empregatícios e gerencie pessoas de referência.
          </DialogDescription>
        </DialogHeader>

        {/* Search Section */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="cpf-search">CPF do Cliente</Label>
              <Input
                id="cpf-search"
                placeholder="000.000.000-00"
                value={searchCpf}
                onChange={(e) => setSearchCpf(formatCpf(e.target.value))}
                maxLength={14}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} disabled={isSearching || !searchCpf.trim()}>
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Consultar
              </Button>
            </div>
          </div>

          {hasSearched && (
            <>
              <Separator />
              
              {/* Employment Bonds Section */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  Vínculos Empregatícios
                </h3>
                
                {employmentBonds.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="py-6 text-center text-muted-foreground">
                      Nenhum vínculo empregatício encontrado.
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-3">
                    {employmentBonds.map((bond, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{bond.company}</h4>
                                <Badge variant={bond.status === 'active' ? 'default' : 'secondary'}>
                                  {bond.status === 'active' ? (
                                    <><CheckCircle className="h-3 w-3 mr-1" /> Ativo</>
                                  ) : (
                                    <><XCircle className="h-3 w-3 mr-1" /> Inativo</>
                                  )}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">CNPJ: {bond.cnpj}</p>
                            </div>
                            <Badge variant="outline">{bond.contractType}</Badge>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-muted-foreground">Cargo</p>
                                <p className="font-medium">{bond.position}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-muted-foreground">Admissão</p>
                                <p className="font-medium">
                                  {new Date(bond.admissionDate).toLocaleDateString('pt-BR')}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-muted-foreground">Salário</p>
                                <p className="font-medium">{bond.salary}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* References Section */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  Pessoas de Referência
                </h3>
                
                {references.length > 0 && (
                  <div className="grid gap-2">
                    {references.map((ref, index) => (
                      <Card key={index} className="bg-muted/30">
                        <CardContent className="p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                              <User className="h-5 w-5 text-accent" />
                            </div>
                            <div>
                              <p className="font-medium">{ref.name}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                {ref.phone}
                                <span>•</span>
                                {ref.relationship}
                              </div>
                            </div>
                          </div>
                          <Badge variant={ref.verified ? 'default' : 'outline'}>
                            {ref.verified ? 'Verificado' : 'Pendente'}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Add Reference Form */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Adicionar Nova Referência</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label htmlFor="ref-name">Nome</Label>
                        <Input
                          id="ref-name"
                          placeholder="Nome completo"
                          value={newRefName}
                          onChange={(e) => setNewRefName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="ref-phone">Telefone</Label>
                        <Input
                          id="ref-phone"
                          placeholder="(00) 00000-0000"
                          value={newRefPhone}
                          onChange={(e) => setNewRefPhone(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="ref-relationship">Relação</Label>
                        <Input
                          id="ref-relationship"
                          placeholder="Ex: Supervisor"
                          value={newRefRelationship}
                          onChange={(e) => setNewRefRelationship(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={handleAddReference}
                      disabled={!newRefName.trim() || !newRefPhone.trim()}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Adicionar Referência
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
