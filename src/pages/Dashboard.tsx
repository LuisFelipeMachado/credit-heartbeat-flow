import { MainLayout } from '@/components/layout';
import {
  DashboardHeader,
  StatsGrid,
  VolumeChart,
  StatusPieChart,
  LojaPerformanceChart,
  QuickMetrics,
  RecentProposals,
} from '@/components/dashboard';

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <DashboardHeader />
        <StatsGrid />

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <VolumeChart />
          <StatusPieChart />
        </div>

        {/* Second Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <LojaPerformanceChart />
          <QuickMetrics />
          <RecentProposals />
        </div>
      </div>
    </MainLayout>
  );
}
