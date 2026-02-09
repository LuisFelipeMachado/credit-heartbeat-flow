import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const volumeMensal = [
  { mes: 'Jan', propostas: 45, aprovadas: 32, valor: 850000 },
  { mes: 'Fev', propostas: 52, aprovadas: 38, valor: 920000 },
  { mes: 'Mar', propostas: 61, aprovadas: 44, valor: 1100000 },
  { mes: 'Abr', propostas: 58, aprovadas: 41, valor: 980000 },
  { mes: 'Mai', propostas: 72, aprovadas: 55, valor: 1350000 },
  { mes: 'Jun', propostas: 68, aprovadas: 49, valor: 1200000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border bg-card p-3 shadow-lg">
      <p className="text-sm font-semibold text-foreground mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-medium text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export function VolumeChart() {
  return (
    <Card className="lg:col-span-2 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">Volume de Propostas</CardTitle>
          <p className="text-sm text-muted-foreground">Evolução dos últimos 6 meses</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="text-muted-foreground">Enviadas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-success" />
            <span className="text-muted-foreground">Aprovadas</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={volumeMensal} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gradPropostas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradAprovadas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} className="text-xs fill-muted-foreground" dy={10} />
              <YAxis axisLine={false} tickLine={false} className="text-xs fill-muted-foreground" dx={-5} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="propostas"
                stroke="hsl(217, 91%, 60%)"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#gradPropostas)"
                name="Enviadas"
                dot={{ r: 4, fill: 'hsl(217, 91%, 60%)', strokeWidth: 2, stroke: 'hsl(var(--card))' }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: 'hsl(var(--card))' }}
              />
              <Area
                type="monotone"
                dataKey="aprovadas"
                stroke="hsl(142, 71%, 45%)"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#gradAprovadas)"
                name="Aprovadas"
                dot={{ r: 4, fill: 'hsl(142, 71%, 45%)', strokeWidth: 2, stroke: 'hsl(var(--card))' }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: 'hsl(var(--card))' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
