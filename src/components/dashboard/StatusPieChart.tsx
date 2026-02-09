import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { mockDashboardStats } from '@/data/mockData';

const statusDistribuicao = [
  { name: 'Aprovadas', value: 89, color: 'hsl(142, 71%, 45%)' },
  { name: 'Reprovadas', value: 34, color: 'hsl(0, 84%, 60%)' },
  { name: 'Em Análise', value: 23, color: 'hsl(38, 92%, 50%)' },
  { name: 'Pendentes', value: 10, color: 'hsl(217, 91%, 60%)' },
];

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.08) return null;
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-semibold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function StatusPieChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Distribuição por Status</CardTitle>
        <p className="text-sm text-muted-foreground">Total: {mockDashboardStats.totalPropostas} propostas</p>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusDistribuicao}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                labelLine={false}
                label={renderLabel}
                strokeWidth={2}
                stroke="hsl(var(--card))"
              >
                {statusDistribuicao.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          {statusDistribuicao.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-muted-foreground">{item.name}</span>
              <span className="text-xs font-semibold ml-auto">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
