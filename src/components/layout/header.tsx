import { SidebarTrigger } from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:px-8 md:justify-end">
      <div className="md:hidden">
        <h1 className="font-headline text-xl font-bold tracking-wider text-primary">
          PTC Resource Hub
        </h1>
      </div>
      <SidebarTrigger className="h-8 w-8">
        <Menu className="h-5 w-5" />
      </SidebarTrigger>
    </header>
  );
}
