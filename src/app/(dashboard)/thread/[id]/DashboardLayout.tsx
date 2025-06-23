'use client';
import CustomDarkToggle from '@/components/DarkToggle';
import { ChatWidget } from '@/components/dashboard/chat-widget';
import { EditSection } from '@/components/dashboard/sidebar-tabs/EditSection';
import { JobDescriptionSection } from '@/components/dashboard/sidebar-tabs/JobDescription';
import { PreviewSection } from '@/components/dashboard/sidebar-tabs/ResumePreviewSectiont';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useResumeData } from '@/hooks/useResumeData';
import { useState } from 'react';

const DashboardLayout = ({ threadId }: { threadId: string }) => {
  const [activeSection, setActiveSection] = useState('edit');
  const { loading, threadData } = useResumeData(threadId);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'edit':
        return <EditSection />;
      case 'preview':
        return <PreviewSection threadData={threadData} threadId={threadId} />;
      case 'job-description':
        return <JobDescriptionSection />;
      default:
        return <EditSection />;
    }
  };

  if (loading) {
    return <h2>loading</h2>;
  }

  return (
    <>
      <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b p-4 pr-12">
          <div className="bg-card flex items-center gap-4">
            <SidebarTrigger className="hover:bg-accent hover:text-accent-foreground rounded-md p-2 transition-colors" />
            <h1 className="text-foreground text-2xl font-bold">Resume Builder</h1>
          </div>
          <div>
            <CustomDarkToggle />
          </div>
        </div>
        <div className="animate-fade-in flex-1 p-6">{renderActiveSection()}</div>
        <ChatWidget threadId={threadId} />
      </main>
    </>
  );
};

export default DashboardLayout;
