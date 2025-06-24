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
import { FileText, Edit, Eye, Home } from 'lucide-react';
import Link from 'next/link';

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
    <Sidebar className="border-r border-gray-200 bg-white dark:border-[#353945] dark:bg-[#23272f]">
      <SidebarHeader className="border-b border-gray-200 bg-white p-6 dark:border-[#353945] dark:bg-[#23272f]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-foreground text-lg font-bold tracking-tight dark:text-white">
                ResuMate
              </h2>
              <p className="text-muted-foreground text-xs leading-tight font-medium dark:text-gray-400">
                Your AI-Powered Resume Wingman
              </p>
            </div>
          </div>

          {/* Dashboard Link */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-[#232c3b] dark:hover:text-white"
          >
            <Home className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white p-4 dark:bg-[#23272f]">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4 text-xs font-semibold tracking-wider text-[var(--muted-foreground)] uppercase dark:text-gray-400">
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
                          <span className="text-sm leading-tight font-medium dark:text-white">
                            {item.title}
                          </span>
                          <span
                            className={`text-[10px] leading-tight transition-colors duration-200 dark:text-gray-400`}
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

      <SidebarFooter className="border-t border-gray-200 bg-white p-4 text-sm text-[var(--muted-foreground)] dark:border-[#353945] dark:bg-[#23272f] dark:text-gray-400">
        {/* Optional: Add footer actions here */}
        <div className="text-center">Designed with ❤️</div>
      </SidebarFooter>
    </Sidebar>
  );
}
