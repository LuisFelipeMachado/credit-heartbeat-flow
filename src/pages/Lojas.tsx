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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Plus, Pencil, Store, Search } from 'lucide-react';
import { mockLojas } from '@/data/mockData';
import type { Loja } from '@/types';

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

const emptyFormData: LojaFormData = {
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

export default function Lojas() {
  const [lojas, setLojas] = useState<Loja[]>(mockLojas);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLoja, setEditingLoja] = useState<Loja | null>(null);
  const [formData, setFormData] = useState<LojaFormData>(emptyFormData);

  const filteredLojas = lojas.filter(
    (loja) =>
      loja.nome_fantasia.toLowerCase().includes(search.toLowerCase()) ||
      loja.cnpj.includes(search) ||
      loja.cidade?.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenNew = () => {
    setEditingLoja(null);
    setFormData(emptyFormData);
    setDialogOpen(true);
  };

  const handleEdit = (loja: Loja) => {
    setEditingLoja(loja);
    setFormData({
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
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingLoja) {
      setLojas(
        lojas.map((l) =>
          l.id === editingLoja.id
            ? {
                ...l,
                nome_fantasia: formData.nome_fantasia,
                cnpj: formData.cnpj,
                ie: formData.ie || undefined,
                telefone: formData.telefone || undefined,
                email: formData.email || undefined,
                endereco: formData.endereco || undefined,
                cidade: formData.cidade || undefined,
                uf: formData.uf || undefined,
                ativo: formData.ativo,
                updated_at: new Date().toISOString(),
              }
            : l
        )
      );
    } else {
      const newLoja: Loja = {
        id: String(Date.now()),
        nome_fantasia: formData.nome_fantasia,
        cnpj: formData.cnpj,
        ie: formData.ie || undefined,
        telefone: formData.telefone || undefined,
        email: formData.email || undefined,
        endereco: formData.endereco || undefined,
        cidade: formData.cidade || undefined,
        uf: formData.uf || undefined,
        ativo: formData.ativo,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setLojas([...lojas, newLoja]);
    }
    setDialogOpen(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Lojas</h1>
            <p className="text-muted-foreground">Gerencie as lojas do sistema</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenNew}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Loja
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingLoja ? 'Editar Loja' : 'Nova Loja'}
                </DialogTitle>
                <DialogDescription>
                  {editingLoja
                    ? 'Altere os dados da loja'
                    : 'Preencha os dados para cadastrar uma nova loja'}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome_fantasia">Nome Fantasia *</Label>
                    <Input
                      id="nome_fantasia"
                      value={formData.nome_fantasia}
                      onChange={(e) =>
                        setFormData({ ...formData, nome_fantasia: e.target.value })
                      }
                      placeholder="Nome da loja"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ *</Label>
                    <Input
                      id="cnpj"
                      value={formData.cnpj}
                      onChange={(e) =>
                        setFormData({ ...formData, cnpj: e.target.value })
                      }
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ie">Inscrição Estadual</Label>
                    <Input
                      id="ie"
                      value={formData.ie}
                      onChange={(e) =>
                        setFormData({ ...formData, ie: e.target.value })
                      }
                      placeholder="Inscrição Estadual"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="responsavel">Responsável</Label>
                    <Input
                      id="responsavel"
                      value={formData.responsavel}
                      onChange={(e) =>
                        setFormData({ ...formData, responsavel: e.target.value })
                      }
                      placeholder="Nome do responsável"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) =>
                        setFormData({ ...formData, telefone: e.target.value })
                      }
                      placeholder="(00) 0000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="email@exemplo.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) =>
                      setFormData({ ...formData, endereco: e.target.value })
                    }
                    placeholder="Rua, número"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input
                      id="cidade"
                      value={formData.cidade}
                      onChange={(e) =>
                        setFormData({ ...formData, cidade: e.target.value })
                      }
                      placeholder="Cidade"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="uf">UF</Label>
                    <Input
                      id="uf"
                      value={formData.uf}
                      onChange={(e) =>
                        setFormData({ ...formData, uf: e.target.value })
                      }
                      placeholder="SP"
                      maxLength={2}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="limite_credito">Limite de Crédito</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        R$
                      </span>
                      <Input
                        id="limite_credito"
                        value={formData.limite_credito}
                        onChange={(e) =>
                          setFormData({ ...formData, limite_credito: e.target.value })
                        }
                        className="pl-9"
                        placeholder="0,00"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comissao_padrao">Comissão Padrão</Label>
                    <div className="relative">
                      <Input
                        id="comissao_padrao"
                        value={formData.comissao_padrao}
                        onChange={(e) =>
                          setFormData({ ...formData, comissao_padrao: e.target.value })
                        }
                        className="pr-8"
                        placeholder="0,00"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        %
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="ativo"
                    checked={formData.ativo}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, ativo: checked })
                    }
                  />
                  <Label htmlFor="ativo">Loja Ativa</Label>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                  <TableHead>Nome Fantasia</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Cidade/UF</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLojas.map((loja) => (
                  <TableRow key={loja.id}>
                    <TableCell className="font-medium">
                      {loja.nome_fantasia}
                    </TableCell>
                    <TableCell>{loja.cnpj}</TableCell>
                    <TableCell>
                      {loja.cidade && loja.uf
                        ? `${loja.cidade}/${loja.uf}`
                        : '-'}
                    </TableCell>
                    <TableCell>{loja.telefone || '-'}</TableCell>
                    <TableCell>
                      <Badge variant={loja.ativo ? 'default' : 'secondary'}>
                        {loja.ativo ? 'Ativa' : 'Inativa'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(loja)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredLojas.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-muted-foreground py-8"
                    >
                      Nenhuma loja encontrada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
