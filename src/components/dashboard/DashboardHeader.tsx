import { Button } from '@/components/ui/button';
import { Plus, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DashboardHeader() {
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2 mt-1 text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <p className="text-sm capitalize">{today}</p>
        </div>
      </div>
      <Button asChild className="gap-2 shadow-md">
        <Link to="/propostas/nova">
          <Plus className="h-4 w-4" />
          Nova Proposta
        </Link>
      </Button>
    </div>
  );
}
