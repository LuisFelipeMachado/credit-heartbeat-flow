import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/propostas': 'Propostas',
  '/propostas/nova': 'Nova Proposta',
  '/analises': 'Análise de Crédito',
  '/operacoes': 'Operações',
  '/relatorios': 'Relatórios',
  '/lojas': 'Clientes',
  '/usuarios': 'Usuários',
  '/politicas': 'Políticas Comerciais',
  '/status': 'Status',
};

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  
  const getPageTitle = () => {
    // Check for exact match first
    if (pageTitles[location.pathname]) {
      return pageTitles[location.pathname];
    }
    // Check for proposta edit
    if (location.pathname.startsWith('/propostas/') && location.pathname !== '/propostas/nova') {
      return 'Editar Proposta';
    }
    // Fallback
    return 'IdealBanking';
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
          <SidebarTrigger className="-ml-1 h-8 w-8" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium">{getPageTitle()}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex-1 overflow-auto p-6 bg-background">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
