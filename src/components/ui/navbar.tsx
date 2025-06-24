'use client';
import { cn, smoothScrollTo } from '@/lib/utils';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { FileText, Github, Menu, Twitter, X } from 'lucide-react';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import CustomDarkToggle from '../DarkToggle';

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, 'change', latest => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div ref={ref} className={cn('sticky inset-x-0 top-0 z-40 w-full', className)}>
      {React.Children.map(children, child =>
        child
          ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? 'blur(10px)' : 'none',
        boxShadow: visible
          ? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
          : 'none',
        y: visible ? 20 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        'relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-6 py-3 lg:flex dark:bg-transparent',
        visible && 'bg-white/80 dark:bg-[#23272f]/80',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleItemClick = (link: string) => {
    if (link.startsWith('#')) {
      const elementId = link.substring(1);
      smoothScrollTo(elementId, 100); // Offset for navbar height
    }
    onItemClick?.();
  };

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-4 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-4',
        className
      )}
    >
      {items.map((item, idx) => (
        <button
          onMouseEnter={() => setHovered(idx)}
          onClick={() => handleItemClick(item.link)}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
          key={`link-${idx}`}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-[#353945]"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </button>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? 'blur(10px)' : 'none',
        boxShadow: visible
          ? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
          : 'none',
        y: visible ? 20 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        'relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between rounded-2xl bg-transparent px-4 py-3 lg:hidden',
        visible && 'bg-white/80 dark:bg-[#23272f]/80',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
  return (
    <div className={cn('flex w-full flex-row items-center justify-between', className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({ children, className, isOpen }: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white/95 px-4 py-8 shadow-lg backdrop-blur-sm dark:bg-[#23272f]/95',
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return isOpen ? (
    <X className="h-6 w-6 cursor-pointer text-black dark:text-white" onClick={onClick} />
  ) : (
    <Menu className="h-6 w-6 cursor-pointer text-black dark:text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black dark:text-white"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
        <FileText className="h-5 w-5 text-white" />
      </div>
      <span className="font-medium text-black dark:text-white">ResuMate</span>
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = 'a',
  children,
  className,
  variant = 'primary',
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'dark' | 'gradient';
} & (React.ComponentPropsWithoutRef<'a'> | React.ComponentPropsWithoutRef<'button'>)) => {
  const baseStyles =
    'px-4 py-2 rounded-md text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center';

  const variantStyles = {
    primary:
      'bg-white text-black shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]',
    secondary: 'bg-transparent shadow-none dark:text-white',
    dark: 'bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]',
    gradient:
      'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]',
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

// Complete navbar component
export const AnimatedNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Features', link: '#features' },
    { name: 'How It Works', link: '#how-it-works' },
  ];

  const handleMobileItemClick = (link: string) => {
    if (link.startsWith('#')) {
      const elementId = link.substring(1);
      smoothScrollTo(elementId, 100);
    }
    setMobileMenuOpen(false);
  };

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/jassBawa/agentinc-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white/50 text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-white hover:text-gray-900 hover:shadow-sm dark:border-[#353945] dark:bg-[#23272f]/50 dark:text-gray-400 dark:hover:border-[#4a5568] dark:hover:bg-[#23272f] dark:hover:text-white"
            >
              <Github className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            </Link>
            <Link
              href="https://x.com/jaspreetbawa_"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white/50 text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-white hover:text-gray-900 hover:shadow-sm dark:border-[#353945] dark:bg-[#23272f]/50 dark:text-gray-400 dark:hover:border-[#4a5568] dark:hover:bg-[#23272f] dark:hover:text-white"
            >
              <Twitter className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            </Link>
          </div>
          <CustomDarkToggle />
          <NavbarButton href="/dashboard" variant="gradient">
            Get Started
          </NavbarButton>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Link
                href="https://github.com/jassBawa/agentinc-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white/50 text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-white hover:text-gray-900 hover:shadow-sm dark:border-[#353945] dark:bg-[#23272f]/50 dark:text-gray-400 dark:hover:border-[#4a5568] dark:hover:bg-[#23272f] dark:hover:text-white"
              >
                <Github className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              </Link>
              <Link
                href="https://x.com/jaspreetbawa_"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white/50 text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-white hover:text-gray-900 hover:shadow-sm dark:border-[#353945] dark:bg-[#23272f]/50 dark:text-gray-400 dark:hover:border-[#4a5568] dark:hover:bg-[#23272f] dark:hover:text-white"
              >
                <Twitter className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              </Link>
            </div>
            <CustomDarkToggle />
            <MobileNavToggle
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>
        <MobileNavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          <div className="flex w-full flex-col gap-4">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleMobileItemClick(item.link)}
                className="text-left text-lg font-medium text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
              >
                {item.name}
              </button>
            ))}
            <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
              <NavbarButton href="/dashboard" variant="gradient" className="w-full">
                Get Started
              </NavbarButton>
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};
