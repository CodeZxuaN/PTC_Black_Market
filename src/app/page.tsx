import { AppHeader } from '@/components/layout/header';
import { AppSidebarNav } from '@/components/layout/sidebar-nav';
import { MainPage } from '@/components/main-page';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';

export default function Home() {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <AppSidebarNav />
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="p-4 sm:p-6 lg:p-8">
          <MainPage />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
