import { SidebarProvider } from '@/components/ui/sidebar';
import { SubscriptionProvider } from '@/contexts/SubscriptionProvider';

function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SubscriptionProvider>
      <div className="bg-background min-h-screen">
        <SidebarProvider>
          <div className="flex min-h-screen w-full">{children}</div>
          {/* <ChatWidget /> */}
        </SidebarProvider>
      </div>
    </SubscriptionProvider>
  );
}

export default ResumeLayout;
