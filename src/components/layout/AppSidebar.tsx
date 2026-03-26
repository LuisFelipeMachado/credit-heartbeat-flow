import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  LayoutDashboard,
  FileText,
  Search,
  Briefcase,
  BarChart3,
  Settings,
  Store,
  Users,
  Shield,
  Tag,
  ChevronDown,
  RefreshCw,
  LogOut,
  Landmark,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mainMenuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { title: 'Propostas', icon: FileText, href: '/propostas' },
  { title: 'Análise de Crédito', icon: Search, href: '/analises' },
  { title: 'Autorização', icon: Shield, href: '/autorizacao' },
  { title: 'Renegociação', icon: RefreshCw, href: '/renegociacao' },
  { title: 'Relatórios', icon: BarChart3, href: '/relatorios' },
];

const configMenuItems = [
  { title: 'Clientes', icon: Store, href: '/lojas' },
  { title: 'Usuários', icon: Users, href: '/usuarios' },
  { title: 'Config. Propostas', icon: Briefcase, href: '/config-propostas' },
  { title: 'Status', icon: Tag, href: '/status' },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [configOpen, setConfigOpen] = useState(
    configMenuItems.some(item => location.pathname.startsWith(item.href))
  );

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  const handleLogout = () => {
    navigate('/auth');
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-md group-hover:shadow-lg transition-shadow">
            <Landmark className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold text-sidebar-foreground tracking-tight">
              IdealBanking
            </span>
            <span className="text-xs text-sidebar-muted">
              Sistema de Crédito
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted text-xs uppercase tracking-wider px-3 mb-2">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      'h-10 rounded-lg transition-all duration-200',
                      isActive(item.href)
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-md'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    )}
                  >
                    <Link to={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <Collapsible open={configOpen} onOpenChange={setConfigOpen}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="flex items-center justify-between cursor-pointer text-sidebar-muted text-xs uppercase tracking-wider px-3 mb-2 hover:text-sidebar-foreground transition-colors">
                <div className="flex items-center gap-2">
                  <Settings className="h-3.5 w-3.5" />
                  <span>Configurações</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    configOpen && 'rotate-180'
                  )}
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenuSub>
                  {configMenuItems.map((item) => (
                    <SidebarMenuSubItem key={item.href}>
                      <SidebarMenuSubButton
                        asChild
                        className={cn(
                          'h-9 rounded-lg transition-all duration-200',
                          isActive(item.href)
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                            : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                        )}
                      >
                        <Link to={item.href} className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-sidebar-accent">
              <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-sm font-medium">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-sidebar-foreground">Admin</span>
              <span className="text-xs text-sidebar-muted">Administrador</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-8 w-8 text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
