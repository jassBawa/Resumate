'use client';
import React, { useState } from 'react';
import CustomDarkToggle from '@/components/DarkToggle';
import { ChatWidget } from '@/components/dashboard/chat-widget';
import { EditSection } from '@/components/dashboard/sidebar-tabs/EditSection';
import { JobDescriptionSection } from '@/components/dashboard/sidebar-tabs/JobDescription';
import { PreviewSection } from '@/components/dashboard/sidebar-tabs/ResumePreviewSectiont';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useResumeData } from '@/hooks/useResumeData';
import { useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import LoadingAnimation from '@/components/dashboard/LoadingAnimation';
import { AnimatePresence, motion } from 'framer-motion';
import { SubscriptionModal } from '@/components/payment/SubscriptionModal';
import { UpgradePrompt } from '@/components/payment/UpgradePrompt';
import { SubscriptionButton } from '@/components/payment/SubscriptionButton';

const DashboardLayout = ({ threadId }: { threadId: string }) => {
  const [activeSection, setActiveSection] = useState('edit');
  const { loading, threadData } = useResumeData(threadId);
  const { user } = useUser();

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
    return <LoadingAnimation />;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <LoadingAnimation />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex w-full"
          >
            <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <main className="flex flex-1 flex-col bg-[#f6f8fa] dark:bg-[#181a20]">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 pr-12 shadow-sm dark:border-[#353945] dark:bg-[#23272f]">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="rounded-lg p-2 text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-[#232c3b] dark:hover:text-white" />
                  <div className="flex items-center gap-3">
                    <div>
                      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        Resume Builder
                      </h1>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.firstName ? `${user.firstName}'s workspace` : 'Your workspace'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <SubscriptionButton
                    variant="outline"
                    size="sm"
                    className="hidden sm:flex"
                    onSuccess={() => {
                      // Refresh the page or update subscription status
                      window.location.reload();
                    }}
                  >
                    Upgrade to Pro
                  </SubscriptionButton>
                  <div className="flex items-center gap-2">
                    <div className="hidden text-right sm:block">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                    <UserButton />
                  </div>
                  <CustomDarkToggle />
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6">
                <div className="mx-auto max-w-7xl">
                  <div className="animate-fade-in">{renderActiveSection()}</div>
                </div>
              </div>

              {/* Chat Widget */}
              <ChatWidget threadId={threadId} />
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subscription Modal */}
      <SubscriptionModal mode="forced" />

      {/* Upgrade Prompt */}
      <UpgradePrompt />
    </>
  );
};

export default DashboardLayout;
