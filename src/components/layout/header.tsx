import { SidebarTrigger } from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-border/50 bg-background/50 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8 md:hidden">
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
        <h1 className="font-headline text-xl font-bold tracking-wider text-primary">
          PTC BLACK MARKET
        </h1>
      </div>
      <SidebarTrigger className="hidden h-8 w-8 md:flex">
        <Menu className="h-5 w-5" />
      </SidebarTrigger>
    </header>
  );
}
