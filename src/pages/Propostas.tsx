import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Eye } from 'lucide-react';
import { getEnrichedPropostas } from '@/data/mockData';

export default function Propostas() {
  const [search, setSearch] = useState('');
  const propostas = getEnrichedPropostas();

  const filtered = propostas.filter(p =>
    p.cliente_nome.toLowerCase().includes(search.toLowerCase()) ||
    p.cliente_cpf.includes(search)
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('pt-BR');

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold">Propostas</h1>
          <Button asChild><Link to="/propostas/nova"><Plus className="h-4 w-4 mr-2" />Nova Proposta</Link></Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome ou CPF..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
        </div>

        <div className="rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Loja</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id} className="table-row-hover">
                  <TableCell className="font-medium">{p.cliente_nome}</TableCell>
                  <TableCell>{p.cliente_cpf}</TableCell>
                  <TableCell>{formatCurrency(p.valor_solicitado)}</TableCell>
                  <TableCell>{p.prazo_meses}m</TableCell>
                  <TableCell>{p.loja?.nome_fantasia || '-'}</TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                  <TableCell>{formatDate(p.created_at)}</TableCell>
                  <TableCell><Button variant="ghost" size="icon" asChild><Link to={`/propostas/${p.id}`}><Eye className="h-4 w-4" /></Link></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
