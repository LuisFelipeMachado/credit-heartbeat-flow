import { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Plus, Pencil, Store, Search, ChevronDown, ChevronRight, Building2, Users, User } from 'lucide-react';
import { mockLojas, mockFiliais, mockUsuarios, mockUserRoles } from '@/data/mockData';
import type { Loja, Filial } from '@/types';

interface ClienteFormData {
  nome_fantasia: string;
  cnpj: string;
  ie: string;
  telefone: string;
  email: string;
  endereco: string;
  cidade: string;
  uf: string;
  limite_credito: string;
  comissao_padrao: string;
  responsavel: string;
  ativo: boolean;
}

interface LojaFormData {
  nome: string;
  codigo: string;
  endereco: string;
  cidade: string;
  uf: string;
  telefone: string;
  ativo: boolean;
}

const emptyClienteFormData: ClienteFormData = {
  nome_fantasia: '',
  cnpj: '',
  ie: '',
  telefone: '',
  email: '',
  endereco: '',
  cidade: '',
  uf: '',
  limite_credito: '',
  comissao_padrao: '',
  responsavel: '',
  ativo: true,
};

const emptyLojaFormData: LojaFormData = {
  nome: '',
  codigo: '',
  endereco: '',
  cidade: '',
  uf: '',
  telefone: '',
  ativo: true,
};

const roleLabels: Record<string, string> = {
  ADMIN: 'Admin',
  GESTOR_LOJA: 'Admin Loja',
  OPERADOR_LOJA: 'Operador',
  ANALISTA_CREDITO: 'Analista',
  FINANCEIRO: 'Financeiro',
  AUDITOR: 'Auditor',
};

