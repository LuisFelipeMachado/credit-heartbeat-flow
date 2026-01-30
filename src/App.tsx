import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Propostas from "./pages/Propostas";
import AnaliseCredito from "./pages/AnaliseCredito";
import { Lojas, Usuarios, Politicas, Status, Operacoes, Relatorios } from "./pages/PlaceholderPages";
import PropostaNova from "./pages/PropostaNova";
import PropostaDetalhe from "./pages/PropostaDetalhe";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/propostas" element={<Propostas />} />
            <Route path="/propostas/nova" element={<PropostaNova />} />
            <Route path="/propostas/:id" element={<PropostaDetalhe />} />
            <Route path="/lojas" element={<Lojas />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/politicas" element={<Politicas />} />
            <Route path="/status" element={<Status />} />
            <Route path="/analises" element={<AnaliseCredito />} />
            <Route path="/autorizar" element={<Operacoes />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;