'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Briefcase, Edit, Eye, FileText } from 'lucide-react';

interface AppSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const sidebarItems = [
  {
    id: 'edit',
    title: 'Edit Content',
    icon: Edit,
    description: 'Create and modify content',
  },
  {
    id: 'preview',
    title: 'Preview',
    icon: Eye,
    description: 'View your content',
  },
  {
    id: 'job-description',
    title: 'Job Description',
    icon: FileText,
    description: 'Manage job postings',
  },
];

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-lg">
            <Briefcase className="text-primary-foreground h-6 w-6" />
          </div>
          <div>
            <h2 className="text-foreground text-lg font-bold">WorkSpace</h2>
            <p className="text-muted-foreground text-sm">Content Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4 text-xs font-semibold tracking-wider text-[var(--muted-foreground)] uppercase">
            Sections
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {sidebarItems.map(item => {
                const isActive = activeSection === item.id;

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-auto w-full"
                      onClick={() => setActiveSection(item.id)}
                    >
                      <div className={`group cursor-pointer`}>
                        <item.icon className={`h-5 w-5 shrink-0 transition-colors duration-200`} />
                        <div className="flex flex-col">
                          <span className="text-sm leading-tight font-medium">{item.title}</span>
                          <span
                            className={`text-[10px] leading-tight transition-colors duration-200`}
                          >
                            {item.description}
                          </span>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4 text-sm text-[var(--muted-foreground)]">
        {/* Optional: Add footer actions here */}
        <div className="text-center">Designed with ❤️</div>
      </SidebarFooter>
    </Sidebar>
  );
}
