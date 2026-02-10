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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Pencil, Users, Search } from 'lucide-react';
import { mockUsuarios, mockLojas, mockUserRoles, mockFiliais } from '@/data/mockData';
import type { Usuario, AppRole, Filial } from '@/types';

interface UsuarioFormData {
  nome: string;
  email: string;
  role: AppRole;
  loja_id: string;
  filial_id: string;
  ativo: boolean;
}

const emptyFormData: UsuarioFormData = {
  nome: '',
  email: '',
  role: 'OPERADOR_LOJA',
  loja_id: '',
  filial_id: '',
  ativo: true,
};

const roleLabels: Record<AppRole, string> = {
  ADMIN: 'Administrador',
  GESTOR_LOJA: 'Gestor de Loja',
  OPERADOR_LOJA: 'Operador de Loja',
  ANALISTA_CREDITO: 'Analista de Crédito',
  FINANCEIRO: 'Financeiro',
  AUDITOR: 'Auditor',
};

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(mockUsuarios);
  const [userRoles, setUserRoles] = useState(mockUserRoles);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState<UsuarioFormData>(emptyFormData);

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(search.toLowerCase()) ||
      usuario.email.toLowerCase().includes(search.toLowerCase())
  );

  const getLojaName = (lojaId?: string) => {
    if (!lojaId) return '-';
    const loja = mockLojas.find((l) => l.id === lojaId);
    return loja?.nome_fantasia || '-';
  };

  const getFilialName = (filialId?: string) => {
    if (!filialId) return '-';
    const filial = mockFiliais.find((f) => f.id === filialId);
    return filial?.nome || '-';
  };

  const getFiliaisByLoja = (lojaId: string): Filial[] =>
    mockFiliais.filter((f) => f.loja_id === lojaId && f.ativo);

  const getUserRole = (userId: string): AppRole | undefined => {
    const role = userRoles.find((r) => r.user_id === userId);
    return role?.role;
  };

  const handleOpenNew = () => {
    setEditingUsuario(null);
    setFormData(emptyFormData);
    setDialogOpen(true);
  };

  const handleEdit = (usuario: Usuario) => {
    setEditingUsuario(usuario);
    const role = getUserRole(usuario.id);
    setFormData({
      nome: usuario.nome,
      email: usuario.email,
      role: role || 'OPERADOR_LOJA',
      loja_id: usuario.loja_id || '',
      filial_id: usuario.filial_id || '',
      ativo: usuario.ativo,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingUsuario) {
      setUsuarios(
        usuarios.map((u) =>
          u.id === editingUsuario.id
            ? {
                ...u,
                nome: formData.nome,
                email: formData.email,
                loja_id: formData.loja_id || undefined,
                filial_id: formData.filial_id || undefined,
                ativo: formData.ativo,
                updated_at: new Date().toISOString(),
              }
            : u
        )
      );
      setUserRoles(
        userRoles.map((r) =>
          r.user_id === editingUsuario.id
            ? { ...r, role: formData.role }
            : r
        )
      );
    } else {
      const newId = String(Date.now());
      const newUsuario: Usuario = {
        id: newId,
        nome: formData.nome,
        email: formData.email,
        loja_id: formData.loja_id || undefined,
        filial_id: formData.filial_id || undefined,
        ativo: formData.ativo,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setUsuarios([...usuarios, newUsuario]);
      setUserRoles([
        ...userRoles,
        { id: String(Date.now() + 1), user_id: newId, role: formData.role },
      ]);
    }
    setDialogOpen(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Usuários</h1>
            <p className="text-muted-foreground">Gerencie os usuários do sistema</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenNew}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingUsuario ? 'Editar Usuário' : 'Novo Usuário'}
                </DialogTitle>
                <DialogDescription>
                  {editingUsuario
                    ? 'Altere os dados do usuário'
                    : 'Preencha os dados para cadastrar um novo usuário'}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    placeholder="Nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="role">Perfil *</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: AppRole) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o perfil" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(roleLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loja">Loja Vinculada</Label>
                  <Select
                    value={formData.loja_id}
                    onValueChange={(value) =>
                      setFormData({ ...formData, loja_id: value, filial_id: '' })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a loja" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Nenhuma</SelectItem>
                      {mockLojas
                        .filter((l) => l.ativo)
                        .map((loja) => (
                          <SelectItem key={loja.id} value={loja.id}>
                            {loja.nome_fantasia}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.loja_id && (
                  <div className="space-y-2">
                    <Label htmlFor="filial">Filial *</Label>
                    <Select
                      value={formData.filial_id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, filial_id: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a filial" />
                      </SelectTrigger>
                      <SelectContent>
                        {getFiliaisByLoja(formData.loja_id).map((filial) => (
                          <SelectItem key={filial.id} value={filial.id}>
                            {filial.nome} ({filial.codigo})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Switch
                    id="ativo"
                    checked={formData.ativo}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, ativo: checked })
                    }
                  />
                  <Label htmlFor="ativo">Usuário Ativo</Label>
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
                <Users className="h-5 w-5" />
                Lista de Usuários
              </CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar usuários..."
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Loja</TableHead>
                  <TableHead>Filial</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsuarios.map((usuario) => {
                  const role = getUserRole(usuario.id);
                  return (
                    <TableRow key={usuario.id}>
                      <TableCell className="font-medium">
                        {usuario.nome}
                      </TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell>
                        {role ? roleLabels[role] : '-'}
                      </TableCell>
                      <TableCell>{getLojaName(usuario.loja_id)}</TableCell>
                      <TableCell>{getFilialName(usuario.filial_id)}</TableCell>
                      <TableCell>
                        <Badge variant={usuario.ativo ? 'default' : 'secondary'}>
                          {usuario.ativo ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(usuario)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredUsuarios.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-muted-foreground py-8"
                    >
                      Nenhum usuário encontrado
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
