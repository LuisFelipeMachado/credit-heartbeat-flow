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
import { Plus, Pencil, Store, Search, ChevronDown, ChevronRight, Building2 } from 'lucide-react';
import { mockLojas, mockFiliais } from '@/data/mockData';
import type { Loja, Filial } from '@/types';

interface LojaFormData {
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

interface FilialFormData {
  nome: string;
  codigo: string;
  endereco: string;
  cidade: string;
  uf: string;
  telefone: string;
  ativo: boolean;
}

const emptyLojaFormData: LojaFormData = {
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

const emptyFilialFormData: FilialFormData = {
  nome: '',
  codigo: '',
  endereco: '',
  cidade: '',
  uf: '',
  telefone: '',
  ativo: true,
};

export default function Lojas() {
  const [lojas, setLojas] = useState<Loja[]>(mockLojas);
  const [filiais, setFiliais] = useState<Filial[]>(mockFiliais);
  const [search, setSearch] = useState('');
  const [expandedLojas, setExpandedLojas] = useState<Set<string>>(new Set());

  // Loja dialog
  const [lojaDialogOpen, setLojaDialogOpen] = useState(false);
  const [editingLoja, setEditingLoja] = useState<Loja | null>(null);
  const [lojaFormData, setLojaFormData] = useState<LojaFormData>(emptyLojaFormData);

  // Filial dialog
  const [filialDialogOpen, setFilialDialogOpen] = useState(false);
  const [editingFilial, setEditingFilial] = useState<Filial | null>(null);
  const [filialFormData, setFilialFormData] = useState<FilialFormData>(emptyFilialFormData);
  const [filialLojaId, setFilialLojaId] = useState<string>('');

  const filteredLojas = lojas.filter(
    (loja) =>
      loja.nome_fantasia.toLowerCase().includes(search.toLowerCase()) ||
      loja.cnpj.includes(search) ||
      loja.cidade?.toLowerCase().includes(search.toLowerCase())
  );

  const getFiliaisByLoja = (lojaId: string) => filiais.filter((f) => f.loja_id === lojaId);

  const toggleExpand = (lojaId: string) => {
    setExpandedLojas((prev) => {
      const next = new Set(prev);
      if (next.has(lojaId)) next.delete(lojaId);
      else next.add(lojaId);
      return next;
    });
  };

  // === Loja handlers ===
  const handleOpenNewLoja = () => {
    setEditingLoja(null);
    setLojaFormData(emptyLojaFormData);
    setLojaDialogOpen(true);
  };

  const handleEditLoja = (loja: Loja) => {
    setEditingLoja(loja);
    setLojaFormData({
      nome_fantasia: loja.nome_fantasia,
      cnpj: loja.cnpj,
      ie: loja.ie || '',
      telefone: loja.telefone || '',
      email: loja.email || '',
      endereco: loja.endereco || '',
      cidade: loja.cidade || '',
      uf: loja.uf || '',
      limite_credito: '',
      comissao_padrao: '',
      responsavel: '',
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
                nome_fantasia: lojaFormData.nome_fantasia,
                cnpj: lojaFormData.cnpj,
                ie: lojaFormData.ie || undefined,
                telefone: lojaFormData.telefone || undefined,
                email: lojaFormData.email || undefined,
                endereco: lojaFormData.endereco || undefined,
                cidade: lojaFormData.cidade || undefined,
                uf: lojaFormData.uf || undefined,
                ativo: lojaFormData.ativo,
                updated_at: new Date().toISOString(),
              }
            : l
        )
      );
    } else {
      const newLoja: Loja = {
        id: String(Date.now()),
        nome_fantasia: lojaFormData.nome_fantasia,
        cnpj: lojaFormData.cnpj,
        ie: lojaFormData.ie || undefined,
        telefone: lojaFormData.telefone || undefined,
        email: lojaFormData.email || undefined,
        endereco: lojaFormData.endereco || undefined,
        cidade: lojaFormData.cidade || undefined,
        uf: lojaFormData.uf || undefined,
        ativo: lojaFormData.ativo,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setLojas([...lojas, newLoja]);
    }
    setLojaDialogOpen(false);
  };

  // === Filial handlers ===
  const handleOpenNewFilial = (lojaId: string) => {
    setEditingFilial(null);
    setFilialLojaId(lojaId);
    setFilialFormData(emptyFilialFormData);
    setFilialDialogOpen(true);
  };

  const handleEditFilial = (filial: Filial) => {
    setEditingFilial(filial);
    setFilialLojaId(filial.loja_id);
    setFilialFormData({
      nome: filial.nome,
      codigo: filial.codigo,
      endereco: filial.endereco || '',
      cidade: filial.cidade || '',
      uf: filial.uf || '',
      telefone: filial.telefone || '',
      ativo: filial.ativo,
    });
    setFilialDialogOpen(true);
  };

  const handleSaveFilial = () => {
    if (editingFilial) {
      setFiliais(
        filiais.map((f) =>
          f.id === editingFilial.id
            ? {
                ...f,
                nome: filialFormData.nome,
                codigo: filialFormData.codigo,
                endereco: filialFormData.endereco || undefined,
                cidade: filialFormData.cidade || undefined,
                uf: filialFormData.uf || undefined,
                telefone: filialFormData.telefone || undefined,
                ativo: filialFormData.ativo,
                updated_at: new Date().toISOString(),
              }
            : f
        )
      );
    } else {
      const newFilial: Filial = {
        id: String(Date.now()),
        loja_id: filialLojaId,
        nome: filialFormData.nome,
        codigo: filialFormData.codigo,
        endereco: filialFormData.endereco || undefined,
        cidade: filialFormData.cidade || undefined,
        uf: filialFormData.uf || undefined,
        telefone: filialFormData.telefone || undefined,
        ativo: filialFormData.ativo,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setFiliais([...filiais, newFilial]);
    }
    setFilialDialogOpen(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Lojas & Filiais</h1>
            <p className="text-muted-foreground">Gerencie as lojas e suas filiais</p>
          </div>
          <Button onClick={handleOpenNewLoja}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Loja
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Lista de Lojas
              </CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar lojas..."
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
                  <TableHead>Nome Fantasia</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Cidade/UF</TableHead>
                  <TableHead>Filiais</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLojas.map((loja) => {
                  const lojaFiliais = getFiliaisByLoja(loja.id);
                  const isExpanded = expandedLojas.has(loja.id);

                  return (
                    <Collapsible key={loja.id} open={isExpanded} onOpenChange={() => toggleExpand(loja.id)} asChild>
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
                          <TableCell className="font-medium">{loja.nome_fantasia}</TableCell>
                          <TableCell>{loja.cnpj}</TableCell>
                          <TableCell>
                            {loja.cidade && loja.uf ? `${loja.cidade}/${loja.uf}` : '-'}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{lojaFiliais.length} filial(is)</Badge>
                          </TableCell>
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
                            {lojaFiliais.map((filial) => (
                              <TableRow key={filial.id} className="bg-muted/30">
                                <TableCell></TableCell>
                                <TableCell className="pl-8">
                                  <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                    <span>{filial.nome}</span>
                                    <Badge variant="outline" className="text-xs">{filial.codigo}</Badge>
                                  </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm">
                                  {filial.telefone || '-'}
                                </TableCell>
                                <TableCell className="text-sm">
                                  {filial.cidade && filial.uf ? `${filial.cidade}/${filial.uf}` : '-'}
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                  <Badge variant={filial.ativo ? 'default' : 'secondary'}>
                                    {filial.ativo ? 'Ativa' : 'Inativa'}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" onClick={() => handleEditFilial(filial)}>
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                            <TableRow className="bg-muted/30">
                              <TableCell></TableCell>
                              <TableCell colSpan={6}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-primary"
                                  onClick={() => handleOpenNewFilial(loja.id)}
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  Adicionar Filial
                                </Button>
                              </TableCell>
                            </TableRow>
                          </>
                        </CollapsibleContent>
                      </>
                    </Collapsible>
                  );
                })}
                {filteredLojas.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      Nenhuma loja encontrada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Loja Dialog */}
      <Dialog open={lojaDialogOpen} onOpenChange={setLojaDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingLoja ? 'Editar Loja' : 'Nova Loja'}</DialogTitle>
            <DialogDescription>
              {editingLoja ? 'Altere os dados da loja' : 'Preencha os dados para cadastrar uma nova loja'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome_fantasia">Nome Fantasia *</Label>
                <Input id="nome_fantasia" value={lojaFormData.nome_fantasia} onChange={(e) => setLojaFormData({ ...lojaFormData, nome_fantasia: e.target.value })} placeholder="Nome da loja" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ *</Label>
                <Input id="cnpj" value={lojaFormData.cnpj} onChange={(e) => setLojaFormData({ ...lojaFormData, cnpj: e.target.value })} placeholder="00.000.000/0000-00" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ie">Inscrição Estadual</Label>
                <Input id="ie" value={lojaFormData.ie} onChange={(e) => setLojaFormData({ ...lojaFormData, ie: e.target.value })} placeholder="Inscrição Estadual" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável</Label>
                <Input id="responsavel" value={lojaFormData.responsavel} onChange={(e) => setLojaFormData({ ...lojaFormData, responsavel: e.target.value })} placeholder="Nome do responsável" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" value={lojaFormData.telefone} onChange={(e) => setLojaFormData({ ...lojaFormData, telefone: e.target.value })} placeholder="(00) 0000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" value={lojaFormData.email} onChange={(e) => setLojaFormData({ ...lojaFormData, email: e.target.value })} placeholder="email@exemplo.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input id="endereco" value={lojaFormData.endereco} onChange={(e) => setLojaFormData({ ...lojaFormData, endereco: e.target.value })} placeholder="Rua, número" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input id="cidade" value={lojaFormData.cidade} onChange={(e) => setLojaFormData({ ...lojaFormData, cidade: e.target.value })} placeholder="Cidade" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="uf">UF</Label>
                <Input id="uf" value={lojaFormData.uf} onChange={(e) => setLojaFormData({ ...lojaFormData, uf: e.target.value })} placeholder="SP" maxLength={2} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="limite_credito">Limite de Crédito</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
                  <Input id="limite_credito" value={lojaFormData.limite_credito} onChange={(e) => setLojaFormData({ ...lojaFormData, limite_credito: e.target.value })} className="pl-9" placeholder="0,00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comissao_padrao">Comissão Padrão</Label>
                <div className="relative">
                  <Input id="comissao_padrao" value={lojaFormData.comissao_padrao} onChange={(e) => setLojaFormData({ ...lojaFormData, comissao_padrao: e.target.value })} className="pr-8" placeholder="0,00" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="ativo" checked={lojaFormData.ativo} onCheckedChange={(checked) => setLojaFormData({ ...lojaFormData, ativo: checked })} />
              <Label htmlFor="ativo">Loja Ativa</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLojaDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveLoja}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filial Dialog */}
      <Dialog open={filialDialogOpen} onOpenChange={setFilialDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingFilial ? 'Editar Filial' : 'Nova Filial'}</DialogTitle>
            <DialogDescription>
              {editingFilial ? 'Altere os dados da filial' : 'Preencha os dados para cadastrar uma nova filial'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="filial_nome">Nome da Filial *</Label>
                <Input id="filial_nome" value={filialFormData.nome} onChange={(e) => setFilialFormData({ ...filialFormData, nome: e.target.value })} placeholder="Nome da filial" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filial_codigo">Código *</Label>
                <Input id="filial_codigo" value={filialFormData.codigo} onChange={(e) => setFilialFormData({ ...filialFormData, codigo: e.target.value })} placeholder="CTR-01" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="filial_endereco">Endereço</Label>
              <Input id="filial_endereco" value={filialFormData.endereco} onChange={(e) => setFilialFormData({ ...filialFormData, endereco: e.target.value })} placeholder="Rua, número" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="filial_cidade">Cidade</Label>
                <Input id="filial_cidade" value={filialFormData.cidade} onChange={(e) => setFilialFormData({ ...filialFormData, cidade: e.target.value })} placeholder="Cidade" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filial_uf">UF</Label>
                <Input id="filial_uf" value={filialFormData.uf} onChange={(e) => setFilialFormData({ ...filialFormData, uf: e.target.value })} placeholder="SP" maxLength={2} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="filial_telefone">Telefone</Label>
              <Input id="filial_telefone" value={filialFormData.telefone} onChange={(e) => setFilialFormData({ ...filialFormData, telefone: e.target.value })} placeholder="(00) 0000-0000" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="filial_ativo" checked={filialFormData.ativo} onCheckedChange={(checked) => setFilialFormData({ ...filialFormData, ativo: checked })} />
              <Label htmlFor="filial_ativo">Filial Ativa</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFilialDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveFilial}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}