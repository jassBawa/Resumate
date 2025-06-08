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
                      className="w-full"
                      onClick={() => setActiveSection(item.id)}
                    >
                      <div
                        className={`group flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-3 transition-colors duration-200 ${
                          isActive
                            ? 'bg-indigo-600 text-white'
                            : 'text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]'
                        }`}
                      >
                        <item.icon
                          className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
                            isActive
                              ? 'text-white'
                              : 'text-[var(--muted-foreground)] group-hover:text-[var(--sidebar-accent-foreground)]'
                          }`}
                        />
                        <div className="flex flex-col">
                          <span className="leading-tight font-medium">{item.title}</span>
                          <span
                            className={`text-xs leading-tight transition-colors duration-200 ${
                              isActive ? 'text-white/80' : 'text-[var(--muted-foreground)]'
                            }`}
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
