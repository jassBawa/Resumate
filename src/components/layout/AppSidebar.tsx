import { Edit, Eye, FileText, Briefcase } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';

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
          <SidebarGroupLabel className="text-muted-foreground mb-4 text-xs font-semibold tracking-wider uppercase">
            Sections
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {sidebarItems.map(item => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeSection === item.id}
                    className="w-full"
                  >
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg p-3 transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-foreground'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">{item.title}</div>
                        <div
                          className={`text-xs ${
                            activeSection === item.id
                              ? 'text-primary-foreground/80'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {item.description}
                        </div>
                      </div>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="text-muted-foreground text-center text-xs">Dashboard v1.0</div>
      </SidebarFooter>
    </Sidebar>
  );
}
