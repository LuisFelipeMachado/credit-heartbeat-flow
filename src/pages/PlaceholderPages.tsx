import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
}

function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-display font-bold">{title}</h1>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Construction className="h-5 w-5 text-warning" />
              Em Desenvolvimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Esta página está sendo desenvolvida.</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

export const Lojas = () => <PlaceholderPage title="Lojas" />;
export const Usuarios = () => <PlaceholderPage title="Usuários" />;
export const Politicas = () => <PlaceholderPage title="Políticas Comerciais" />;
export const Status = () => <PlaceholderPage title="Status" />;
export const Analises = () => <PlaceholderPage title="Análise de Crédito" />;
export const Operacoes = () => <PlaceholderPage title="Operações" />;
export const Relatorios = () => <PlaceholderPage title="Relatórios" />;
export const PropostaNova = () => <PlaceholderPage title="Nova Proposta" />;
