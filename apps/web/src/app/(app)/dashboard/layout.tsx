import { SidebarLayout } from "./_components/sidebarLayout";
import { DashboardAuthGuard } from "./_components/dashboardAuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardAuthGuard>
      <SidebarLayout>{children}</SidebarLayout>
    </DashboardAuthGuard>
  );
}
