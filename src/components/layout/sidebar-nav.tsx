'use client';

import {
  Book,
  Calculator,
  Code,
  HeartHandshake,
  Home,
  Info,
  Landmark,
  ShieldAlert,
  Sparkles,
  User,
} from 'lucide-react';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '../ui/sidebar';

const navItems = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#about-us', label: 'About Us', icon: Info },
  { href: '#disclaimer', label: 'Disclaimer', icon: ShieldAlert },
];

const categoryItems = [
    { category: 'Math', icon: Calculator },
    { category: 'Programming', icon: Code },
    { category: 'IT Fundamentals', icon: Sparkles },
    { category: 'Discrete Structures', icon: Book },
    { category: 'Pateros History', icon: Landmark },
    { category: 'Pathfit', icon: User },
    { category: 'Understanding the Self', icon: User },
    { category: 'Komunikasyon', icon: Book },
    { category: 'Civil Welfare', icon: HeartHandshake },
];


export function AppSidebarNav() {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const yOffset = -80; // for header height
      const y =
        targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <SidebarHeader>
        <h1 className="font-headline text-2xl font-bold tracking-wider text-primary">
          PTC Resource Hub
        </h1>
      </SidebarHeader>

      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <a href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
              <SidebarMenuButton>
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </a>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      
      <SidebarSeparator />
      
      <SidebarMenu>
         <div className="px-3 text-xs font-medium text-muted-foreground">CATEGORIES</div>
        {categoryItems.map((item) => (
           <SidebarMenuItem key={item.category}>
             <a href="#resources" onClick={(e) => handleNavClick(e, '#resources')}>
                <SidebarMenuButton>
                    <item.icon className="h-4 w-4" />
                    <span>{item.category}</span>
                </SidebarMenuButton>
            </a>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </>
  );
}
