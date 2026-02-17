import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function DashboardFilters() {
  return (
    <div className="flex flex-wrap gap-3">
      <Select defaultValue="hoje">
        <SelectTrigger className="w-[160px] bg-white shadow-sm border-border/40">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hoje">Hoje</SelectItem>
          <SelectItem value="7d">Últimos 7 dias</SelectItem>
          <SelectItem value="30d">Últimos 30 dias</SelectItem>
          <SelectItem value="90d">Últimos 90 dias</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="todos">
        <SelectTrigger className="w-[200px] bg-white shadow-sm border-border/40">
          <SelectValue placeholder="Produto" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos os produtos</SelectItem>
          <SelectItem value="consignado">Consignado</SelectItem>
          <SelectItem value="pessoal">Pessoal</SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}
