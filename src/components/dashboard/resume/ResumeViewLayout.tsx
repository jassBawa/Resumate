import { cn } from '@/lib/utils';

interface ResumeViewLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export function ResumeViewLayout({ sidebar, children }: ResumeViewLayoutProps) {
  return (
    <div className="bg-muted/20 dark:bg-neutral-950 h-screen">
      <div className="grid md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr] p-4 gap-4 h-full">
        <aside className="hidden md:block h-full">{sidebar}</aside>
        <main className="h-full">{children}</main>
      </div>
    </div>
  );
}

type ResumeViewSidebarProps = React.HTMLAttributes<HTMLDivElement>;

export function ResumeViewSidebar({
  className,
  children,
}: ResumeViewSidebarProps) {
  return (
    <div
      className={cn(
        'flex h-full flex-col p-4 bg-background dark:bg-neutral-900 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.05)] dark:shadow-black/20',
        className
      )}
    >
      {children}
    </div>
  );
}

type ResumeViewSidebarNavProps = React.HTMLAttributes<HTMLElement>;

export function ResumeViewSidebarNav({
  className,
  children,
}: ResumeViewSidebarNavProps) {
  return <nav className={cn('flex flex-col gap-1', className)}>{children}</nav>;
}

interface ResumeViewSidebarNavLinkProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export function ResumeViewSidebarNavLink({
  className,
  isActive,
  children,
  ...props
}: ResumeViewSidebarNavLinkProps) {
  return (
    <button
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/5',
        { 'bg-primary/10 text-primary font-medium': isActive },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

type ResumeViewContentProps = React.HTMLAttributes<HTMLDivElement>;

export function ResumeViewContent({
  className,
  children,
}: ResumeViewContentProps) {
  return (
    <div
      className={cn(
        'bg-background dark:bg-neutral-900 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.05)] dark:shadow-black/20 h-full',
        className
      )}
    >
      {children}
    </div>
  );
}
