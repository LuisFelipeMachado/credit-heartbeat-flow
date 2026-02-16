import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const hoursData = Array.from({ length: 24 }, (_, i) => ({
  hora: `${String(i).padStart(2, '0')}:00`,
  valor: 0,
}));

export function DashboardChart() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-border/40">
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">Faturamento</p>
        <p className="text-2xl font-bold tracking-tight">R$ 0,00</p>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={hoursData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradFat" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.15} />
                <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/30" />
            <XAxis
              dataKey="hora"
              axisLine={false}
              tickLine={false}
              className="text-[10px] fill-muted-foreground"
              interval={5}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              className="text-[10px] fill-muted-foreground"
              tickFormatter={(v) => `R$${v}`}
            />
            <Area
              type="monotone"
              dataKey="valor"
              stroke="hsl(217, 91%, 60%)"
              strokeWidth={2}
              fill="url(#gradFat)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        <span>Hoje, 00:00</span>
        <span>Hoje, 23:59</span>
      </div>
    </div>
  );
}
