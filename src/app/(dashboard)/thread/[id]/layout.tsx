import { SidebarProvider } from '@/components/ui/sidebar';

function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background min-h-screen">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">{children}</div>
        {/* <ChatWidget /> */}
      </SidebarProvider>
    </div>
  );
}

export default ResumeLayout;
