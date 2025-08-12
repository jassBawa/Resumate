import { DashboardHeader } from '@/components/dashboard';
import { SubscriptionProvider } from '@/contexts/SubscriptionProvider';
import React from 'react';

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SubscriptionProvider>
      <div className="bg-background min-h-screen">
        <DashboardHeader />

        {children}
      </div>
    </SubscriptionProvider>
  );
}

export default DashboardLayout;