export default function Lojas() {
  const [clientes, setClientes] = useState<Loja[]>(mockLojas);
  const [lojas, setLojas] = useState<Filial[]>(mockFiliais);
  const [search, setSearch] = useState('');
  const [expandedClientes, setExpandedClientes] = useState<Set<string>>(new Set());
  const [expandedLojas, setExpandedLojas] = useState<Set<string>>(new Set());

  // Cliente dialog
  const [clienteDialogOpen, setClienteDialogOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Loja | null>(null);
  const [clienteFormData, setClienteFormData] = useState<ClienteFormData>(emptyClienteFormData);

  // Loja dialog
  const [lojaDialogOpen, setLojaDialogOpen] = useState(false);
  const [editingLoja, setEditingLoja] = useState<Filial | null>(null);
  const [lojaFormData, setLojaFormData] = useState<LojaFormData>(emptyLojaFormData);
  const [lojaClienteId, setLojaClienteId] = useState<string>('');

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome_fantasia.toLowerCase().includes(search.toLowerCase()) ||
      cliente.cnpj.includes(search) ||
      cliente.cidade?.toLowerCase().includes(search.toLowerCase())
  );

  const getLojasByCliente = (clienteId: string) => lojas.filter((l) => l.loja_id === clienteId);

  const getUsuariosByFilial = (filialId: string) =>
    mockUsuarios.filter((u) => u.filial_id === filialId);

  const getUserRole = (userId: string) => {
    const role = mockUserRoles.find((r) => r.user_id === userId);
    return role ? roleLabels[role.role] || role.role : '-';
  };

  const toggleExpandCliente = (clienteId: string) => {
    setExpandedClientes((prev) => {
      const next = new Set(prev);
      if (next.has(clienteId)) next.delete(clienteId);
      else next.add(clienteId);
      return next;
    });
  };

  const toggleExpandLoja = (lojaId: string) => {
    setExpandedLojas((prev) => {
      const next = new Set(prev);
      if (next.has(lojaId)) next.delete(lojaId);
      else next.add(lojaId);
      return next;
    });
  };

  // === Cliente handlers ===
  const handleOpenNewCliente = () => {
    setEditingCliente(null);
    setClienteFormData(emptyClienteFormData);
    setClienteDialogOpen(true);
  };

  const handleEditCliente = (cliente: Loja) => {
    setEditingCliente(cliente);
    setClienteFormData({
      nome_fantasia: cliente.nome_fantasia,
      cnpj: cliente.cnpj,
      ie: cliente.ie || '',
      telefone: cliente.telefone || '',
      email: cliente.email || '',
      endereco: cliente.endereco || '',
      cidade: cliente.cidade || '',
      uf: cliente.uf || '',
      limite_credito: '',
      comissao_padrao: '',
      responsavel: '',
      ativo: cliente.ativo,
    });
    setClienteDialogOpen(true);
  };

  const handleSaveCliente = () => {
    if (editingCliente) {
      setClientes(
        clientes.map((c) =>
          c.id === editingCliente.id
            ? {
                ...c,
                nome_fantasia: clienteFormData.nome_fantasia,
                cnpj: clienteFormData.cnpj,
                ie: clienteFormData.ie || undefined,
                telefone: clienteFormData.telefone || undefined,
                email: clienteFormData.email || undefined,
                endereco: clienteFormData.endereco || undefined,
                cidade: clienteFormData.cidade || undefined,
                uf: clienteFormData.uf || undefined,
                ativo: clienteFormData.ativo,
                updated_at: new Date().toISOString(),
              }
            : c
        )
      );
    } else {
      const newCliente: Loja = {
        id: String(Date.now()),
        nome_fantasia: clienteFormData.nome_fantasia,
        cnpj: clienteFormData.cnpj,
        ie: clienteFormData.ie || undefined,
        telefone: clienteFormData.telefone || undefined,
        email: clienteFormData.email || undefined,
        endereco: clienteFormData.endereco || undefined,
        cidade: clienteFormData.cidade || undefined,
        uf: clienteFormData.uf || undefined,
        ativo: clienteFormData.ativo,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setClientes([...clientes, newCliente]);
    }
    setClienteDialogOpen(false);
  };

  // === Loja handlers ===
  const handleOpenNewLoja = (clienteId: string) => {
    setEditingLoja(null);
    setLojaClienteId(clienteId);
    setLojaFormData(emptyLojaFormData);
    setLojaDialogOpen(true);
  };

  const handleEditLoja = (loja: Filial) => {
    setEditingLoja(loja);
    setLojaClienteId(loja.loja_id);
    setLojaFormData({
      nome: loja.nome,
      codigo: loja.codigo,
      endereco: loja.endereco || '',
      cidade: loja.cidade || '',
      uf: loja.uf || '',
      telefone: loja.telefone || '',
      ativo: loja.ativo,
    });
    setLojaDialogOpen(true);
  };

  const handleSaveLoja = () => {
    if (editingLoja) {
      setLojas(
        lojas.map((l) =>
          l.id === editingLoja.id
            ? {
                ...l,
                nome: lojaFormData.nome,
                codigo: lojaFormData.codigo,
                endereco: lojaFormData.endereco || undefined,
                cidade: lojaFormData.cidade || undefined,
                uf: lojaFormData.uf || undefined,
                telefone: lojaFormData.telefone || undefined,
                ativo: lojaFormData.ativo,
                updated_at: new Date().toISOString(),
              }
            : l
        )
      );
    } else {
      const newLoja: Filial = {
        id: String(Date.now()),
        loja_id: lojaClienteId,
        nome: lojaFormData.nome,
        codigo: lojaFormData.codigo,
        endereco: lojaFormData.endereco || undefined,
        cidade: lojaFormData.cidade || undefined,
        uf: lojaFormData.uf || undefined,
        telefone: lojaFormData.telefone || undefined,
        ativo: lojaFormData.ativo,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setLojas([...lojas, newLoja]);
    }
    setLojaDialogOpen(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Clientes & Lojas</h1>
            <p className="text-muted-foreground">Gerencie os clientes, suas lojas e equipes</p>
          </div>
          <Button onClick={handleOpenNewCliente}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Lista de Clientes
              </CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar clientes..."
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Cidade/UF</TableHead>
                  <TableHead>Lojas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientes.map((cliente) => {
                  const clienteLojas = getLojasByCliente(cliente.id);
                  const isExpanded = expandedClientes.has(cliente.id);

                  return (
                    <Collapsible key={cliente.id} open={isExpanded} onOpenChange={() => toggleExpandCliente(cliente.id)} asChild>
                      <>
                        <TableRow className="cursor-pointer">
                          <TableCell>
                            <CollapsibleTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </Button>
                            </CollapsibleTrigger>
                          </TableCell>
                          <TableCell className="font-medium">{cliente.nome_fantasia}</TableCell>
                          <TableCell>{cliente.cnpj}</TableCell>
                          <TableCell>
                            {cliente.cidade && cliente.uf ? `${cliente.cidade}/${cliente.uf}` : '-'}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{clienteLojas.length} loja(s)</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={cliente.ativo ? 'default' : 'secondary'}>
                              {cliente.ativo ? 'Ativo' : 'Inativo'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleEditCliente(cliente)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <CollapsibleContent asChild>
                          <>
                            {clienteLojas.map((loja) => {
                              const lojaUsers = getUsuariosByFilial(loja.id);
                              const isLojaExpanded = expandedLojas.has(loja.id);

                              return (
                                <Collapsible key={loja.id} open={isLojaExpanded} onOpenChange={() => toggleExpandLoja(loja.id)} asChild>
                                  <>
                                    <TableRow className="bg-muted/30 cursor-pointer">
                                      <TableCell></TableCell>
                                      <TableCell className="pl-8">
                                        <div className="flex items-center gap-2">
                                          <Button variant="ghost" size="sm" className="h-5 w-5 p-0" onClick={() => toggleExpandLoja(loja.id)}>
                                            {isLojaExpanded ? (
                                              <ChevronDown className="h-3 w-3" />
                                            ) : (
                                              <ChevronRight className="h-3 w-3" />
                                            )}
                                          </Button>
                                          <Building2 className="h-4 w-4 text-muted-foreground" />
                                          <span>{loja.nome}</span>
                                          <Badge variant="outline" className="text-xs">{loja.codigo}</Badge>
                                          {lojaUsers.length > 0 && (
                                            <Badge variant="secondary" className="text-xs gap-1">
                                              <Users className="h-3 w-3" />
                                              {lojaUsers.length}
                                            </Badge>
                                          )}
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-muted-foreground text-sm">
                                        {loja.telefone || '-'}
                                      </TableCell>
                                      <TableCell className="text-sm">
                                        {loja.cidade && loja.uf ? `${loja.cidade}/${loja.uf}` : '-'}
                                      </TableCell>
                                      <TableCell></TableCell>
                                      <TableCell>
                                        <Badge variant={loja.ativo ? 'default' : 'secondary'}>
                                          {loja.ativo ? 'Ativa' : 'Inativa'}
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" onClick={() => handleEditLoja(loja)}>
                                          <Pencil className="h-4 w-4" />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                    <CollapsibleContent asChild>
                                      <>
                                        {lojaUsers.map((usuario) => (
                                          <TableRow key={usuario.id} className="bg-muted/15">
                                            <TableCell></TableCell>
                                            <TableCell className="pl-16">
                                              <div className="flex items-center gap-2">
                                                <User className="h-3.5 w-3.5 text-muted-foreground" />
                                                <span className="text-sm">{usuario.nome}</span>
                                                <Badge variant="outline" className="text-xs">
                                                  {getUserRole(usuario.id)}
                                                </Badge>
                                              </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-xs">
                                              {usuario.email}
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>
                                              <Badge variant={usuario.ativo ? 'default' : 'secondary'} className="text-xs">
                                                {usuario.ativo ? 'Ativo' : 'Inativo'}
                                              </Badge>
                                            </TableCell>
                                            <TableCell></TableCell>
                                          </TableRow>
                                        ))}
                                        {lojaUsers.length === 0 && (
                                          <TableRow className="bg-muted/15">
                                            <TableCell></TableCell>
                                            <TableCell colSpan={6} className="pl-16 text-muted-foreground text-sm italic">
                                              Nenhum usuário vinculado a esta loja
                                            </TableCell>
                                          </TableRow>
                                        )}
                                      </>
                                    </CollapsibleContent>
                                  </>
                                </Collapsible>
                              );
                            })}
                            <TableRow className="bg-muted/30">
                              <TableCell></TableCell>
                              <TableCell colSpan={6}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-primary"
                                  onClick={() => handleOpenNewLoja(cliente.id)}
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  Adicionar Loja
                                </Button>
                              </TableCell>
                            </TableRow>
                          </>
                        </CollapsibleContent>
                      </>
                    </Collapsible>
                  );
                })}
                {filteredClientes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      Nenhum cliente encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Cliente Dialog */}
      <Dialog open={clienteDialogOpen} onOpenChange={setClienteDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingCliente ? 'Editar Cliente' : 'Novo Cliente'}</DialogTitle>
            <DialogDescription>
              {editingCliente ? 'Altere os dados do cliente' : 'Preencha os dados para cadastrar um novo cliente'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome_fantasia">Nome Fantasia *</Label>
                <Input id="nome_fantasia" value={clienteFormData.nome_fantasia} onChange={(e) => setClienteFormData({ ...clienteFormData, nome_fantasia: e.target.value })} placeholder="Nome do cliente" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ *</Label>
                <Input id="cnpj" value={clienteFormData.cnpj} onChange={(e) => setClienteFormData({ ...clienteFormData, cnpj: e.target.value })} placeholder="00.000.000/0000-00" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ie">Inscrição Estadual</Label>
                <Input id="ie" value={clienteFormData.ie} onChange={(e) => setClienteFormData({ ...clienteFormData, ie: e.target.value })} placeholder="Inscrição Estadual" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável</Label>
                <Input id="responsavel" value={clienteFormData.responsavel} onChange={(e) => setClienteFormData({ ...clienteFormData, responsavel: e.target.value })} placeholder="Nome do responsável" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" value={clienteFormData.telefone} onChange={(e) => setClienteFormData({ ...clienteFormData, telefone: e.target.value })} placeholder="(00) 0000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" value={clienteFormData.email} onChange={(e) => setClienteFormData({ ...clienteFormData, email: e.target.value })} placeholder="email@exemplo.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input id="endereco" value={clienteFormData.endereco} onChange={(e) => setClienteFormData({ ...clienteFormData, endereco: e.target.value })} placeholder="Rua, número" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input id="cidade" value={clienteFormData.cidade} onChange={(e) => setClienteFormData({ ...clienteFormData, cidade: e.target.value })} placeholder="Cidade" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="uf">UF</Label>
                <Input id="uf" value={clienteFormData.uf} onChange={(e) => setClienteFormData({ ...clienteFormData, uf: e.target.value })} placeholder="SP" maxLength={2} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="limite_credito">Limite de Crédito</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
                  <Input id="limite_credito" value={clienteFormData.limite_credito} onChange={(e) => setClienteFormData({ ...clienteFormData, limite_credito: e.target.value })} className="pl-9" placeholder="0,00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comissao_padrao">Comissão Padrão</Label>
                <div className="relative">
                  <Input id="comissao_padrao" value={clienteFormData.comissao_padrao} onChange={(e) => setClienteFormData({ ...clienteFormData, comissao_padrao: e.target.value })} className="pr-8" placeholder="0,00" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="ativo" checked={clienteFormData.ativo} onCheckedChange={(checked) => setClienteFormData({ ...clienteFormData, ativo: checked })} />
              <Label htmlFor="ativo">Cliente Ativo</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setClienteDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveCliente}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Loja Dialog */}
      <Dialog open={lojaDialogOpen} onOpenChange={setLojaDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingLoja ? 'Editar Loja' : 'Nova Loja'}</DialogTitle>
            <DialogDescription>
              {editingLoja ? 'Altere os dados da loja' : 'Preencha os dados para cadastrar uma nova loja'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loja_nome">Nome da Loja *</Label>
                <Input id="loja_nome" value={lojaFormData.nome} onChange={(e) => setLojaFormData({ ...lojaFormData, nome: e.target.value })} placeholder="Nome da loja" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loja_codigo">Código *</Label>
                <Input id="loja_codigo" value={lojaFormData.codigo} onChange={(e) => setLojaFormData({ ...lojaFormData, codigo: e.target.value })} placeholder="CTR-01" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="loja_endereco">Endereço</Label>
              <Input id="loja_endereco" value={lojaFormData.endereco} onChange={(e) => setLojaFormData({ ...lojaFormData, endereco: e.target.value })} placeholder="Rua, número" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loja_cidade">Cidade</Label>
                <Input id="loja_cidade" value={lojaFormData.cidade} onChange={(e) => setLojaFormData({ ...lojaFormData, cidade: e.target.value })} placeholder="Cidade" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loja_uf">UF</Label>
                <Input id="loja_uf" value={lojaFormData.uf} onChange={(e) => setLojaFormData({ ...lojaFormData, uf: e.target.value })} placeholder="SP" maxLength={2} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="loja_telefone">Telefone</Label>
              <Input id="loja_telefone" value={lojaFormData.telefone} onChange={(e) => setLojaFormData({ ...lojaFormData, telefone: e.target.value })} placeholder="(00) 0000-0000" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="loja_ativo" checked={lojaFormData.ativo} onCheckedChange={(checked) => setLojaFormData({ ...lojaFormData, ativo: checked })} />
              <Label htmlFor="loja_ativo">Loja Ativa</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLojaDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveLoja}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
